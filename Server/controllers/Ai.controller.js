const Resource = require("../models/Resource.model");
const { OpenRouter } = require("@openrouter/sdk");

const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});

const ALLOWED_DOMAINS = [
    "wikipedia.org",
    "worldcat.org",
    "openstax.org",
    "ocw.mit.edu",
    "mit.edu",
];

function stripCodeFences(text = "") {
    const t = String(text).trim();
    const fenced = t.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
    return fenced ? fenced[1].trim() : t;
}

function extractFirstJsonObject(text = "") {
    const cleaned = stripCodeFences(text);
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return "";
    return cleaned.slice(start, end + 1).trim();
}

function extractFirstJsonArray(text = "") {
    const cleaned = stripCodeFences(text);
    const start = cleaned.indexOf("[");
    const end = cleaned.lastIndexOf("]");
    if (start === -1 || end === -1 || end <= start) return "";
    return cleaned.slice(start, end + 1).trim();
}

function safeParseJsonArray(text = "") {
    const arrText = extractFirstJsonArray(text) || stripCodeFences(text);
    try {
        const parsed = JSON.parse(arrText);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        const cleaned = stripCodeFences(text);
        const objs = [];
        const matches = cleaned.match(/\{[\s\S]*?\}/g) || [];
        for (const m of matches) {
            try {
                objs.push(JSON.parse(m));
            } catch {}
        }
        return objs;
    }
}

function isAllowedUrl(url) {
    try {
        const u = new URL(url);
        if (u.protocol !== "https:") return false;
        return ALLOWED_DOMAINS.some(
            (d) => u.hostname === d || u.hostname.endsWith(`.${d}`)
        );
    } catch {
        return false;
    }
}

function pickCandidateFields(r) {
    return {
        id: String(r._id),
        title: r.title,
        type: r.type,
        description: r.description || "",
        university: r.university,
        faculty: r.faculty,
        access_mode: r.access_mode,
        hasFiles: Array.isArray(r.files) && r.files.length > 0,
        url: r.url || "",
    };
}

async function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

async function listOpenRouterModels() {
    const r = await fetch("https://openrouter.ai/api/v1/models", {
        headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` },
    });
    if (!r.ok) throw new Error(`Models API failed: ${r.status}`);
    const data = await r.json();
    return data?.data ?? data?.models ?? [];
}

async function pickDeepSeekFreeModels() {
    const preferred = [
        "deepseek/deepseek-r1-0528:free",
        "deepseek/deepseek-chat-v3-0324:free",
    ];

    const models = await listOpenRouterModels();
    const ids = models.map((m) => m.id).filter(Boolean);

    const picked = [];

    for (const p of preferred) if (ids.includes(p)) picked.push(p);

    for (const id of ids) {
        if (id.startsWith("deepseek/") && id.includes(":free") && !picked.includes(id)) {
            picked.push(id);
        }
    }

    return picked.length ? picked : ["deepseek/deepseek-r1-0528:free"];
}

async function llmJsonText(prompt, { max_tokens = 800, prefill = "" } = {}) {
    let modelList = [];
    try {
        modelList = await pickDeepSeekFreeModels();
    } catch {
        modelList = ["deepseek/deepseek-r1-0528:free"];
    }

    const baseMessages = [
        {
            role: "system",
            content: "Return ONLY valid JSON. No markdown. No backticks. No extra text.",
        },
        { role: "user", content: prompt },
    ];

    for (const model of modelList) {
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const messages = [...baseMessages];

                if (prefill) messages.push({ role: "assistant", content: prefill });

                const resp = await openrouter.chat.send({
                    model,
                    messages,
                    temperature: 0.2,
                    max_tokens,
                });

                const text = resp?.choices?.[0]?.message?.content?.trim() || "";
                if (text) return text;

                await sleep(250 * attempt);
            } catch (e) {
                const status = e?.statusCode || e?.status || e?.response?.status;
                const msg =
                    e?.message ||
                    e?.body ||
                    e?.error?.message ||
                    e?.response?.data?.error?.message ||
                    String(e);

                console.error("[llmJsonText] failed", { model, attempt, status, msg });
                // retry on transient failures
                await sleep(250 * attempt);
            }
        }
    }

    return "";
}

module.exports.getRelatedResources = async (req, res) => {
    try {
        const limit = Math.max(3, Math.min(Number(req.query.limit || 3), 6));
        const current = await Resource.findById(req.params.id).lean();
        if (!current) return res.status(404).json({ message: "Resource not found" });

        const candidates = await Resource.find({
            _id: { $ne: current._id },
            university: current.university,
            faculty: current.faculty,
        })
            .limit(80)
            .lean();

        const candidatePayload = candidates.map(pickCandidateFields);

        let chosenIds = [];
        if (candidatePayload.length) {
            const promptPick = `
Pick the best ${limit} RELATED resources from candidates[] for CURRENT by TOPIC similarity (title + description).
Choose ONLY from candidates[].id.
Return ONLY JSON in this exact shape:
{"relatedIds":["id1","id2"],"needGenerate":0}

If you cannot find enough good matches, return fewer IDs and set needGenerate to the remaining count.

CURRENT:
${JSON.stringify(pickCandidateFields(current))}

CANDIDATES:
${JSON.stringify(candidatePayload)}
`;

            const pickText = await llmJsonText(promptPick, { max_tokens: 300, prefill: "{" });

            let pickJson = { relatedIds: [], needGenerate: limit };
            try {
                const jsonText = extractFirstJsonObject(pickText) || stripCodeFences(pickText);
                pickJson = JSON.parse(jsonText);
            } catch {
            }

            const candidateIdSet = new Set(candidatePayload.map((c) => c.id));
            chosenIds = Array.isArray(pickJson.relatedIds)
                ? pickJson.relatedIds.map(String).filter((id) => candidateIdSet.has(id))
                : [];
        }

        const chosen = chosenIds.length
            ? await Resource.find({ _id: { $in: chosenIds } }).lean()
            : [];

        const need = chosen.length === 0 ? limit : 0;
        let generated = [];

        if (need > 0) {
            const promptGen = `
Create EXACTLY ${need} external resources for the SAME TOPIC as CURRENT.

Return ONLY a JSON array. No markdown.
Each item MUST be exactly:
{"title":"...","type":"book|slides|course|exam|video","description":"(<=120 chars)","url":"https://..."}

Allowed domains ONLY:
wikipedia.org, worldcat.org, openstax.org, ocw.mit.edu, mit.edu

CURRENT:
${JSON.stringify({ title: current.title, type: current.type, description: current.description || "" })}
`;

            const genText = await llmJsonText(promptGen, { max_tokens: 900, prefill: "[" });

            console.log("Generated exactly:", genText);
            const arr = genText ? safeParseJsonArray(genText) : [];

            console.log("\n\n\n\n\narr    " + arr);

            const toCreate = arr.slice(0, need).map((x) => ({
                title: String(x.title || `External resource for ${current.title}`),
                type: ["book", "slides", "course", "exam", "video"].includes(x.type)
                    ? x.type
                    : current.type || "book",
                description: String(x.description || `External resource related to ${current.title}.`).slice(0, 120),
                url: String(x.url || "").trim(),
            }));

            console.log("\n\n\n\n\nToCreat    " + toCreate);

            const safeCreate = toCreate.filter((x) => isAllowedUrl(x.url));

            const util = require("util");
            console.log("safeCreate length:", safeCreate.length);
            console.log("safeCreate:", util.inspect(safeCreate, { depth: null, colors: true }));
            console.log("current.department:", current.department);

            if (safeCreate.length) {
                const docsToInsert = safeCreate.map((x) => ({
                    title: x.title,
                    type: x.type,
                    description: x.description,
                    university: current.university,
                    faculty: current.faculty,
                    department: current.department || "General",
                    tags: [],
                    access_mode: "generated",
                    files: [],
                    url: x.url,
                    thumbnail: "",
                    // uploader: current.uploader, // optional if you want
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }));

                const insertResult = await Resource.collection.insertMany(docsToInsert, {
                    ordered: false,
                });

                const insertedIds = Object.values(insertResult.insertedIds).map((v) => v);

                generated = await Resource.find({ _id: { $in: insertedIds } }).lean();
            }
        }

        const results = [...chosen, ...generated].slice(0, limit);
        return res.json({ resources: results });
    } catch (err) {
        console.error("getRelatedResources error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

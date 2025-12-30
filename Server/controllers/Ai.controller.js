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


function isAllowedUrl(url) {
    try {
        const u = new URL(url);
        if (u.protocol !== "https:") return false;
        return ALLOWED_DOMAINS.some((d) => u.hostname === d || u.hostname.endsWith(`.${d}`));
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


async function deepseekText(prompt,{ max_tokens = 800 } = {}) {
    const resp = await openrouter.chat.send({
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
            {
                role: "system",
                content:
                    "You are a backend recommendation engine. Follow instructions strictly and output ONLY what is requested.",
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.2,
        max_tokens,
    });

    return resp?.choices?.[0]?.message?.content || "";
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

        // ---------- 1) PICK RELATED IDs ----------
        if (candidatePayload.length) {
            const prompt = `
You are a recommendation engine.

Pick the best ${limit} RELATED resources from candidates[] for CURRENT.

"Related" means HIGH TOPIC similarity using title + description.
Do NOT pick just because same university/faculty—topic similarity is required.

Rules:
- Choose ONLY from candidates[].id
- Return STRICT RAW JSON ONLY (no markdown, no \`\`\`)
- If you cannot find ${limit} good matches, return fewer and set needGenerate.

Return:
{ "relatedIds": ["id1","id2"], "needGenerate": 1 }

CURRENT:
${JSON.stringify(pickCandidateFields(current))}

CANDIDATES:
${JSON.stringify(candidatePayload)}
`;
            const pickText = await deepseekText(prompt, { max_tokens: 300 });
            console.log("textttt       " + pickText);
            let json;
            try {
                const jsonText =
                    extractFirstJsonObject(pickText) || stripCodeFences(pickText);
                json = JSON.parse(jsonText);
            } catch (e) {
                console.error("DeepSeek pick JSON failed:", pickText);
                json = { relatedIds: [], needGenerate: limit };
            }

            console.log("json      " + json)


            const candidateIdSet = new Set(candidatePayload.map((c) => c.id));
            chosenIds = Array.isArray(json.relatedIds)
                ? json.relatedIds.map(String).filter((id) => candidateIdSet.has(id))
                : [];
        }

        // Fetch chosen resources
        const chosen = chosenIds.length
            ? await Resource.find({ _id: { $in: chosenIds } }).lean()
            : [];

        // ---------- 2) GENERATE EXTERNAL (URL) RESOURCES IF NEEDED ----------
        const need = chosen.length === 0 ? limit : 0;
        let generated = [];

        if (need > 0) {
            const promptGen = `
Create ${need} NEW external resources related to CURRENT by TOPIC similarity.

Constraints:
- Return STRICT RAW JSON ARRAY ONLY (no markdown, no \`\`\`)
- Each item:
  - title (string)
  - type ("book"|"slides"|"course"|"exam"|"video")
  - description (1-2 lines)
  - url (https) from trusted sources:
    Wikipedia / OpenStax / WorldCat / MIT OCW / MIT domains

Return exactly an array like:
[
  {"title":"...","type":"book","description":"...","url":"https://..."}
]

CURRENT:
${JSON.stringify(pickCandidateFields(current))}
`;

            const genText  = await deepseekText(promptGen, { max_tokens: 1200 });

            let arr;
            try {
                const arrText =
                    extractFirstJsonArray(genText) || stripCodeFences(genText);
                arr = JSON.parse(arrText);
            } catch (e) {
                console.error("DeepSeek gen JSON failed:", genText);
                arr = [];
            }


            const toCreate = (Array.isArray(arr) ? arr : [])
                .slice(0, need)
                .map((x) => ({
                    title: String(x.title || `External resource for ${current.title}`),
                    type: ["book", "slides", "course", "exam", "video"].includes(x.type)
                        ? x.type
                        : current.type || "book",
                    description: String(x.description || `External resource related to ${current.title}.`),
                    url: String(x.url || "").trim(),
                }));

            const safeCreate = toCreate.filter((x) => isAllowedUrl(x.url));

            if (safeCreate.length) {
                const created = await Resource.insertMany(
                    safeCreate.map((x) => ({
                        title: x.title,
                        type: x.type,
                        description: x.description,
                        university: current.university,
                        faculty: current.faculty,
                        department: current.department,
                        tags: [],
                        access_mode: "generated",
                        files: [],
                        url: x.url,
                        uploader: null,
                        thumbnail: "",
                    })),
                    { ordered: false }
                );

                generated = created.map((d) => (d.toObject?.() ?? d));
            }
        }

        const results = [...chosen, ...generated].slice(0, limit);
        return res.json({ resources: results });
    } catch (err) {
        console.error("getRelatedResources error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

const archiver = require("archiver");
const path = require("path");
const fs = require("fs");
const Resource = require("../models/Resource.model");

module.exports.downloadAllResourceFiles = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findById(id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    if (!resource.files || resource.files.length === 0) {
      return res.status(404).json({ message: "No files to download" });
    }

    // اسم ملف الـ ZIP
    const zipName = `${resource.title || "resource"}-files.zip`;

    res.setHeader("Content-Disposition", `attachment; filename="${zipName}"`);
    res.setHeader("Content-Type", "application/zip");

    const archive = archiver("zip", { zlib: { level: 9 } });

    // Logging لأي خطأ بالـ archive
    archive.on("error", (err) => {
      console.error("Archive error:", err);
      res.status(500).json({ message: "Archive failed", error: err.message });
    });

    // ربط الـ archive بالـ response
    archive.pipe(res);

    // أضف الملفات للـ ZIP بعد التحقق
    let filesAdded = 0;

    resource.files.forEach((file, index) => {
      if (!file) {
        console.warn(`Skipping file at index ${index}: missing path`);
        return;
      }

      // المسار الكامل على السيرفر
      const filePath = path.join(__dirname, "../", file);
      if (!fs.existsSync(filePath)) {
        console.warn(
          `Skipping file at index ${index}: file not found -> ${filePath}`
        );
        return;
      }

      // استخدم basename كاسم الملف داخل ZIP
      archive.file(filePath, { name: path.basename(filePath) });
      filesAdded++;
    });

    if (filesAdded === 0) {
      return res.status(404).json({ message: "No valid files to download" });
    }

    await archive.finalize();

    // إذا لم يتم إضافة أي ملف، ارجع خطأ
    if (archive.pointer() === 0) {
      return res.status(404).json({ message: "No valid files to download" });
    }

    // إبدأ البث النهائي للـ ZIP
    await archive.finalize();
  } catch (error) {
    console.error("Download all files error:", error);
    res
      .status(500)
      .json({ message: "Failed to download files", error: error.message });
  }
};

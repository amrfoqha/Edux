const express = require("express");
const router = express.Router();
const {
  downloadAllResourceFiles,
} = require("../controllers/downloadAllResourceFiles.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/download-all/:id", downloadAllResourceFiles);

module.exports = router;

const express = require("express");
const upload = require("../config/upload.config.js");
const uploadFiles = require("../controllers/upload.controller.js");

const router = express.Router();

router.post(
  "/",
  upload.array("files", 10), // max 10 files
  uploadFiles
);

module.exports = router;

const express = require("express");
const router = express.Router();
const ResourceController = require("../controllers/resource.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.get("/", ResourceController.findAllResources);
router.get("/page", ResourceController.getResourcesByPage);
router.get("/:id", ResourceController.findResource);
router.post("/", ResourceController.createResource);
router.patch("/:id", ResourceController.updateResource);
router.delete("/:id", ResourceController.deleteResource);

module.exports = router;

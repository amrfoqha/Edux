const express = require("express");
const router = express.Router();
const ResourceController = require("../controllers/resource.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// router.use(authMiddleware);

router.get("/", authMiddleware, ResourceController.findAllResources);
router.get("/page", ResourceController.getResourcesByPage);
router.get("/:id", ResourceController.findResource);
router.post("/", authMiddleware, ResourceController.createResource);
router.patch("/:id", authMiddleware, ResourceController.updateResource);
router.delete("/:id", authMiddleware, ResourceController.deleteResource);
router.put(
  "/:id/average-rating",
  ResourceController.updateResourceAverageRating
);
module.exports = router;

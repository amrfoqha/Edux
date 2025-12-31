const express = require("express");
const router = express.Router();
const ResourceRequestController = require("../controllers/resource_request.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.get("/", ResourceRequestController.findAllRequests);
router.get("/:id", ResourceRequestController.findOneRequest);
router.post("/", ResourceRequestController.createRequest);
router.patch("/:id", ResourceRequestController.updateRequest);
router.delete("/:id", ResourceRequestController.deleteRequest);
router.get("/status/:id/:user", ResourceRequestController.getResourceStatus);
router.get("/user/:id", ResourceRequestController.getUserRequests);

module.exports = router;

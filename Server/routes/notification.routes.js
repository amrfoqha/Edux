const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/notification.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, NotificationController.findAllNotifications);
router.get(
  "/user/:userId",
  authMiddleware,
  NotificationController.findNotificationsByUserId
);
router.get("/:id", authMiddleware, NotificationController.findNotification);
router.post("/", authMiddleware, NotificationController.createNotification);
router.patch("/:id", authMiddleware, NotificationController.updateNotification);
router.delete(
  "/:id",
  authMiddleware,
  NotificationController.deleteNotification
);
router.patch("/:id", NotificationController.updateNotification);
router.get("/unread/:userId", NotificationController.getUnReadNotifications);

module.exports = router;

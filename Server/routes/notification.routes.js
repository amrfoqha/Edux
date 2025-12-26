const express = require("express");
const router = express.Router();
const NotificationController = require('../controllers/notification.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.get('/', NotificationController.findAllNotifications);
router.get('/user/:userId', NotificationController.findNotificationsByUserId);
router.get('/:id', NotificationController.findNotification);
router.post('/', NotificationController.createNotification);
router.patch('/:id', NotificationController.updateNotification);
router.delete('/:id', NotificationController.deleteNotification);

module.exports = router;

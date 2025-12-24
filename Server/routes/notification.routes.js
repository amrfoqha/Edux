const NotificationController = require('../controllers/notification.controller');

module.exports = app => {
    app.get('/api/notifications', NotificationController.findAllNotifications);
    app.get('/api/notifications/user/:userId', NotificationController.findNotificationsByUserId);
    app.get('/api/notifications/:id', NotificationController.findNotification);
    app.post('/api/notifications', NotificationController.createNotification);
    app.patch('/api/notifications/:id', NotificationController.updateNotification);
    app.delete('/api/notifications/:id', NotificationController.deleteNotification);
}

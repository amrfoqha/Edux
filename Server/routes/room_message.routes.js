const RoomMessageController = require('../controllers/room_message.controller');

module.exports = app => {
    app.get('/api/room-messages', RoomMessageController.findAllMessages);
    app.get('/api/room-messages/:id', RoomMessageController.findOneMessage);
    app.post('/api/room-messages', RoomMessageController.createMessage);
    app.patch('/api/room-messages/:id', RoomMessageController.updateMessage);
    app.delete('/api/room-messages/:id', RoomMessageController.deleteMessage);
}

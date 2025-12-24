const ChatController = require('../controllers/chat.controller');

module.exports = app => {
    app.get('/api/chats', ChatController.findAllChats);
    app.get('/api/chats/user/:userId', ChatController.findChatsByUserId);
    app.get('/api/chats/:id', ChatController.findChat);
    app.post('/api/chats', ChatController.createChat);
    app.patch('/api/chats/:id', ChatController.updateChat);
    app.delete('/api/chats/:id', ChatController.deleteChat);
}

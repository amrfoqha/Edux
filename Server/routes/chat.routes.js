const express = require("express");
const router = express.Router();
const ChatController = require('../controllers/chat.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.get('/unread', ChatController.getUnreadCounts);
router.get('/', ChatController.findAllChats);
router.get('/user/:userId', ChatController.findChatsByUserId);
router.get('/conversation/:otherUserId', ChatController.getConversation);
router.get('/last-messages', ChatController.getLastMessages);
router.get('/:id', ChatController.findChat);
router.post('/', ChatController.createChat);
router.patch('/:id', ChatController.updateChat);
router.delete('/:id', ChatController.deleteChat);
router.put('/read/:senderId', ChatController.markAsRead);

module.exports = router;

const express = require("express");
const router = express.Router();
const ChatController = require('../controllers/chat.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.get('/', ChatController.findAllChats);
router.get('/user/:userId', ChatController.findChatsByUserId);
router.get('/:id', ChatController.findChat);
router.post('/', ChatController.createChat);
router.patch('/:id', ChatController.updateChat);
router.delete('/:id', ChatController.deleteChat);

module.exports = router;

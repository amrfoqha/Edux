const express = require("express");
const router = express.Router();
const RoomMessageController = require('../controllers/room_message.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.get('/', RoomMessageController.findAllMessages);
router.get('/:id', RoomMessageController.findOneMessage);
router.post('/', RoomMessageController.createMessage);
router.patch('/:id', RoomMessageController.updateMessage);
router.delete('/:id', RoomMessageController.deleteMessage);

module.exports = router;

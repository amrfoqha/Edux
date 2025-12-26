const express = require("express");
const router = express.Router();
const RoomController = require('../controllers/room.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.get('/', RoomController.findAllRooms);
router.get('/:id', RoomController.findRoom);
router.post('/', RoomController.createRoom);
router.patch('/:id', RoomController.updateRoom);
router.delete('/:id', RoomController.deleteRoom);

module.exports = router;

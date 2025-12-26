const express = require("express");
const router = express.Router();
const RoomMemberController = require('../controllers/room_member.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.get('/', RoomMemberController.findAllMembers);
router.get('/:id', RoomMemberController.findOneMember);
router.post('/', RoomMemberController.createMember);
router.patch('/:id', RoomMemberController.updateMember);
router.delete('/:id', RoomMemberController.deleteMember);

module.exports = router;

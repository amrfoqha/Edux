const RoomMemberController = require('../controllers/room_member.controller');

module.exports = app => {
    app.get('/api/room-members', RoomMemberController.findAllMembers);
    app.get('/api/room-members/:id', RoomMemberController.findOneMember);
    app.post('/api/room-members', RoomMemberController.createMember);
    app.patch('/api/room-members/:id', RoomMemberController.updateMember);
    app.delete('/api/room-members/:id', RoomMemberController.deleteMember);
}

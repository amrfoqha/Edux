const RoomController = require('../controllers/room.controller');

module.exports = app => {
    app.get('/api/rooms', RoomController.findAllRooms);
    app.get('/api/rooms/:id', RoomController.findRoom);
    app.post('/api/rooms', RoomController.createRoom);
    app.patch('/api/rooms/:id', RoomController.updateRoom);
    app.delete('/api/rooms/:id', RoomController.deleteRoom);
}

import api from "./baseUrl.jsx";

export const createRoom = async (room) => {
    try {
        console.log(room);
        const response = await api.post("/rooms", {
            name: room.formData.name,
            description: room.formData.description,
            owner: room.owner
        });
        console.log("Created:", response);
        return response;
    } catch (error) {
        console.error("Error creating resource:", error);
        throw error;
    }
}

export const getAllRooms = async () => {
    try {
        const res = await api.get("/rooms");
        return res.data;
    } catch (error) {
        console.error("Error getting all room for rooms:", error);
        throw error;
    }
}

export const getRoom = async (roomId) => {
    try {
        const response = await api.get(`/rooms/${roomId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting room for room:", error);
    }
}

export const joinRoom = async (data) => {
    try {
        const res = await api.post("/room-members", data);
        return res.data;
    } catch (error) {
        console.error("Error joining room:", error);
    }
}
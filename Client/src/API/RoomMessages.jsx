import api from "@/API/baseUrl.jsx";

export const createRoomMessage = async (data) => {
    try {
        const response = await api.post("/rooms", {data})
        console.log("Created:", response);
        return response;
    } catch (error) {
        console.error("Error creating resource:", error);
        throw error;
    }
}

export const getByRoomId = async (roomId) => {
    try {
        const res = await api.get(`/room-messages/room/${roomId}`);
        return res.data;
    } catch (error) {
        console.error("Error getting resource:", error);
    }
}
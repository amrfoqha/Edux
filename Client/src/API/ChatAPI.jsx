import api from "./baseUrl.jsx";

export const getConversation = async (otherUserId) => {
    try {
        const res = await api.get(`/chats/conversation/${otherUserId}`);
        return res.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getUnreadCounts = async () => {
    try {
        const res = await api.get("/chats/unread");
        return res.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}


export const markMessagesAsRead = async (senderId) => {
    try {
        const res = await api.put(`/chats/read/${senderId}`);
        return res.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const getLastMessages = async () => {
    try {
        const res = await api.get("/chats/last-messages");
        return res.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
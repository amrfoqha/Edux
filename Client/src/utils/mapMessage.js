export function mapMessage(msg, currentUserId) {
    const senderId =
        typeof msg.sender === "object"
            ? msg.sender?._id
            : msg.sender;

    return {
        id: msg._id,
        text: msg.message,
        sender: senderId,
        createdAt: msg.createdAt,
        isRead: msg.isRead,
        isMine: String(senderId) === String(currentUserId),
    };
}

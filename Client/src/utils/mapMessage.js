export function mapMessage(msg, currentUserId) {
    return {
        id: msg._id,
        text: msg.message,
        isMine: msg.sender?._id === currentUserId,
        sender: msg.sender,
        createdAt: msg.createdAt,
        isRead: msg.isRead,
    };
}

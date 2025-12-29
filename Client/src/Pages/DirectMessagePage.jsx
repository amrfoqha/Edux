import DirectHeader from "../Components/chat/DirectHeader.jsx";
import MessageList from "../Components/chat/MessageList.jsx";
import ChatInput from "../Components/shared/ChatInput.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../API/UserAPI";
import { getConversation, markMessagesAsRead } from "../API/ChatAPI.jsx";
import { useEffect, useState } from "react";
import ChatLayout from "../Layouts/ChatLayout.jsx";
import { mapMessage } from "../utils/mapMessage.js";
import LoadingOverlay from "../Components/LoadingOverlay.jsx";
import { EVENTS } from "../socket/events";
import socket from "../socket.js";

export default function DirectMessagePage({ currentUser }) {
    const onNavigate = useNavigate();
    const { otherUserId } = useParams();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [otherUser, setOtherUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOtherUser = async () => {
            try {
                if (otherUserId) {
                    const user = await getUserById(otherUserId);
                    setOtherUser(user);

                    // Fetch conversation history
                    const history = await getConversation(otherUserId);
                    if (history) {
                        setMessages(history.map(msg => mapMessage(msg, currentUser._id)));
                        // Mark messages as read
                        await markMessagesAsRead(otherUserId);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch user or conversation", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOtherUser();
    }, [otherUserId]);

    // useEffect(() => {
    //     if (!currentUser || !otherUser) return;
    //
    //     const socket = getSocket();
    //
    //     const joinRoom = () => {
    //         socket.emit(EVENTS.JOIN_DM, { otherUserId: otherUser._id });
    //     };
    //
    //     joinRoom();
    //     socket.on("connect", joinRoom);
    //
    //     const handleDM = (msg) => {
    //         const senderId = msg.sender?._id || msg.sender;
    //         if (String(senderId) === String(otherUser._id) || String(senderId) === String(currentUser._id)) {
    //             setMessages((prev) => [...prev, mapMessage(msg, currentUser._id)]);
    //         }
    //     };
    //
    //     const handleStatusUpdate = ({ userId, isOnline }) => {
    //         if (String(userId) === String(otherUser._id)) {
    //             setOtherUser((prev) => ({ ...prev, isOnline }));
    //         }
    //     };
    //
    //     socket.on(EVENTS.DM_RECEIVE, handleDM);
    //     socket.on(EVENTS.USER_STATUS, handleStatusUpdate);
    //
    //     return () => {
    //         socket.off("connect", joinRoom);
    //         socket.off(EVENTS.DM_RECEIVE, handleDM);
    //         socket.off(EVENTS.USER_STATUS, handleStatusUpdate);
    //         socket.emit(EVENTS.LEAVE_DM, { otherUserId: otherUser._id });
    //     };
    // }, [currentUser, otherUser]);

    useEffect(() => {
        if (!currentUser || !otherUser) return;

        const joinRoom = () => {
            socket.emit(EVENTS.JOIN_DM, { otherUserId: otherUser._id });
        };

        joinRoom();
        socket.on("connect", joinRoom);

        const handleDM = (msg) => {
            const senderId = msg.sender?._id || msg.sender;

            if (
                String(senderId) === String(otherUser._id) ||
                String(senderId) === String(currentUser._id)
            ) {
                setMessages((prev) => [...prev, mapMessage(msg, currentUser._id)]);
            }
        };

        socket.on(EVENTS.DM_RECEIVE, handleDM);

        const handleStatusUpdate = ({ userId, isOnline }) => {
            if (String(userId) === String(otherUser._id)) {
                setOtherUser((prev) => ({ ...prev, isOnline }));
            }
        };

        socket.on(EVENTS.USER_STATUS, handleStatusUpdate);

        const handleSnapshot = ({ onlineUserIds }) => {
            const onlineSet = new Set((onlineUserIds || []).map(String));
            setOtherUser((prev) => ({ ...prev, isOnline: onlineSet.has(String(prev._id)) }));
        };
        socket.on(EVENTS.PRESENCE_SNAPSHOT, handleSnapshot);

        return () => {
            socket.off("connect", joinRoom);
            socket.off(EVENTS.DM_RECEIVE, handleDM);
            socket.off(EVENTS.USER_STATUS, handleStatusUpdate);
            socket.off(EVENTS.PRESENCE_SNAPSHOT, handleSnapshot);
            socket.emit(EVENTS.LEAVE_DM, { otherUserId: otherUser._id });
        };
    }, [currentUser, otherUser]);



    const sendMessage = (text) => {
        if (!text.trim() || !otherUser) return;

        const msgObj = {
            from: currentUser._id,
            to: otherUser._id,
            message: text,
            createdAt: new Date().toISOString(),
            sender: currentUser,
            _id: Date.now().toString(),
        };

        // Emit on the same socket instance
        socket.emit(EVENTS.DM_SEND, { to: otherUser._id, message: text });

        setMessages((prev) => [...prev, mapMessage(msgObj, currentUser._id)]);
        setMessage("");
    };


    if (loading) return <LoadingOverlay />;
    if (!otherUser) return <div>User not found</div>;

    return (
        <ChatLayout>
            <DirectHeader onNavigate={onNavigate} user={otherUser} />

            <MessageList messages={messages} />

            <ChatInput
                value={message}
                onChange={setMessage}
                onSend={() => sendMessage(message)}
                placeholder="Type a message..."
            />
        </ChatLayout>
    );
}

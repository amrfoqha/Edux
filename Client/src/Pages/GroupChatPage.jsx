import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import GroupChatHeader from "../Components/chat/GroupChatHeader.jsx";
import ChatInput from "../Components/shared/ChatInput.jsx";
import MembersSidebar from "../Components/chat/MembersSidebar.jsx";
import ChatLayout from "../Layouts/ChatLayout.jsx";
import MessageList from "../Components/chat/MessageList.jsx";
import socket from "../socket.js";
import { mapMessage } from "../utils/mapMessage.js";

export default function GroupChatPage({ currentUser, roomId, onNavigate }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [showMembers, setShowMembers] = useState(false);
    const members = [];

    const roomInfo = {
        name: "CS101 Study Group",
        color: "from-primary to-info",
    };

    useEffect(() => {
        if (!roomId) return;

        // Join the room
        socket.emit("room:join", { roomId, userId: currentUser._id });

        // Receive messages
        socket.on("room:receive", (msg) => {
            setMessages((prev) => [...prev, mapMessage(msg, currentUser._id)]);
        });

        return () => {
            socket.emit("room:leave", { roomId, userId: currentUser._id });
            socket.off("room:receive");
        };
    }, [roomId, currentUser._id]);

    const sendMessage = (text) => {
        if (!text.trim()) return;

        const msgObj = {
            roomId,
            sender: currentUser._id,
            message: text,
            createdAt: new Date(),
        };

        // Emit the message to the server
        socket.emit("room:send", msgObj);

        // Immediately display locally
        setMessages((prev) => [...prev, mapMessage(msgObj, currentUser._id)]);

        setMessage("");
    };

    return (
        <ChatLayout>
            <GroupChatHeader
                room={roomInfo}
                members={members}
                onBack={() => onNavigate("chat-rooms")}
                onToggleMembers={() => setShowMembers(!showMembers)}
            />

            <div className="flex flex-1 overflow-hidden">
                <MessageList messages={messages} showSender />

                <AnimatePresence>
                    {showMembers && <MembersSidebar members={members} />}
                </AnimatePresence>
            </div>

            <ChatInput
                value={message}
                onChange={setMessage}
                onSend={() => sendMessage(message)}
                placeholder="Message the group..."
            />
        </ChatLayout>
    );
}

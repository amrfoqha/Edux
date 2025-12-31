import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import GroupChatHeader from "../Components/chat/GroupChatHeader.jsx";
import ChatInput from "../Components/shared/ChatInput.jsx";
import MembersSidebar from "../Components/chat/MembersSidebar.jsx";
import ChatLayout from "../Layouts/ChatLayout.jsx";
import MessageList from "../Components/chat/MessageList.jsx";
import socket from "../socket.js";
import { mapMessage } from "../utils/mapMessage.js";
import { getRoom } from "@/API/RoomApi.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { getByRoomId } from "@/API/RoomMessages.jsx";

export default function GroupChatPage({ currentUser }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const members = [];
  const [roomInfo, setRoomInfo] = useState();
  const [room, setRoom] = useState();
  const { id } = useParams();
  const onNavigate = useNavigate();

  useEffect(() => {
    async function getCurrentRoom() {
      const res = await getRoom(id);
      setRoomInfo(() => ({
        name: res.name,
        color: "from-primary to-secondary",
      }));
      setRoom(res);
    }
    getCurrentRoom();
  }, []);

  useEffect(() => {
    async function getMessages() {
      try {
        const res = await getByRoomId(id);
        const rawMessages = Array.isArray(res) ? res : res?.message ?? [];

        setMessages(rawMessages.map((m) => mapMessage(m, currentUser._id)));
      } catch (e) {
        console.error(e);
        setMessages([]);
      }
    }

    if (id && currentUser?._id) getMessages();
  }, [id, currentUser?._id]);

  useEffect(() => {
    if (!id) return;

    // Join the room
    socket.emit("room:join", { id });

    // Receive messages
    socket.on("room:receive", (msg) => {
      setMessages((prev) => [...prev, mapMessage(msg, currentUser._id)]);
    });

    return () => {
      socket.emit("room:leave", { id, userId: currentUser._id });
      socket.off("room:receive");
    };
  }, [id, currentUser._id]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const msgObj = {
      id,
      sender: currentUser._id,
      message: text,
      createdAt: new Date(),
    };

    // Emit the message to the server
    socket.emit("room:send", { id, message: text });

    // Immediately display locally
    setMessages((prev) => [...prev, mapMessage(msgObj, currentUser._id)]);

    setMessage("");
  };

  return (
    <ChatLayout>
      <GroupChatHeader
        room={roomInfo}
        members={room?.memberCount}
        onBack={() => onNavigate("/rooms")}
        onToggleMembers={() => setShowMembers(!showMembers)}
      />

      <div className="flex flex-1 overflow-hidden">
        <MessageList messages={messages} showSender />

        <AnimatePresence>
          {showMembers && <MembersSidebar members={room.memberCount} />}
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

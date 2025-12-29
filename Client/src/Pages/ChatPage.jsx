import {useEffect, useState} from "react";
import ChatHeader from "../components/chat/ChatHeader";
import ChatStats from "../components/chat/ChatStats";
import ConversationList from "../components/chat/ConversationList";
import {useNavigate} from "react-router-dom";
import ChatSearch from "../Components/chat/ChatSearch.jsx";
import {getAllUsers} from "../API/UserAPI";
import {getLastMessages, getUnreadCounts} from "../API/ChatAPI";
import {useAuth} from "../Hooks/useAuth";
import {EVENTS} from "../socket/events.js";
import socket from "../socket.js";

export default function ChatPage() {
    const onNavigate = useNavigate();
    const {user: currentUser} = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const [users, unreadMap, lastMessagesMap] = await Promise.all([
                    getAllUsers(),
                    getUnreadCounts(),
                    getLastMessages()
                ]);

                console.log(users);

                // Filter out current user and map to conversation format
                const mappedConversations = users
                    .filter(u => String(u._id) !== String(currentUser?._id))
                    .map(u => {
                        const lastMsgData = lastMessagesMap[u._id];
                        return {
                            id: u._id,
                            name: u.name,
                            lastMessage: lastMsgData?.message || "Start a conversation",
                            timestamp: lastMsgData?.timestamp ? new Date(lastMsgData?.timestamp).toLocaleString() : "",
                            unread: unreadMap[u._id] || 0,
                            online: u.isOnline || false
                        };
                    });
                setConversations(mappedConversations);
            } catch (error) {
                console.error("Failed to fetch users or chat data", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) {
            fetchUsers();
        }
    }, [currentUser]);

    useEffect(() => {
        if (!socket || !currentUser) return;

        const handleSnapshot = ({onlineUserIds}) => {
            const onlineSet = new Set((onlineUserIds || []).map(String));

            setConversations((prev) =>
                prev.map((conv) => ({
                    ...conv,
                    online: onlineSet.has(String(conv.id)),
                }))
            );
        };

        const handleStatusUpdate = ({userId, isOnline}) => {
            setConversations((prev) =>
                prev.map((conv) =>
                    String(conv.id) === String(userId) ? {...conv, online: isOnline} : conv
                )
            );
        };

        socket.on(EVENTS.PRESENCE_SNAPSHOT, handleSnapshot);
        socket.on(EVENTS.USER_STATUS, handleStatusUpdate);

        return () => {
            socket.off(EVENTS.PRESENCE_SNAPSHOT, handleSnapshot);
            socket.off(EVENTS.USER_STATUS, handleStatusUpdate);
        };
    }, [currentUser]);


    const handleNavigate = (type, id) => {
        // ConversationList passes ("direct-message", id)
        if (type === "direct-message") {
            onNavigate(`/dm/${id}`);
        }
    };

    const filteredConversations = conversations.filter((conv) =>
        conv?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <ChatHeader subText={"Connect with students and manage your conversations"} text={"Messages"}
                            routeText={"Browse Rooms"} onNavigate={onNavigate} route={"/rooms"}/>

                <ChatSearch value={searchQuery} onChange={setSearchQuery}/>

                <ChatStats
                    unreadCount={conversations.reduce((a, c) => a + (c.unread || 0), 0)}
                    onNavigate={onNavigate}
                />

                <ConversationList
                    conversations={filteredConversations}
                    onNavigate={handleNavigate}
                />
            </div>
        </div>
    );
}

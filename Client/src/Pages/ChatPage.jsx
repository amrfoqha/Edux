import { useState } from "react";
import ChatHeader from "../components/chat/ChatHeader";
import ChatStats from "../components/chat/ChatStats";
import ConversationList from "../components/chat/ConversationList";
import {useNavigate} from "react-router-dom";
import ChatSearch from "../Components/chat/ChatSearch.jsx";

export default function ChatPage({ conversations = [] }) {
    const onNavigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("");

    const filteredConversations = conversations.filter((conv) =>
        conv?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <ChatHeader onNavigate={onNavigate} />

                <ChatSearch value={searchQuery} onChange={setSearchQuery} />

                <ChatStats
                    unreadCount={conversations.reduce((a, c) => a + (c.unread || 0), 0)}
                    onNavigate={onNavigate}
                />

                <ConversationList
                    conversations={filteredConversations}
                    onNavigate={onNavigate}
                />
            </div>
        </div>
    );
}

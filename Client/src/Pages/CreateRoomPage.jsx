import React from "react";
import RoomHeader from "../Components/chat/room/RoomHeadeer.jsx";
import RoomFormCard from "../Components/chat/room/RoomFormCard.jsx";

export function CreateRoomPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <RoomHeader />
                <RoomFormCard />
            </div>
        </div>
    );
}

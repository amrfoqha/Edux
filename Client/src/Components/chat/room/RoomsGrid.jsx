import React from "react";
import { motion } from "motion/react";
import RoomCard from "./RoomCard.jsx";

export default function RoomsGrid({ rooms = [] }) {
    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.08 } },
    };

    const item = {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {rooms.map((room) => (
                <motion.div key={room._id} variants={item}>
                    <RoomCard
                        room={room}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
}

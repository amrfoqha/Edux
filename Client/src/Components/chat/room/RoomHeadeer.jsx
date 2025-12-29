import React from "react";
import { Users } from "lucide-react";
import { motion } from "motion/react";

export default function RoomHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
        >
            <div className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-full mb-6 shadow-lg border border-purple-100">
                <Users className="h-5 w-5 text-purple-500" />
                <span className="font-semibold text-purple-600">Create Study Room</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
          Start Your Study Group
        </span>
            </h1>

            <p className="text-lg text-muted-foreground">
                Create a collaborative space for you and your peers
            </p>
        </motion.div>
    );
}

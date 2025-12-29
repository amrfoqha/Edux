import React from "react";
import { motion } from "motion/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../ui/Card.jsx";
import RoomForm from "@/Components/chat/room/RoomForm.jsx";

export default function RoomFormCard() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="shadow-2xl border-0 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />

                <CardHeader className="space-y-1 pb-6">
                    <CardTitle className="text-2xl">Room Details</CardTitle>
                    <CardDescription className="text-base">
                        Give your room a name and (optionally) a short description
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <RoomForm />
                </CardContent>
            </Card>
        </motion.div>
    );
}

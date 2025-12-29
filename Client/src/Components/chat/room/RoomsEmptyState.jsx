import React from "react";
import { motion } from "motion/react";
import { MessageCircle, Plus } from "lucide-react";
import { Button } from "@/Components/ui/Button.jsx";

export default function RoomsEmptyState({ onCreate }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
        >
            <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-3xl inline-flex mb-6">
                <MessageCircle className="h-20 w-20 text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-3">No rooms found</h3>
            <p className="text-muted-foreground text-lg mb-6">
                Try adjusting your search or create a new room
            </p>

            <Button size="lg" className="shadow-xl" onClick={onCreate}>
                <Plus className="h-5 w-5 mr-2" />
                Create New Room
            </Button>
        </motion.div>
    );
}

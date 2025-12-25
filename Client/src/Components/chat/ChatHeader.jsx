import { Users } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "motion/react";

export default function ChatHeader({ onNavigate }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold mb-3 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Messages
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Connect with students and manage your conversations
                    </p>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        size="lg"
                        onClick={() => onNavigate("chat-rooms")}
                        className="shadow-xl bg-gradient-to-r from-primary to-info"
                    >
                        <Users className="h-5 w-5 mr-2" />
                        Browse Chat Rooms
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
}

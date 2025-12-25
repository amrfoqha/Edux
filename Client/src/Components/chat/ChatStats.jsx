import { Users, MessageCircle, ArrowRight } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";

export default function ChatStats({ unreadCount, onNavigate }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                    onClick={() => onNavigate("chat-rooms")}
                    className="border-0 shadow-xl cursor-pointer overflow-hidden"
                >
                    <div className="h-2 bg-gradient-to-r from-primary to-info" />
                    <div className="p-8 flex items-center gap-4">
                        <div className="bg-gradient-to-br from-primary to-info p-4 rounded-2xl">
                            <Users className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold">Group Chats</h3>
                            <p className="text-muted-foreground">
                                Join study groups and collaborate
                            </p>
                        </div>
                        <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    </div>
                </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="border-0 shadow-xl overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-secondary to-accent" />
                    <div className="p-8 flex items-center gap-4">
                        <div className="bg-gradient-to-br from-secondary to-accent p-4 rounded-2xl">
                            <MessageCircle className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold">Direct Messages</h3>
                            <p className="text-muted-foreground">Private conversations</p>
                        </div>
                        <Badge className="bg-primary text-white">{unreadCount}</Badge>
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
}

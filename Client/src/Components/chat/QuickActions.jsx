import { MessageCircle, Users, ArrowRight } from "lucide-react";
import { Card } from "..//ui/card";
import { Badge } from "..//ui/badge";
import { motion } from "motion/react";

export default function QuickActions({ conversations, onNavigate }) {
    const unreadCount = conversations.reduce(
        (acc, conv) => acc + (conv.unread || 0),
        0
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                    className="border-0 shadow-xl cursor-pointer overflow-hidden hover:shadow-2xl transition-all"
                    onClick={() => onNavigate("chat-rooms")}
                >
                    <div className="h-2 bg-linear-to-r from-primary to-info" />
                    <div className="p-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-primary to-info p-4 rounded-2xl">
                                <Users className="h-8 w-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-1">Group Chats</h3>
                                <p className="text-muted-foreground">
                                    Join study groups and collaborate
                                </p>
                            </div>
                            <ArrowRight className="h-6 w-6 text-muted-foreground" />
                        </div>
                    </div>
                </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="border-0 shadow-xl cursor-pointer overflow-hidden hover:shadow-2xl transition-all">
                    <div className="h-2 bg-gradient-to-r from-secondary to-accent" />
                    <div className="p-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-secondary to-accent p-4 rounded-2xl">
                                <MessageCircle className="h-8 w-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-1">Direct Messages</h3>
                                <p className="text-muted-foreground">
                                    Private conversations below
                                </p>
                            </div>
                            <Badge className="bg-primary text-white">
                                {unreadCount}
                            </Badge>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
}

import { Card } from "../ui/card";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import ConversationItem from "./ConversationItem";

export default function ConversationList({ conversations, onNavigate }) {
    if (!conversations.length) {
        return (
            <Card className="border-0 shadow-lg p-20 text-center">
                <MessageCircle className="h-16 w-16 mx-auto mb-6 text-primary" />
                <h3 className="text-2xl font-bold">No conversations found</h3>
                <p className="text-muted-foreground">
                    Start chatting with other students
                </p>
            </Card>
        );
    }

    return (
        <motion.div className="space-y-4">
            {conversations.map((conv) => (
                <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    onClick={() => onNavigate("direct-message", conv.id)}
                />
            ))}
        </motion.div>
    );
}

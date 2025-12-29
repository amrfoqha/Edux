import { motion } from "motion/react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { formatTime } from "../../utils/chatTime.js";

export default function MessageBubble({ message, showSender }) {
    console.log(message.createdAt)
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${message.isMine ? "flex-row-reverse" : "flex-row"}`}
        >
            {!message.isMine && (
                <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-linear-to-br from-secondary to-accent text-white">
                        {message.avatar}
                    </AvatarFallback>
                </Avatar>
            )}

            <div className={`flex flex-col max-w-[70%] ${message.isMine ? "items-end" : "items-start"}`}>
                {showSender && !message.isMine && (
                    <span className="text-xs font-semibold text-muted-foreground mb-1 px-1">
                        {message.sender}
                    </span>
                )}

                <div
                    className={`rounded-2xl px-5 py-3 shadow-md ${message.isMine
                        ? "bg-linear-to-r from-primary to-secondary text-white rounded-br-sm"
                        : !message.isRead
                            ? "bg-primary/5 border-2 border-primary/20 rounded-bl-sm"
                            : "bg-white border-2 border-muted rounded-bl-sm"
                        }`}
                >
                    <p>{message.text}</p>
                </div>


                <span className="text-xs text-muted-foreground mt-1 px-1">
                    {formatTime(message.createdAt)}
                </span>

            </div>

            {message.isMine && (
                <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-linear-to-br from-primary to-secondary text-white">
                        {message.avatar}
                    </AvatarFallback>
                </Avatar>
            )}
        </motion.div>
    );
}

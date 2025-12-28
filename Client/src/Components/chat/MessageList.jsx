import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/ScrollArea";
import MessageBubble from "../shared/MessageBubble";
import DateDivider from "./DateDivider";
import { getDateLabel } from "../../utils/chatDates";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";

export default function MessageList({
    messages,
    showSender = false,
    maxWidth = "max-w-4xl",
}) {
    const viewportRef = useRef(null);
    const bottomRef = useRef(null);

    const [isAtBottom, setIsAtBottom] = useState(true);
    const [showNewMessageBtn, setShowNewMessageBtn] = useState(false);

    const handleScroll = (e) => {
        const el = e.target;
        const nearBottom =
            el.scrollHeight - el.scrollTop - el.clientHeight < 80;

        setIsAtBottom(nearBottom);

        if (nearBottom) {
            setShowNewMessageBtn(false);
        }
    };

    useEffect(() => {
        if (!isAtBottom) {
            setShowNewMessageBtn(true);
            return;
        }

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messages, isAtBottom]);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
        setShowNewMessageBtn(false);
    };

    let lastDateLabel = null;

    const firstUnreadIndex = messages.findIndex(
        (m) => !m.isMine && !m.isRead
    );

    return (
        <div className="relative flex-1">
            <ScrollArea
                ref={viewportRef}
                onScroll={handleScroll}
                className="h-full p-6"
            >
                <div className={`space-y-6 ${maxWidth} mx-auto`}>
                    <AnimatePresence initial={false}>
                        {messages.map((msg, index) => {
                            const currentLabel = getDateLabel(msg.createdAt);
                            const showDateDivider = currentLabel !== lastDateLabel;
                            lastDateLabel = currentLabel;

                            const showUnreadDivider = index === firstUnreadIndex;
                            return (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {showDateDivider && (
                                        <DateDivider label={currentLabel} />
                                    )}

                                    {showUnreadDivider && (
                                        <div className="flex items-center gap-4 my-4">
                                            <div className="flex-1 h-px bg-border" />
                                            <span className="text-xs font-semibold text-muted-foreground">
                                                Unread messages
                                            </span>
                                            <div className="flex-1 h-px bg-border" />
                                        </div>
                                    )}

                                    <MessageBubble
                                        key={msg.id}
                                        message={msg}
                                        showSender={showSender}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    <div ref={bottomRef} />
                </div>
            </ScrollArea>

            <AnimatePresence>
                {showNewMessageBtn && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2"
                    >
                        <Button
                            onClick={scrollToBottom}
                            className="rounded-full shadow-lg flex items-center gap-2 px-4"
                        >
                            New messages
                            <ArrowDown className="h-4 w-4" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

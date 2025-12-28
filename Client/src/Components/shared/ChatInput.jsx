import { Send, Paperclip, Image as ImageIcon } from "lucide-react";
import { Button } from "..//ui/button";
import { Input } from "..//ui/input";
import { motion } from "motion/react";

export default function ChatInput({
                                      value,
                                      onChange,
                                      onSend,
                                      placeholder = "Type a message...",
                                      disabled,
                                  }) {
    return (
        <div className="border-t bg-white p-6">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-end gap-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-full shadow-md">
                            <Paperclip className="h-5 w-5" />
                        </Button>
                    </motion.div>

                    <div className="flex-1 relative">
                        <Input
                            placeholder={placeholder}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
                            className="h-14 pr-14 text-base border-2 shadow-md rounded-xl"
                            disabled={disabled}
                        />

                        <motion.div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-full"
                                >
                                    <ImageIcon className="h-5 w-5" />
                                </Button>
                            </motion.div>
                        </motion.div>

                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            onClick={onSend}
                            disabled={!value.trim() || disabled}
                            size="lg"
                            className="h-14 w-14 shadow-xl bg-gradient-to-r from-primary to-secondary rounded-full"
                        >
                            <Send className="h-6 w-6" />
                        </Button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

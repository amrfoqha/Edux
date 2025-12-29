import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { motion } from "motion/react";

export default function DirectHeader({ onNavigate, user }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b bg-linear-to-r from-white to-secondary/5 backdrop-blur-lg"
        >
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onNavigate("/chat")}
                                className="rounded-full"

                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </motion.div>

                        <Avatar>
                            <AvatarFallback className="bg-linear-to-br from-secondary to-accent text-white text-xl">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                            {user?.isOnline && (
                                <div className="absolute bottom-0 right-0 h-4 w-4 bg-success border-2 border-white rounded-full" />
                            )}
                        </Avatar>

                        <div>
                            <p className="font-bold">{user?.name || "Loading..."}</p>
                            <span className="text-sm text-muted-foreground">{user?.isOnline ? "Online" : "Offline"}</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="icon" variant="outline" className={"rounded-full"}><Phone
                                className="h-5 w-5" /></Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>

                            <Button size="icon" variant="outline" className={"rounded-full"}><Video
                                className="h-5 w-5" /></Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>

                            <Button size="icon" variant="outline" className={"rounded-full"}><MoreVertical
                                className="h-5 w-5" /></Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

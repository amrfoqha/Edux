import {ArrowLeft, Hash, Settings, Users} from "lucide-react";
import {Button} from "../../components/ui/button";
import {motion} from "motion/react";

export default function GroupChatHeader({room, members, onBack, onToggleMembers}) {
    return (
        <motion.div
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            className="border-b bg-white/80 backdrop-blur-lg shadow-md"
        >
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onclick(onBack)}
                                className="rounded-full"
                            >
                                <ArrowLeft className="h-5 w-5"/>
                            </Button>
                        </motion.div>
                        <div
                            className={`w-12 h-12 bg-gradient-to-br ${room.color} rounded-xl flex items-center justify-center`}>
                            <Hash className="text-white"/>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">{room.name}</h2>
                            <p className="text-sm text-muted-foreground">
                                {members.filter(m => m.online).length} / {members.length} online
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>

                            <Button variant="outline" size="icon" onClick={onToggleMembers} className="rounded-full">
                                <Users className="h-5 w-5"/>
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Settings className="h-5 w-5"/>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

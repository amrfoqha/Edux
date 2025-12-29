import React, {useState} from "react";
import {motion} from "motion/react";
import {Clock, Crown, Hash, MessageCircle, Users} from "lucide-react";

import {Card, CardContent} from "@/Components/ui/card.jsx";
import {Badge} from "@/Components/ui/badge.jsx";
import {Button} from "@/Components/ui/Button.jsx";
import {Avatar, AvatarFallback} from "@/Components/ui/avatar.jsx";
import {joinRoom} from "@/API/RoomApi.jsx";
import {useNavigate} from "react-router-dom";

export default function RoomCard({room}) {
    const {
        _id,
        name,
        description,
        owner,
        memberCount,
        isActive,
        lastActivity = "2 mins",
        color = "from-primary to-secondary",
    } = room;
    const [joining, setJoining] = useState(false);
    const navigate = useNavigate();
    console.log(room)

    const handleJoin = async () => {
        if (joining) return;
        try {
            setJoining(true);
            const res = await joinRoom({room: _id})
            console.log(res)
        } catch (error) {
            console.error("Error joining room:", error);
        } finally {
            setJoining(false);
        }
    }
    return (
        <Card
            className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer h-full"
            onClick={()=>navigate(`/group/${room._id}`)}
        >
            <div className={`h-24 bg-linear-to-r ${color} relative overflow-hidden`}>
                <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{backgroundPosition: ["0% 0%", "100% 100%"]}}
                    transition={{duration: 15, repeat: Infinity, repeatType: "reverse"}}
                    style={{
                        backgroundImage: "radial-gradient(circle, white 2px, transparent 2px)",
                        backgroundSize: "30px 30px",
                    }}
                />

                {isActive && (
                    <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-primary shadow-lg">
                            <span className="h-2 w-2 bg-success rounded-full mr-2 inline-block animate-pulse"/>
                            Active
                        </Badge>
                    </div>
                )}
            </div>

            <CardContent className="p-6 -mt-8 relative">
                <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl shadow-xl flex items-center justify-center mb-4`}
                    whileHover={{scale: 1.06, rotate: 3}}
                >
                    <Hash className="h-8 w-8 text-white"/>
                </motion.div>

                <div className="space-y-3">
                    <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {description}
                        </p>
                    </div>

                    {/*<Badge variant="secondary" className="text-xs">*/}
                    {/*    {category}*/}
                    {/*</Badge>*/}

                    <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-lg">
                                    <Users className="h-4 w-4 text-primary"/>
                                </div>
                                <span className="font-semibold">{memberCount}</span>
                            </div>

                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <Clock className="h-4 w-4"/>
                                {lastActivity}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-gradient-to-br from-secondary to-accent text-white">
                                {(owner.name || "?").charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex items-center gap-1">
                            <Crown className="h-3 w-3 text-accent"/>
                            <span className="text-xs text-muted-foreground">{owner.name}</span>
                        </div>
                    </div>

                    <motion.div whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>
                        <Button
                            className="w-full mt-4 shadow-lg"
                            onClick={handleJoin}
                            disabled={joining}
                        >
                            <MessageCircle className="h-4 w-4 mr-2"/>
                            {joining ? "Joining..." : "Join Room"}
                        </Button>
                    </motion.div>
                </div>
            </CardContent>
        </Card>
    );
}

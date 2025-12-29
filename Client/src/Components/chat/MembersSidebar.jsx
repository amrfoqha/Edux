import { Users, Crown, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/Avatar";
import { ScrollArea } from "../ui/ScrollArea";
import { Button } from "../ui/Button";
import { motion } from "motion/react";

export default function MembersSidebar({ members }) {
    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: 320 }}
            exit={{ width: 0 }}
            className="border-l bg-white/80 backdrop-blur-lg"
        >
            <div className="p-6">
                <h3 className="font-bold mb-4 flex gap-2">
                    <Users /> Members ({members})
                </h3>

                <ScrollArea className="h-[calc(100vh-16rem)]">
                    {/*{members.map((m) => (*/}
                    {/*    <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50">*/}
                    {/*        <Avatar>*/}
                    {/*            <AvatarFallback>{m.avatar}</AvatarFallback>*/}
                    {/*        </Avatar>*/}

                    {/*        <div className="flex-1">*/}
                    {/*            <div className="flex gap-2 items-center">*/}
                    {/*                <p className="font-semibold text-sm">{m.name}</p>*/}
                    {/*                {m.role === "owner" && <Crown className="h-3 w-3 text-accent" />}*/}
                    {/*            </div>*/}
                    {/*            <p className="text-xs text-muted-foreground">*/}
                    {/*                {m.online ? "Online" : "Offline"}*/}
                    {/*            </p>*/}
                    {/*        </div>*/}

                    {/*        <Button variant="ghost" size="icon">*/}
                    {/*            <MoreVertical />*/}
                    {/*        </Button>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                </ScrollArea>
            </div>
        </motion.div>
    );
}

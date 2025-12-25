import { Card } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";

export default function ConversationItem({ conversation, onClick }) {
    const { name, online, timestamp, lastMessage, unread } = conversation;

    return (
        <Card
            onClick={onClick}
            className="border-0 shadow-lg hover:shadow-xl cursor-pointer"
        >
            <div className="p-6 flex items-center gap-4">
                <div className="relative">
                    <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-gradient-to-br from-secondary to-accent text-white text-xl">
                            {name?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    {online && (
                        <div className="absolute bottom-0 right-0 h-4 w-4 bg-success border-2 border-white rounded-full" />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                        <h3 className="font-bold truncate">{name}</h3>
                        <span className="text-sm text-muted-foreground">{timestamp}</span>
                    </div>
                    <p className="text-muted-foreground truncate">{lastMessage}</p>
                </div>

                {unread > 0 && (
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                        {unread}
                    </Badge>
                )}
            </div>
        </Card>
    );
}

import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../ui/dropdown-menu";

export default function NotificationsMenu({ notifications, onMarkAsRead }) {
    const unread = notifications.filter((n) => !n.read).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell />
                    {unread > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                            {unread}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80">
                {notifications.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                        No notifications
                    </div>
                ) : (
                    notifications.map((n) => (
                        <DropdownMenuItem
                            key={n.id}
                            onClick={() => onMarkAsRead(n.id)}
                            className={!n.read ? "bg-muted/50" : ""}
                        >
                            <div>
                                <p className="text-sm">{n.message}</p>
                                <p className="text-xs text-muted-foreground">{n.time}</p>
                            </div>
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

import { Bell, MessageCircle, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { getUnReadNotifications } from "../../api/notificationAPI";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";

export default function NotificationsMenu({
  notifications,
  setNotificationsData,
  onMarkAsRead,
}) {
  const [unread, setUnread] = useState(0);

  const { user } = useAuth();
  const fetchNotifications = async () => {
    try {
      const res = await getUnReadNotifications(user._id);
      setNotificationsData(res);
      setUnread(res.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUnread(notifications.filter((n) => !n.isRead).length);
  }, [notifications]);
  useEffect(() => {
    fetchNotifications();
  }, []);

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
          notifications.map((n, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => {
                onMarkAsRead(n._id);
                setNotificationsData((prev) =>
                  prev.filter((notification) => notification._id !== n._id)
                );
              }}
              className={!n.isRead ? "bg-muted/50" : ""}
            >
              <div className="space-y-1">
                {/* Message preview */}
                <p className="text-sm font-medium text-foreground">
                  {n.message}
                </p>

                {/* Sender + context */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-semibold">{n.sender?.name}</span>

                  {n.type === "room" && n.room?.name && (
                    <>
                      <span>•</span>
                      <span>{n.room.name}</span>
                    </>
                  )}
                </div>

                {/* Time + type */}
                <p className="text-[11px] text-muted-foreground">
                  {new Date(n.createdAt).toLocaleString()}
                  <span className="flex items-center gap-1">
                    {n.type === "dm" && <MessageCircle size={10} />}
                    {n.type === "dm" && " • Direct message"}
                    {n.type === "room" && <Users size={10} />}
                    {n.type === "room" && " • Room message"}
                  </span>
                </p>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

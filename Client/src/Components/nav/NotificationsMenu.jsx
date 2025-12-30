import { Bell } from "lucide-react";
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

export default function NotificationsMenu({ notifications, onMarkAsRead }) {
  const [notificationsData, setNotificationsData] = useState([]);
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
    setNotificationsData(notifications);
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
        {notificationsData.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No notifications
          </div>
        ) : (
          notificationsData.map((n, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => {
                setUnread((prev) => prev - 1);
                onMarkAsRead(n._id);
              }}
              className={!n.isRead ? "bg-muted/50" : ""}
            >
              <div>
                <p className="text-sm">{n.message}</p>
                <p className="text-xs text-muted-foreground">
                  {n.createdAt.split(".")[0].replace("T", " ")}
                  {n.type === "dm"
                    ? " - Direct Message"
                    : n.type === "room"
                    ? " - Room message"
                    : ""}
                </p>
                <p className="text-xs  text-red-700">{n.sender?.name}</p>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

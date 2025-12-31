import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Logo from "../Components/common/Logo.jsx";
import DesktopNav from "../Components/nav/DesktopNav.jsx";
import { Button } from "../Components/ui/Button.jsx";
import MobileNav from "../Components/nav/MobileNav.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth.jsx";
import { EVENTS } from "../socket/events.js";
import socket from "../socket.js";
import {
  toggleNotificationRead,
  getUnReadNotifications,
} from "../API/notificationAPI";

export function Navbar({ currentPage, isLoggedIn }) {
  const [notifications, setNotifications] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onNavigate = useNavigate();
  const { logout, user } = useAuth();
  const onMarkAsRead = async (id) => {
    try {
      await toggleNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getUnReadNotifications(user._id);
        console.log(res);
        setNotifications(res);
      } catch (error) {
        console.log("Error fetching notifications:", error);
      }
    };
    if (user) fetchNotifications();
  }, [user]);

  useEffect(() => {
    const onDM = (data) => {
      console.log("DM_NOTIFICATION", data);
      setNotifications((prev) => [...prev, data]);
    };

    const onRoom = (data) => {
      console.log("ROOM_NOTIFICATION", data);
      setNotifications((prev) => [...prev, data]);
    };

    socket.on(EVENTS.DM_NOTIFICATION, onDM);
    socket.on(EVENTS.ROOM_NOTIFICATION, onRoom);

    return () => {
      socket.off(EVENTS.DM_NOTIFICATION, onDM);
      socket.off(EVENTS.ROOM_NOTIFICATION, onRoom);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 backdrop-blur-lg border-b sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <Logo onClick={() => onNavigate("/")} />

        <DesktopNav
          currentPage={currentPage}
          onNavigate={onNavigate}
          isLoggedIn={isLoggedIn}
          onLogout={logout}
          notifications={notifications}
          setNotifications={setNotifications}
          onMarkAsRead={onMarkAsRead}
        />

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <MobileNav
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={onNavigate}
        isLoggedIn={isLoggedIn}
        onLogout={logout}
        notifications={notifications}
        setNotifications={setNotifications}
        onMarkAsRead={onMarkAsRead}
      />
    </motion.nav>
  );
}

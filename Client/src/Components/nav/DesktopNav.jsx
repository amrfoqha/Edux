import {MessageCircle} from "lucide-react";
import NotificationsMenu from "./NotificationsMenu";
import {Button} from "../ui/Button.jsx";

export default function DesktopNav({
                                       currentPage,
                                       isLoggedIn,
                                       onNavigate,
                                       onLogout,
                                       notifications,
                                       onMarkAsRead,
                                   }) {
    const linkClass = (page) =>
        currentPage === page
            ? "text-primary"
            : "text-foreground hover:text-primary";

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Browse", path: "/browse" },
        { label: "About", path: "/about" },
    ];

    return (
        <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
                <button
                    key={item.path}
                    onClick={() => onNavigate(item.path)}
                    className={linkClass(item.label)}
                >
                    {item.label}
                </button>
            ))}

            {isLoggedIn ? (
                <>
                    <button
                        onClick={() => onNavigate("/chat")}
                        className={`flex items-center gap-2 ${linkClass("/chat")}`}
                    >
                        <MessageCircle className="h-5 w-5" />
                        Chat
                    </button>

                    <NotificationsMenu
                        notifications={notifications}
                        onMarkAsRead={onMarkAsRead}
                    />

                    <Button onClick={() => onNavigate("/profile")}>Profile</Button>
                    <Button variant="outline" onClick={onLogout}>
                        Logout
                    </Button>
                </>
            ) : (
                <>
                    <Button variant="outline" onClick={() => onNavigate("/login")}>
                        Login
                    </Button>
                    <Button onClick={() => onNavigate("/register")}>Register</Button>
                </>
            )}
        </div>

    );
}

import {useState} from "react";
import {motion} from "motion/react";
import {Menu, X} from "lucide-react";
import Logo from "../Components/common/Logo.jsx";
import DesktopNav from "../Components/nav/DesktopNav.jsx";
import {Button} from "../Components/ui/Button.jsx";
import MobileNav from "../Components/nav/MobileNav.jsx";
import {useNavigate} from "react-router-dom";


export function Navbar({
                           currentPage,
                           isLoggedIn,
                           onLogout,
                           notifications =[],
                           onMarkAsRead,
                       }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const onNavigate = useNavigate();
    return (
        <motion.nav
            initial={{y: -100}}
            animate={{y: 0}}
            className="bg-white/80 backdrop-blur-lg border-b sticky top-0 z-50 shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
                <Logo onClick={() => onNavigate("/")}/>

                <DesktopNav
                    currentPage={currentPage}
                    onNavigate={onNavigate}
                    isLoggedIn={isLoggedIn}
                    onLogout={onLogout}
                    notifications={notifications}
                    onMarkAsRead={onMarkAsRead}
                />

                <div className="md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X/> : <Menu/>}
                    </Button>
                </div>
            </div>

            <MobileNav
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                onNavigate={onNavigate}
                isLoggedIn={isLoggedIn}
                onLogout={onLogout}
            />
        </motion.nav>
    );
}

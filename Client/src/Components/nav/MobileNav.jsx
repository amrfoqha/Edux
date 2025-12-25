import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";

export default function MobileNav({
                                      open,
                                      onClose,
                                      onNavigate,
                                      isLoggedIn,
                                      onLogout,
                                  }) {
    if (!open) return null;

    const go = (page) => {
        onNavigate(page);
        onClose();
    };

    return (
        <div className="md:hidden border-t px-4 py-3 space-y-3">
            {["landing", "browse", "about"].map((page) => (
                <button key={page} onClick={() => go(page)} className="block w-full text-left">
                    {page}
                </button>
            ))}

            {isLoggedIn && (
                <button onClick={() => go("chat")} className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Chat
                </button>
            )}

            <div className="pt-3 border-t space-y-2">
                {isLoggedIn ? (
                    <>
                        <Button onClick={() => go("/profile")} className="w-full">
                            Profile
                        </Button>
                        <Button variant="outline" onClick={() => { onLogout(); onClose(); }} className="w-full">
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button variant="outline" onClick={() => go("/login")} className="w-full">
                            Login
                        </Button>
                        <Button onClick={() => go("/register")} className="w-full">
                            Register
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

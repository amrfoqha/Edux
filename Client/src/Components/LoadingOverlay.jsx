import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function LoadingOverlay() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-6"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="rounded-full bg-primary/10 p-6"
                >
                    <Sparkles className="h-8 w-8 text-primary" />
                </motion.div>

                <div className="text-center">
                    <p className="text-lg font-semibold text-foreground">
                        Loading CampusShare
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Preparing your experience…
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

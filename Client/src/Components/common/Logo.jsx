import { BookOpen } from "lucide-react";
import { motion } from "motion/react";

export default function Logo({ onClick }) {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer"
        >
            <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-2xl">
                <BookOpen className="text-white h-7 w-7" />
            </div>
            <div>
        <span className="font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          CampusShare
        </span>
                <p className="text-xs text-muted-foreground -mt-1">Learn Together</p>
            </div>
        </motion.div>
    );
}

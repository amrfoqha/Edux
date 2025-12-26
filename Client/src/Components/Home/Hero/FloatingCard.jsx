import { motion } from "motion/react";
export default function FloatingCard({ icon: Icon, value, label, className, delay = 0 }) {
    return (
        <motion.div
            animate={{ y: [0, delay ? 10 : -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay }}
            className={`absolute ${className} bg-white p-4 rounded-2xl shadow-xl`}
        >
            <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-xl">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <div className="font-bold">{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                </div>
            </div>
        </motion.div>
    );
}

import { motion } from "motion/react";

const stats = [
    { value: "50K+", label: "Active Students", color: "text-primary" },
    { value: "100K+", label: "Resources", color: "text-secondary" },
    { value: "500+", label: "Universities", color: "text-accent" },
];

export default function HeroStats() {
    return (
        <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                >
                    <div className={`text-3xl font-bold ${stat.color}`}>
                        {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {stat.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

import { Users, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import FloatingCard from "./FloatingCard.jsx";
import {ImageWithFallback} from "../../shared/ImageWithFallback.jsx";

export default function HeroImage() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
        >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758525861742-fef623c2ad2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>

            <FloatingCard
                icon={BookOpen}
                label="New Resources"
                value="1,234"
                className="-top-6 -left-6"
            />

            <FloatingCard
                icon={Users}
                label="Students Online"
                value="5,678"
                className="-bottom-6 -right-6"
                delay={1}
            />
        </motion.div>
    );
}


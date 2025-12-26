import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import HeroBadge from "./HeroBadge";
import HeroStats from "./HeroStats";
import {Button} from "../../ui/Button.jsx";

export default function HeroContent({ onNavigate }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            <HeroBadge />

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Share Knowledge,
        </span>
                <br />
                <span className="text-foreground">Excel Together</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
                Join thousands of students sharing textbooks, slides, exams, and
                video courses. Learn smarter together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
                <Button
                    size="lg"
                    onClick={() => onNavigate("register")}
                    className="text-lg px-10 py-7 shadow-xl shadow-primary/20"
                >
                    Get Started Free
                    <Sparkles className="ml-2 h-5 w-5" />
                </Button>

                <Button
                    size="lg"
                    variant="outline"
                    onClick={() => onNavigate("browse")}
                    className="text-lg px-10 py-7 border-2"
                >
                    Browse Resources
                </Button>
            </div>

            <HeroStats />
        </motion.div>
    );
}

import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "motion/react";

export default function CTASection({ onNavigate }) {
    return (
        <section className="relative py-32 px-4 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent" />

            {/* Animated dots */}
            <motion.div
                className="absolute inset-0 opacity-20"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
                style={{
                    backgroundImage: "radial-gradient(circle, white 2px, transparent 2px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Ready to Transform Your Learning?
                    </h2>

                    <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                        Join thousands of students already sharing and learning together on
                        CampusShare.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            variant="secondary"
                            onClick={() => onNavigate("register")}
                            className="text-lg px-10 py-7 bg-white text-primary hover:bg-white/90 shadow-2xl"
                        >
                            Create Free Account
                            <Sparkles className="ml-2 h-5 w-5" />
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => onNavigate("browse")}
                            className="text-lg px-10 py-7 bg-transparent text-white border-2 border-white hover:bg-white/10"
                        >
                            Explore Resources
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

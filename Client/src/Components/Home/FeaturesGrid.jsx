import { Sparkles, Users, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
    {
        icon: Sparkles,
        title: "AI Recommendations",
        description: "Personalized suggestions based on your courses",
        gradient: "from-primary to-info",
    },
    {
        icon: Users,
        title: "Real-Time Collaboration",
        description: "Chat with peers and form study groups",
        gradient: "from-secondary to-accent",
    },
    {
        icon: Shield,
        title: "Verified Quality",
        description: "Peer-reviewed and community-rated content",
        gradient: "from-success to-info",
    },
    {
        icon: Zap,
        title: "Instant Access",
        description: "Download resources immediately, anytime",
        gradient: "from-accent to-secondary",
    },
];

export default function FeaturesGrid() {
    return (
        <section className="py-32 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FEATURES.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group"
                        >
                            <div className="bg-card border border-border rounded-2xl p-8 h-full hover:shadow-2xl transition-all duration-300">
                                <div
                                    className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                                >
                                    <feature.icon className="h-8 w-8 text-white" />
                                </div>

                                <h3 className="text-xl font-bold mb-3">
                                    {feature.title}
                                </h3>

                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import { motion } from "motion/react";
import { BookOpen, Users, Sparkles } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    text: "10,000+ resources",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Users,
    text: "Thriving student community",
    color: "from-pink-400 to-rose-500",
  },
  {
    icon: Sparkles,
    text: "Smart AI recommendations",
    color: "from-blue-400 to-cyan-500",
  },
];

export default function AuthBranding({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        )}
      </div>

      <div className="space-y-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`bg-linear-to-br ${f.color} p-3 rounded-xl`}>
              <f.icon className="h-6 w-6 text-white" />
            </div>
            <span className="font-medium">{f.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

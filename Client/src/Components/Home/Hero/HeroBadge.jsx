import { Sparkles } from "lucide-react";

export default function HeroBadge() {
    return (
        <div className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-full mb-8 shadow-lg border border-primary/20">
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
            <span className="font-semibold text-primary">
        AI-Powered Learning Platform
      </span>
        </div>
    );
}

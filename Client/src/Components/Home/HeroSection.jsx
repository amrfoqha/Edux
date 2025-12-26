import {motion} from "motion/react";
import HeroContent from "./Hero/HeroContent.jsx";
import HeroImage from "./Hero/HeroImage.jsx";

export default function HeroSection({onNavigate, children}) {
    return (
        <section className="relative py-32 px-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"/>

            <motion.div
                className="absolute inset-0 opacity-10"
                animate={{backgroundPosition: ["0% 0%", "100% 100%"]}}
                transition={{duration: 20, repeat: Infinity, repeatType: "reverse"}}
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(99,102,241,0.3) 2px, transparent 2px)",
                    backgroundSize: "50px 50px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <HeroContent onNavigate={onNavigate}/>
                    <HeroImage/>
                </div>

                {children}
            </div>
        </section>
    );
}

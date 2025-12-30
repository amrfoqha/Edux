import {motion} from "motion/react";
import React from "react";

const pulse = {
    initial: {opacity: 0.45},
    animate: {
        opacity: [0.45, 0.75, 0.45],
        transition: {
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

export default function SkeletonBlock({ className }) {
    return (
        <motion.div
            variants={pulse}
            initial="initial"
            animate="animate"
            className={`bg-muted rounded-md ${className}`}
        />
    );
}


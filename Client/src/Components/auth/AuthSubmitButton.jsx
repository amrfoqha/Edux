import { Button } from "../ui/button";
import { motion } from "motion/react";

export default function AuthSubmitButton({ children }) {
    return (
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-purple-600 hover:to-pink-600 shadow-lg text-base font-semibold"
            >
                {children}
            </Button>
        </motion.div>
    );
}

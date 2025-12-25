import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.jsx";
import { motion } from "motion/react";

export default function AuthCard({ title, description, children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <Card className="border-0 shadow-2xl overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500" />

                <CardHeader className="text-center pt-8">
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                    {children}
                </CardContent>
            </Card>
        </motion.div>
    );
}

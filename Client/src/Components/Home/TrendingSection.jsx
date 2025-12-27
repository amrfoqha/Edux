import { Button } from "../ui/button";
import { motion } from "motion/react";
import {ResourceCard} from "../shared/ResourceCard.jsx";

export default function TrendingSection({ resources , onNavigate }) {
    const safeResources = Array.isArray(resources) ? resources : [];

    return (
        <section className="py-32 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between mb-12">
                    <h2 className="text-4xl font-bold">Trending Resources</h2>
                    <Button variant="outline" onClick={() => onNavigate("browse")}>
                        View All
                    </Button>
                </div>

                {/* Use this but without the slice */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {safeResources.slice(0, 4).map((item) => (
                        <motion.div key={item._id} whileHover={{ y: -5 }}>
                            <ResourceCard
                                resource={item}
                                onClick={(id) => onNavigate("resource", id)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

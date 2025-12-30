import React from "react";
import SkeletonBlock from "@/Components/SkeletonBlock.jsx";

export default function RelatedResourcesSkeleton({rows = 3}) {
    return (
        <div className="space-y-6">
            {Array.from({length: rows}).map((_, i) => (
                <div key={i} className="p-6 border rounded-xl space-y-4">
                    <div className="flex items-center gap-3">
                        <SkeletonBlock className="h-6 w-24"/>
                        <SkeletonBlock className="h-6 w-20"/>
                    </div>

                    <SkeletonBlock className="h-6 w-3/4"/>
                    <SkeletonBlock className="h-4 w-5/6"/>

                    <div className="flex items-center gap-4 pt-2">
                        <SkeletonBlock className="h-4 w-16"/>
                        <SkeletonBlock className="h-4 w-24"/>
                    </div>
                </div>
            ))}
        </div>
    );
}

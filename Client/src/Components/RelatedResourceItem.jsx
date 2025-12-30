import React from "react";
import { ExternalLink, Star } from "lucide-react";

import { Badge } from "@/Components/ui/badge.jsx";

export default function RelatedResourceItem({ resource, onOpenInternal }) {
    const isExternal = resource?.access_mode === "generated" && !!resource?.url;

    const handleClick = () => {
        if (isExternal) {
            window.open(resource.url, "_blank", "noopener,noreferrer");
            return;
        }
        onOpenInternal?.(resource?._id);
    };

    const rating =
        typeof resource?.average_rating === "number" ? resource.average_rating : null;

    return (
        <div
            className="p-6 border rounded-xl cursor-pointer hover:bg-muted/50 transition-all hover:shadow-md"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleClick();
            }}
        >
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-sm px-3 py-1">
                        {resource?.type || "resource"}
                    </Badge>

                    {isExternal && (
                        <Badge variant="secondary" className="text-sm flex items-center gap-1">
                            <ExternalLink className="h-3.5 w-3.5" />
                            External
                        </Badge>
                    )}
                </div>

                <h4 className="font-semibold text-lg">{resource?.title || "Untitled"}</h4>

                {resource?.description ? (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {resource.description}
                    </p>
                ) : null}

                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    {rating !== null && (
                        <>
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-accent text-accent" />
                                <span>{rating.toFixed(1)}</span>
                            </div>
                            <span>•</span>
                        </>
                    )}
                    <span>{resource?.university || ""}</span>
                </div>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card.jsx";
import RelatedResourceItem from "./RelatedResourceItem.jsx";

import { getRelatedResource } from "@/API/ResouceAPI";
import RelatedResourcesSkeleton from "@/Components/ReleatedResourcesSkeleton.jsx";

export default function RelatedResources({
                                                    resourceId,
                                                    onNavigate,
                                                    limit = 3,
                                                    title = "Related Resources",
                                                    subtitle = "AI-suggested based on this resource",
                                                }) {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!resourceId) return;

        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                console.log("im here now")
                const res = await getRelatedResource(resourceId, limit);
                console.log(res)
                const list = res?.resources || [];
                console.log(list)
                if (!cancelled) setResources(list);
            } catch (e) {
                console.error("Related resources error:", e);
                if (!cancelled) setResources([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, [resourceId, limit]);

    const openInternal = (id) => {
        onNavigate?.(`/resources/${id}`);
    };

    if (loading) {
        return (
            <div className="mb-16 mt-10">
                <Card className="border-0 shadow-lg">
                    <CardHeader className="p-8 md:p-12">
                        <div className="flex items-center gap-3 mb-2">
                            <Sparkles className="h-6 w-6 text-accent" />
                            <CardTitle className="text-3xl">{title}</CardTitle>
                        </div>
                        <p className="text-muted-foreground text-lg">{subtitle}</p>
                    </CardHeader>

                    <CardContent className="p-8 md:p-12">
                        <RelatedResourcesSkeleton rows={limit} />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!resources.length) return null;

    return (
        <div className="mb-16 mt-10">
            <Card className="border-0 shadow-lg">
                <CardHeader className="p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-2">
                        <Sparkles className="h-6 w-6 text-accent" />
                        <CardTitle className="text-3xl">{title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground text-lg">{subtitle}</p>
                </CardHeader>

                <CardContent className="p-8 md:p-12 space-y-6">
                    {resources.map((r) => (
                        <RelatedResourceItem
                            key={r._id}
                            resource={r}
                            onOpenInternal={openInternal}
                        />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

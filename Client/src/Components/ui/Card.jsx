import * as React from "react";
import { cn } from "./utils";

function Card({ className, ...props }) {
    return (
        <div
            className={cn(
                "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
                className
            )}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }) {
    return (
        <div
            className={cn("px-6 pt-6 grid gap-1.5", className)}
            {...props}
        />
    );
}

function CardTitle({ className, ...props }) {
    return (
        <h4 className={cn("leading-none font-semibold", className)} {...props} />
    );
}

function CardDescription({ className, ...props }) {
    return (
        <p className={cn("text-muted-foreground", className)} {...props} />
    );
}

function CardContent({ className, ...props }) {
    return (
        <div className={cn("px-6", className)} {...props} />
    );
}

function CardFooter({ className, ...props }) {
    return (
        <div className={cn("flex items-center px-6 pb-6", className)} {...props} />
    );
}

export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
};

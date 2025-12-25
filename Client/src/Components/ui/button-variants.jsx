import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive: "bg-destructive text-white hover:bg-destructive/90",
                outline: "border bg-background hover:bg-accent",
                secondary: "bg-secondary hover:bg-secondary/80",
                ghost: "hover:bg-accent",
                link: "text-primary underline hover:underline",
            },
            size: {
                default: "h-9 px-4",
                sm: "h-8 px-3",
                lg: "h-10 px-6",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

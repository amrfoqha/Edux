import { Badge } from "../ui/badge";

export default function DateDivider({ label }) {
    return (
        <div className="flex items-center justify-center my-6">
            <Badge  className="px-4 py-1.5">
                {label}
            </Badge>
        </div>
    );
}

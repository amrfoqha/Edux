import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function SearchInput({ value, onChange, onEnter }) {
    return (
        <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/70" />
            <Input
                placeholder="Search resources..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
                className="h-[54px] pl-11 rounded-2xl bg-primary/5 border-0"
            />
        </div>
    );
}

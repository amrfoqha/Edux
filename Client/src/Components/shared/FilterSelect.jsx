import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "../ui/select.jsx";

export default function FilterSelect({
                                         value,
                                         onChange,
                                         placeholder,
                                         options = [],
                                         className = "",
                                     }) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger
                className={`h-[54px] rounded-2xl bg-primary/5 border-0 ${className}`}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

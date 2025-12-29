import React from "react";
import { Label } from "../../ui/label";

export default function FormField({ icon, label, required = false, error, children }) {
    return (
        <div className="space-y-2">
            <Label className="text-base font-semibold flex items-center gap-2">
                {icon ? icon : null}
                {label}
                {required ? <span className="text-red-500">*</span> : null}
            </Label>

            {children}

            {error ? <p className="text-sm text-red-500">{error}</p> : null}
        </div>
    );
}

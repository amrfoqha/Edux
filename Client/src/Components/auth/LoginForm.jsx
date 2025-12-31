import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AuthSubmitButton from "./AuthSubmitButton";
import AuthSwitch from "./AuthSwitch";

export default function LoginForm({ onSubmit, onSwitch }) {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const validateField = (name, value) => {
        switch (name) {
            case "email":
                if (!value.trim()) return "Email is required";
                if (!/^\S+@\S+\.\S+$/.test(value))
                    return "Enter a valid email address";
                return "";

            default:
                return "";
        }
    };

    const handleChange = (field) => (e) => {
        const value = e.target.value;

        setForm((prev) => {
            const next = { ...prev, [field]: value };

            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: validateField(field, value),
            }));

            return next;
        });
    };

    const hasErrors = Object.values(errors).some(Boolean);
    const isEmpty = Object.values(form).some((v) => !v.trim());

    const handleSubmit = (e) => {
        e.preventDefault();

        const nextErrors = {
            email: validateField("email", form.email),
            password: validateField("password", form.password),
        };

        setErrors(nextErrors);

        if (Object.values(nextErrors).some(Boolean)) return;

        onSubmit(form);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="email"
                            className={`pl-10 h-11 ${
                                errors.email ? "border-destructive" : ""
                            }`}
                            placeholder="john@gmail.com"
                            value={form.email}
                            onChange={handleChange("email")}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="password"
                            className={`pl-10 h-11 ${
                                errors.password ? "border-destructive" : ""
                            }`}
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange("password")}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                    </div>
                    {errors.password && (
                        <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                </div>

                <AuthSubmitButton disabled={hasErrors || isEmpty}>
                    Sign In
                </AuthSubmitButton>
            </form>

            <AuthSwitch
                text="Don’t have an account?"
                actionText="Create one"
                onClick={onSwitch}
            />
        </>
    );
}

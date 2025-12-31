import {
    User,
    Mail,
    Lock,
    Building2,
    GraduationCap,
    BookOpen,
} from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AuthSubmitButton from "./AuthSubmitButton";
import AuthSwitch from "./AuthSwitch";

export default function RegisterForm({ onSubmit, onSwitch }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        university: "",
        faculty: "",
        department: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        university: "",
        faculty: "",
        department: "",
    });

    const fields = [
        { name: "name", label: "Username", icon: User, type: "text", placeholder: "johndoe" },
        { name: "email", label: "Email", icon: Mail, type: "email", placeholder: "john@gmail.com" },
        { name: "password", label: "Password", icon: Lock, type: "password", placeholder: "••••••••" },
        { name: "confirmPassword", label: "Confirm Password", icon: Lock, type: "password", placeholder: "••••••••" },
        { name: "university", label: "University", icon: Building2, type: "text", placeholder: "Enter your university" },
        { name: "faculty", label: "Faculty", icon: GraduationCap, type: "text", placeholder: "Enter your faculty" },
        { name: "department", label: "Department", icon: BookOpen, type: "text", placeholder: "Enter your department" },
    ];

    const validateField = (name, value, all) => {
        const v = (value ?? "").trim();

        switch (name) {
            case "name":
                if (!v) return "Username is required";
                if (v.length < 3) return "Username must be at least 3 characters";
                return "";

            case "email":
                if (!v) return "Email is required";
                if (!/^\S+@\S+\.\S+$/.test(v)) return "Enter a valid email address";
                return "";

            case "password":
                if (!value) return "Password is required";
                if (value.length < 8) return "Password must be at least 8 characters";
                return "";

            case "confirmPassword":
                if (!value) return "Confirm your password";
                if (value !== all.password) return "Passwords do not match";
                return "";

            case "university":
                if (!v) return "University is required";
                return "";

            case "faculty":
                if (!v) return "Faculty is required";
                return "";

            case "department":
                if (!v) return "Department is required";
                return "";

            default:
                return "";
        }
    };

    const validateAll = (values) => {
        const next = {};
        for (const f of fields) {
            next[f.name] = validateField(f.name, values[f.name], values);
        }
        return next;
    };

    const handleChange = (field) => (e) => {
        const value = e.target.value;

        setForm((prev) => {
            const nextForm = { ...prev, [field]: value };

            setErrors((prevErrors) => {
                const nextErrors = { ...prevErrors };

                nextErrors[field] = validateField(field, value, nextForm);

                if (field === "password") {
                    nextErrors.confirmPassword = validateField(
                        "confirmPassword",
                        nextForm.confirmPassword,
                        nextForm
                    );
                }

                return nextErrors;
            });

            return nextForm;
        });
    };

    const hasErrors = Object.values(errors).some((e) => e);
    const isEmpty = Object.values(form).some((v) => !String(v).trim());

    const handleSubmit = (e) => {
        e.preventDefault();

        const nextErrors = validateAll(form);
        setErrors(nextErrors);

        const ok = Object.values(nextErrors).every((x) => !x);
        if (!ok) return;

        onSubmit(form);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-5">
                {fields.map((field) => {
                    const Icon = field.icon;
                    const error = errors[field.name];
                    const showError = Boolean(error);

                    return (
                        <div key={field.name} className="space-y-2">
                            <Label htmlFor={field.name}>{field.label}</Label>

                            <div className="relative">
                                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                                <Input
                                    id={field.name}
                                    type={field.type}
                                    className={`pl-10 h-11 ${showError ? "border-destructive" : ""}`}
                                    placeholder={field.placeholder}
                                    value={form[field.name]}
                                    onChange={handleChange(field.name)}
                                    aria-invalid={showError ? "true" : "false"}
                                />
                            </div>

                            {showError && <p className="text-sm text-destructive">{error}</p>}
                        </div>
                    );
                })}

                <AuthSubmitButton disabled={hasErrors || isEmpty}>
                    Create Account
                </AuthSubmitButton>
            </form>

            <AuthSwitch
                text="Already have an account?"
                actionText="Sign in"
                onClick={onSwitch}
            />
        </>
    );
}

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

    const fields = [
        {
            name: "name",
            label: "Username",
            icon: User,
            type: "text",
            placeholder: "johndoe",
        },
        {
            name: "email",
            label: "Email",
            icon: Mail,
            type: "email",
            placeholder: "john@gmail.com",
        },
        {
            name: "password",
            label: "Password",
            icon: Lock,
            type: "password",
            placeholder: "••••••••",
        },
        {
            name: "confirmPassword",
            label: "Confirm Password",
            icon: Lock,
            type: "password",
            placeholder: "••••••••",
        },
        {
            name: "university",
            label: "University",
            icon: Building2,
            type: "text",
            placeholder: "Enter your university",
        },
        {
            name: "faculty",
            label: "Faculty",
            icon: GraduationCap,
            type: "text",
            placeholder: "Enter your faculty",
        },
        {
            name: "department",
            label: "Department",
            icon: BookOpen,
            type: "text",
            placeholder: "Enter your department",
        },
    ];

    const handleChange = (field) => (e) =>
        setForm({ ...form, [field]: e.target.value });

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(form);
                }}
                className="space-y-5"
            >
                {fields.map((field) => {
                    const Icon = field.icon;

                    return (
                        <div key={field.name}>
                            <Label>{field.label}</Label>
                            <div className="relative">
                                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type={field.type}
                                    className="pl-10 h-11"
                                    placeholder={field.placeholder}
                                    value={form[field.name]}
                                    onChange={handleChange(field.name)}
                                />
                            </div>
                        </div>
                    );
                })}

                <AuthSubmitButton>Create Account</AuthSubmitButton>
            </form>

            <AuthSwitch
                text="Already have an account?"
                actionText="Sign in"
                onClick={onSwitch}
            />
        </>
    );
}

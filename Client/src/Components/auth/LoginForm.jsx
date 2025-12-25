import { Lock, Mail } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

import AuthSubmitButton from "./AuthSubmitButton";
import AuthSwitch from "./AuthSwitch";

export default function LoginForm({ onSubmit, onSwitch }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(email, password);
                }}
                className="space-y-5"
            >
                <div>
                    <Label>Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            className="pl-10 h-11"
                            placeholder="jhon@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <Label>Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="password"
                            className="pl-10 h-11"
                            placeholder={"••••••••"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <AuthSubmitButton>Sign In</AuthSubmitButton>
            </form>

            <AuthSwitch
                text="Don’t have an account?"
                actionText="Sign up"
                onClick={onSwitch}
            />
        </>
    );
}

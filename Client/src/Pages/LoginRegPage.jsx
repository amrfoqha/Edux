import AuthCard from "../Components/auth/AuthCard.jsx";
import AuthLayout from "../Layouts/AuthLayout.jsx";
import AuthBranding from "../Components/auth/AuthBranding.jsx";
import LoginForm from "../Components/auth/LoginForm.jsx";
import RegisterForm from "../Components/auth/RegisterForm.jsx";
import {useNavigate} from "react-router-dom";

export default function LoginRegPage({mode, onLogin, onRegister}) {
    const onNavigate = useNavigate()
    return (
        <AuthLayout
            branding={
                <AuthBranding
                    title={
                        mode === "login"
                            ? <>Welcome back.<br/>Continue learning.</>
                            : <>Join thousands.<br/>Start sharing.</>
                    }
                />
            }
        >
            <AuthCard
                title={mode === "login" ? "Welcome Back!" : "Create Account"}
                description={
                    mode === "login"
                        ? "Sign in to continue learning"
                        : "Join our student community"
                }
            >
                {mode === "login" ? (
                    <LoginForm onSubmit={onLogin} onSwitch={() => onNavigate("/register")}/>
                ) : (
                    <RegisterForm onSubmit={onRegister} onSwitch={() => onNavigate("/login")}/>
                )}
            </AuthCard>
        </AuthLayout>
    );
}

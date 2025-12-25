import AuthCard from "../Components/auth/AuthCard.jsx";
import LoginForm from "../Components/auth/LoginForm.jsx";
import AuthBranding from "../Components/auth/AuthBranding.jsx";
import AuthLayout from "../Layouts/AuthLayout.jsx";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../Hooks/useAuth.jsx";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (email, password) => {
        const result = await login(email, password);

        if (result.success) {
            navigate("/");
        } else {
            alert(result.error);
        }
    };

    return (
        <AuthLayout
            branding={
                <AuthBranding
                    title={<>Welcome back.<br />Continue learning.</>}
                    subtitle="Join students from 200+ universities"
                />
            }
        >
            <AuthCard
                title="Welcome Back!"
                description="Sign in to continue learning"
            >
                <LoginForm
                    onSubmit={handleLogin}
                    onSwitch={() => navigate("/register")}
                />
            </AuthCard>
        </AuthLayout>
    );
}

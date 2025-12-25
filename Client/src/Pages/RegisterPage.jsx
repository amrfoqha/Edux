import AuthLayout from "../Layouts/AuthLayout";
import AuthBranding from "../Components/auth/AuthBranding";
import AuthCard from "../Components/auth/AuthCard";
import RegisterForm from "../Components/auth/RegisterForm";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../Hooks/useAuth.jsx";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleRegister = async (userData) => {
        const result = await register(userData);

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
                    title={<>Join thousands.<br />Start sharing.</>}
                />
            }
        >
            <AuthCard
                title="Create Account"
                description="Join our student community"
            >
                <RegisterForm
                    onSubmit={handleRegister}
                    onSwitch={() => navigate("/login")}
                />
            </AuthCard>
        </AuthLayout>
    );
}

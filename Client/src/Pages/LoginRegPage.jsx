import { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import LoginFormComponent from "../Components/LoginFormComponent";
import RegistartionComponent from "../Components/RegistartionComponent";
import RegistrationComponent from "../Components/RegistartionComponent";

const LoginRegPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
          {isLogin ? (
            <LoginFormComponent switchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegistrationComponent switchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </>
  );
};

export default LoginRegPage;

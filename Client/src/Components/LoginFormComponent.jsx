import { useState } from "react";
import axios from "axios";

const LoginFormComponent = ({ switchToRegister }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email: emailInput,
          password: passwordInput,
        }
      );

      localStorage.setItem("token", data.token);
      alert("Login successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-purple-600 mb-2">
        Welcome Back
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Sign in to access your resources
      </p>

      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="you@university.edu"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-gray-500 mt-4">
        Don't have an account?{" "}
        <button
          onClick={switchToRegister}
          className="text-purple-600 font-semibold hover:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default LoginFormComponent;

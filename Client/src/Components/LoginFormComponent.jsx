import { useState } from "react";
import axios from "axios";

const LoginFormComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", data.token);
      alert("Login successful");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Left Side */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome back.
          <br />
          Continue learning.
        </h1>
        <p className="text-gray-500 mb-8">
          Join thousands of students from over <b>200+ universities</b>
        </p>

        <Feature text="10,000+ resources" icon="📘" />
        <Feature text="Thriving student community" icon="👥" />
        <Feature text="Smart AI recommendations" icon="✨" />
      </div>

      {/* Right Side */}
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back!</h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to access your resources
        </p>

        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@university.edu"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
        />

        <button className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
          Sign In
        </button>

        <p className="text-xs text-center text-gray-400 mt-3">
          Takes less than 10 seconds. Secure login.
        </p>
      </form>
    </div>
  );
};

export default LoginFormComponent;

/*  Small Components */

const Feature = ({ icon, text }) => (
  <div className="flex items-center gap-4 bg-white rounded-xl p-4 mb-4 shadow-sm">
    <span className="text-2xl">{icon}</span>
    <p className="font-medium text-gray-700">{text}</p>
  </div>
);

const Input = ({ label, type, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>
);

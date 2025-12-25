import { useState } from "react";
import axios from "axios";

const RegistarionComponent = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    university: "",
    faculty: "",
    department: "",
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/register",
        form
      );
      localStorage.setItem("token", data.token);
      alert("Account created successfully");
    } catch (err) {
      console.log(err.response || "Registration failed");
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Left */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Join thousands.
          <br />
          Start sharing.
        </h1>

        <Feature icon="📘" text="10,000+ resources" />
        <Feature icon="👥" text="Thriving student community" />
        <Feature icon="✨" text="Smart AI recommendations" />
      </div>

      {/* Right */}
      <form
        onSubmit={handleRegister}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-6">
          Join our community and start sharing knowledge
        </p>

        <Input label="Username" onChange={(v) => handleChange("username", v)} />
        <Input
          label="Email Address"
          type="email"
          onChange={(v) => handleChange("email", v)}
        />
        <Input
          label="Password"
          type="password"
          onChange={(v) => handleChange("password", v)}
        />
        <Input
          label="University"
          onChange={(v) => handleChange("university", v)}
        />
        <Input label="Faculty" onChange={(v) => handleChange("faculty", v)} />
        <Input
          label="Department"
          onChange={(v) => handleChange("department", v)}
        />

        <button className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
          Create Account
        </button>

        <p className="text-xs text-center text-gray-400 mt-3">
          Your information is safe and secure
        </p>
      </form>
    </div>
  );
};

export default RegistarionComponent;

/*  Helpers */

const Feature = ({ icon, text }) => (
  <div className="flex items-center gap-4 bg-white rounded-xl p-4 mb-4 shadow-sm">
    <span className="text-2xl">{icon}</span>
    <p className="font-medium text-gray-700">{text}</p>
  </div>
);

const Input = ({ label, type = "text", onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      type={type}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>
);

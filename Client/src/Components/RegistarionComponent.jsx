import { useState } from "react";
import axios from "axios";

const RegistrationComponent = ({ switchToLogin }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [universityInput, setUniversityInput] = useState("");
  const [facultyInput, setFacultyInput] = useState("");
  const [departmentInput, setDepartmentInput] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          username: usernameInput,
          email: emailInput,
          password: passwordInput,
          university: universityInput,
          faculty: facultyInput,
          department: departmentInput,
        }
      );

      localStorage.setItem("token", data.token);
      alert("Registration successful!");
      switchToLogin();
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-purple-600 mb-2">
        Create Account
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Join the EduX community
      </p>

      <form className="space-y-4" onSubmit={handleRegister}>
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            placeholder="johndoe"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

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

        <div>
          <label className="block text-gray-700">University</label>
          <input
            type="text"
            value={universityInput}
            onChange={(e) => setUniversityInput(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label className="block text-gray-700">Faculty</label>
          <input
            type="text"
            value={facultyInput}
            onChange={(e) => setFacultyInput(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label className="block text-gray-700">Department</label>
          <input
            type="text"
            placeholder="e.g. Computer Science"
            value={departmentInput}
            onChange={(e) => setDepartmentInput(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
        >
          Create Account
        </button>
      </form>

      <p className="text-center text-gray-500 mt-4">
        Already have an account?{" "}
        <button
          onClick={switchToLogin}
          className="text-purple-600 font-semibold hover:underline"
        >
          Sign in
        </button>
      </p>
    </div>
  );
};

export default RegistrationComponent;

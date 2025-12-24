import { useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const LoginRegPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [universityInput, setUniversityInput] = useState("");
  const [facultyInput, setFacultyInput] = useState("");
  const [departmentInput, setDepartmentInput] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/api/auth/login", {
        email: emailInput,
        password: passwordInput,
      });
      localStorage.setItem("token", data.token);
      alert("Login successful!");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/api/auth/register", {
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
        university: universityInput,
        faculty: facultyInput,
        department: departmentInput,
      });
      localStorage.setItem("token", data.token);
      alert("Registration successful!");
      setIsLogin(true); 
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
          {isLogin ? (
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
                  onClick={() => setIsLogin(false)}
                  className="text-purple-600 font-semibold hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          ) : (
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
                  <select
                    value={universityInput}
                    onChange={(e) => setUniversityInput(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="">Select your university</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Faculty</label>
                  <select
                    value={facultyInput}
                    onChange={(e) => setFacultyInput(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="">Select your faculty</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Department</label>
                  <input
                    type="text"
                    placeholder="e.g., Computer Science"
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
                  onClick={() => setIsLogin(true)}
                  className="text-purple-600 font-semibold hover:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginRegPage;

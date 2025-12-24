import { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const LoginRegPage = () => {
  const [isLogin, setIsLogin] = useState(true); 

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
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="you@university.edu"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
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
                Join the CampusShare community
              </p>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    placeholder="johndoe"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="you@university.edu"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">University</label>
                  <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600">
                    <option>Select your university</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Faculty</label>
                  <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600">
                    <option>Select your faculty</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Department</label>
                  <input
                    type="text"
                    placeholder="e.g., Computer Science"
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

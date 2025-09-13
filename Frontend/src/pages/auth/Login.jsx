import React, { useState } from "react";
import { Eye, EyeOff,  Lock, ArrowRight, Mail } from "lucide-react";
import loginImg from "/images/66.jpg"; // apni image ka path yahan lagao

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Login submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-rose-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row w-full max-w-4xl overflow-hidden border border-gray-100">
        {/* Left Section - Image */}
        <div className="flex-1 bg-blue-50 p-8 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome Back!
          </h1>
          <p className="text-gray-600 mb-6">
            Log in to your Y-Desserts account
          </p>
          <img
            src={loginImg}
            alt="Login"
            className="rounded-xl shadow-lg w-64 h-64 object-cover"
          />
        </div>

        {/* Right Section - Form */}
        <div className="flex-1 p-8 flex flex-col justify-center bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Log In</h2>
          <p className="text-gray-600 mb-6">
            Enter your credentials to access your account
          </p>

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-400 to-rose-500 text-white font-semibold py-2 rounded-lg hover:from-blue-500 hover:to-rose-600 transition"
            >
              Log In <ArrowRight className="inline w-4 h-4 ml-2" />
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-500 font-semibold hover:underline"
            >
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

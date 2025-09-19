import { useState } from "react";
import { Eye, EyeOff, Lock, ArrowRight, Mail } from "lucide-react";
import loginImg from "/images/66.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../features/auth/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const msg = location.state?.msg;
  const dispatch = useDispatch();
  const navigate = useNavigate()
    const {error,isLoading} = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = async (data) => {
    console.log(data);
    dispatch(loginStart());
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(result);
      if (res.ok && result.success) {
        dispatch(loginSuccess({ user: result.user }));
        if (result.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/"); // ya user dashboard
        }
      } else {
        dispatch(loginFailure({ error: result.message || "Login failed" }));
      }
    } catch (error) {
      dispatch(loginFailure({ error: error.message }));
    }
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
          {msg && (
            <p className="text-green-500 mb-3 text-center bg-green-100 p-2 rounded-lg">
              {msg}
            </p>            
          )}
           {error && <p className="text-red-500 mb-3 text-center bg-red-100 p-2 rounded-lg">{error}</p>}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Log In</h2>
          <p className="text-gray-600 mb-6">
            Enter your credentials to access your account
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  maxLength: {
                    value: 50,
                    message: "Password must be at most 50 characters long",
                  },
                })}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <button
                type="submit"
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
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <button
            disabled={isLoading}
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-400 to-rose-500 text-white font-semibold py-2 rounded-lg hover:from-blue-500 hover:to-rose-600 transition"
            >
             {isLoading ?  "Logging..." : " Log In "}<ArrowRight className="inline w-4 h-4 ml-2" />
            </button>
          </form>

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

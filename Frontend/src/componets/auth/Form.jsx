const API_BASE = import.meta.env.VITE_API_BASE;

import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from "lucide-react";
import {  useNavigate } from "react-router-dom";

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [resError, setResError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()

 
  const onSubmitHandler = async (data) => {   
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const resData = await res.json();        
      if (!res.ok) {
        throw new Error(resData.message);      
      }   
      setLoading(false);
      setResError(null);
      navigate("/login",{
        state: {msg: resData.message}
      })    
    } catch (error) {
      setLoading(false);
      console.error("error", error.message);
      setResError(error.message);
    }
  };

  return (
    <>   

      <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
      <p className="text-gray-600 mb-6">Fill in your details to get started</p>
        {resError && <p className="text-red-500 mb-3 text-center bg-red-100 p-2 rounded-lg">{resError}</p>}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            {...register("fullName", {
              required: "Full Name is required",
              minLength: {
                value: 2,
                message: "Full Name must be at least 2 characters long",
              },
              maxLength: {
                value: 50,
                message: "Full Name must be at most 50 characters long",
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Full Name can only contain letters and spaces",
              },
            })}
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
        )}

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
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-gradient-to-r from-blue-400 to-rose-500 text-white font-semibold py-2 rounded-lg hover:from-blue-500 hover:to-rose-600 transition"
        >
         {loading ? "Creating Account..." : "Create Account"} <ArrowRight className="inline w-4 h-4 ml-2" />
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-500 font-semibold hover:underline"
        >
          Log In
        </a>
      </p>
    </>
  );
};

export default Form;

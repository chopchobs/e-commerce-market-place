import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import Swal from "sweetalert2";
const API_URL = import.meta.env.VITE_API_URL;

// --- Schema Validation ---
const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      // Check password strength here (Score 0-4)
      .refine((val) => zxcvbn(val).score >= 3, {
        message:
          "Password is too weak. Please include numbers or special characters.",
      }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error appears at the confirmPassword field
  });

// components - Register
const Register = () => {
  // State - Password
  const [passwordScore, setPasswordScore] = useState(0);
  // useForm Hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all", // 🚨 จุดสำคัญ: ตรวจสอบ Real-time (แดงทันทีที่ผิด)
  });
  // Watch password value continuously
  const passwordValue = watch("password");
  // Update Score when password changes
  useEffect(() => {
    if (passwordValue) {
      setPasswordScore(zxcvbn(passwordValue).score);
    } else {
      setPasswordScore(0);
    }
  }, [passwordValue]);
  // --- Helper: Get Color & Label based on Score ---
  const getStrengthStyles = (score) => {
    switch (score) {
      case 0:
      case 1:
        return { color: "bg-red-500", label: "Weak", width: "20%" };
      case 2:
        return { color: "bg-yellow-500", label: "Fair", width: "50%" };
      case 3:
        return { color: "bg-blue-500", label: "Good", width: "75%" };
      case 4:
        return { color: "bg-green-500", label: "Strong", width: "100%" };
      default:
        return { color: "bg-gray-200", label: "", width: "0%" };
    }
  };
  const strengthInfo = getStrengthStyles(passwordScore);
  // fly to
  const navigate = useNavigate();
  // State
  const [isLoading, setIsLoading] = useState(false);

  // function - Submit on useForm
  const onSubmit = async (data) => {
    const passwordScore = zxcvbn(data.password).score;
    if (passwordScore < 3) {
      Swal.fire({
        icon: "warning",
        title: "Password too weak",
        text: "Please use a stronger password with numbers or special characters.",
      });
      return;
    }
    setIsLoading(true);
    // TO DB
    try {
      // Simulate API call
      const res = await axios.post(`${API_URL}/api/register`, data);
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Data Sent to Server:", data);
      // Success Alert
      Swal.fire({
        icon: "success",
        title: res.data.message,
        text: res.data.message || "Welcome to our system!",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.log(error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";
      // Error Alert
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log(passwordScore);
  return (
    // 1. Background & Center Layout:
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* The Card */}
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl border border-gray-100">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Register
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Create your account to start shopping
          </p>
        </div>
        {/* FORM */}
        <form className="mt-8 space-y-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            {/* Email Field */}
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                // onChange={hldOnChangeInput}
                type="email"
                {...register("email")}
                placeholder="name@example.com"
                className={`block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-black sm:text-sm outline-none transition-all  ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-black"
                } `}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                // onChange={hldOnChangeInput}
                type="password"
                {...register("password")}
                className={`block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-black sm:text-sm outline-none transition-all ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-black"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm PASSWORD
              </label>
              <div className="mt-2">
                <input
                  // onChange={hldOnChangeInput}
                  {...register("confirmPassword")}
                  type="password"
                  className={`block w-full rounded-lg border px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-black sm:text-sm outline-none transition-all ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-black"
                  }`}
                />
                {/* --- PASSWORD STRENGTH BAR --- */}
                {passwordValue && (
                  <div className="mt-2 transition-all duration-300 ease-in-out">
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ease-out ${strengthInfo.color}`}
                        style={{ width: strengthInfo.width }}
                      ></div>
                    </div>
                    <p
                      className={`mt-1 text-xs font-medium text-right ${strengthInfo.color.replace(
                        "bg-",
                        "text-"
                      )}`}
                    >
                      Strength: {strengthInfo.label}
                    </p>
                  </div>
                )}
                {/* ConfirmPassword text */}
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            {/* Submit Button */}
            <div>
              <button
                disabled={isSubmitting} // ป้องกันการกดรัวๆ
                type="submit"
                className="group relative flex w-full justify-center rounded-full bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all active:scale-95 shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
            {/* Link to Login */}
            <div className="text-center text-sm">
              <span className="text-gray-500">Already have an account? </span>
              <Link
                to="/login"
                className="font-medium text-black hover:underline"
              >
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;

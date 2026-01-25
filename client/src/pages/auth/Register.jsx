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
      .refine((val) => zxcvbn(val).score >= 3, {
        message:
          "Password is too weak. Please include numbers or special characters.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// components - Register
const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const passwordValue = watch("password");

  useEffect(() => {
    if (passwordValue) {
      setPasswordScore(zxcvbn(passwordValue).score);
    } else {
      setPasswordScore(0);
    }
  }, [passwordValue]);

  // ✨ Theme Config: ปรับสี Bar ให้เข้าธีม (เปลี่ยน Blue -> Indigo)
  const getStrengthStyles = (score) => {
    switch (score) {
      case 0:
      case 1:
        return { color: "bg-red-500", label: "Weak", width: "20%" };
      case 2:
        return { color: "bg-yellow-500", label: "Fair", width: "50%" };
      case 3:
        return { color: "bg-indigo-500", label: "Good", width: "75%" }; // ✨ ปรับให้เข้าธีม
      case 4:
        return { color: "bg-green-500", label: "Strong", width: "100%" };
      default:
        return { color: "bg-gray-200", label: "", width: "0%" };
    }
  };
  const strengthInfo = getStrengthStyles(passwordScore);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
    try {
      const res = await axios.post(`${API_URL}/api/register`, data);
      console.log("Data Sent to Server:", data);
      Swal.fire({
        icon: "success",
        title: "Registration Success",
        text: res.data.message || "Welcome to our system!",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.log(error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong.";
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 md:py-20">
      {/* ✨ Card */}
      <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-gray-100 box-border">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Join us to start shopping today.
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="name@example.com"
              // ✨ Theme: focus:ring-indigo-500 focus:border-indigo-500
              className={`block w-full box-border rounded-lg border px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none transition-all ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
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
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              // ✨ Theme: focus:ring-indigo-500 focus:border-indigo-500
              className={`block w-full box-border rounded-lg border px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none transition-all ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}

            {/* Password Strength Bar */}
            {passwordValue && (
              <div className="mt-2 transition-all duration-300 ease-in-out">
                <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ease-out ${strengthInfo.color}`}
                    style={{ width: strengthInfo.width }}
                  ></div>
                </div>
                {/* ✨ Text color matching the bar */}
                <p
                  className={`mt-1 text-xs font-medium text-right ${strengthInfo.color.replace("bg-", "text-")}`}
                >
                  Strength: {strengthInfo.label}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="••••••••"
              // ✨ Theme: focus:ring-indigo-500 focus:border-indigo-500
              className={`block w-full box-border rounded-lg border px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none transition-all ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* ✨ Theme: Submit Button สี Indigo */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="group relative flex w-full justify-center rounded-full bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                <span>Processing...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          {/* ✨ Theme: Login Link สี Indigo */}
          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;

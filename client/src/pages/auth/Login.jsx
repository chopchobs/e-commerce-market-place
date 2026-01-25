import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useEcomStore from "../../store/ecom-store";
import Swal from "sweetalert2";

// -- Schema Validation --
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  remember: z.boolean().optional(),
});

// --- component Login ---
const Login = () => {
  const ActionLogin = useEcomStore((state) => state.actionLogin);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: { remember: true },
  });

  const roleNavigate = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate(from, { replace: true });
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await ActionLogin({
        email: data.email,
        password: data.password,
      });
      if (data.remember) console.log("User want to be remembered");

      const role = res.data.payload.role;
      roleNavigate(role);
      Swal.fire({
        icon: "success",
        title: "Login Success",
        text: "Welcome back!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please type again",
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 md:py-20 font-sans">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-xl border shadow-indigo-100/50 border-gray-100 box-border">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please enter your details to sign in.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* --- Email Input --- */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            {/* ✨ box-border: แก้ปัญหา input ล้นกรอบ */}
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="name@example.com"
              className={`block w-full rounded-xl border px-4 py-3 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200
                ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-indigo-300"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* --- Password Input --- */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              {...register("password")}
              id="password"
              type="password"
              placeholder="••••••••"
              className={`block w-full rounded-xl border px-4 py-3 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200
                ${
                  errors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-indigo-300"
                }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* --- Remember & Forgot Row --- */}
          {/* ✨ จัดให้เป็น flex-row (แนวนอน) ตลอดเวลา และใช้ justify-between ดันให้ห่างกันสุดขอบ */}
          <div className="flex items-center justify-between text-sm flex-wrap gap-y-2">
            <div className="flex items-center">
              <input
                {...register("remember")}
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-colors"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-slate-600 cursor-pointer select-none hover:text-slate-800"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* --- Sign In Button --- */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>

          {/* Register Link */}
          <div className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-indigo-600 hover:text-indigo-500 hover:underline transition-colors"
            >
              Sign up for free
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;

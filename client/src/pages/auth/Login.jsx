import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // 1. Import Hook Form
import { z } from "zod"; // 2. Import Zod
import { zodResolver } from "@hookform/resolvers/zod"; // 3. Import Resolver
import useEcomStore from "../../store/ecom-store";
import Swal from "sweetalert2";

// -- Schema Validation --
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  remember: z.boolean().optional(), // ✅  Field for Checkbox
});
// --- component Login ---
const Login = () => {
  // zustand store
  const ActionLogin = useEcomStore((state) => state.actionLogin);
  // Router Hook
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; //home page
  // --- useForm Hook ----
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: { remember: true }, // default to click mem (UX)
  });

  // function - Role Redirect
  const roleNavigate = (role) => {
    if (role === "admin") {
      navigate("/admin"); // 👨🏼‍💼
    } else {
      navigate(from, { replace: true }); // 👨🏻‍💻
    }
  };
  // -- Function Submit --
  const onSubmit = async (data) => {
    try {
      //  Call Api by zustand store
      const res = await ActionLogin({
        email: data.email,
        password: data.password,
      });
      //  2.Check Remember Me (optional Login)
      if (data.remember) {
        console.log("User want to be remembered");
      } else {
        console.log("Session Only");
      }
      // 3. Notification and Redirect
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
    // Background & Center Layout
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Card Container */}
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl border border-gray-100">
        {/* Header: Welcome Message */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please enter your details to sign in.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className={`block w-full rounded-lg border px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-black sm:text-sm outline-none transition-all ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-black"
                  }`}
                />
                {/* ✅ เพิ่ม Error Message ให้ Email */}
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-black sm:text-sm outline-none transition-all"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  {...register("remember")}
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-gray-500"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                {/* Link */}
                <Link
                  to="/forgot-password"
                  className="font-medium text-black hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="group relative flex w-full justify-center rounded-full bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all active:scale-95 shadow-lg"
            >
              Sign in
            </button>
          </div>

          {/* Link to Register */}
          <div className="text-center text-sm">
            <span className="text-gray-500">Don't have an account? </span>
            {/* Link */}
            <Link
              to="/register"
              className="font-medium text-black hover:underline"
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

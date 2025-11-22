import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // JS
  // redirect fly to
  const navigate = useNavigate();
  const roleNavigate = (role) => {
    if (role === "admin") {
      navigate("/admin"); // 👨🏼‍💼
    } else {
      navigate("/user"); // 👨🏻‍💻
    }
  };
  // zustand
  const ActionLogin = useEcomStore((state) => state.actionLogin);
  //
  const [Data, setData] = useState({
    email: "",
    password: "",
  });
  const hldSubmitSignInForm = async (e) => {
    e.preventDefault();
    // ActionLogin(Data);
    try {
      const resData = await ActionLogin(Data);
      const role = resData.data.payload.role;
      roleNavigate(role);
      toast.success(resData?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const hldOnChangeInput = async (e) => {
    console.log(e.target.name, e.target.value);
    setData({
      ...Data,
      // key // value
      [e.target.name]: e.target.value,
    });
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

        <form className="mt-8 space-y-6" onSubmit={hldSubmitSignInForm}>
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
                  onChange={hldOnChangeInput}
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-black sm:text-sm outline-none transition-all"
                />
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
                  onChange={hldOnChangeInput}
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-black sm:text-sm outline-none transition-all"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
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
                <div
                  to="/forgot-password"
                  className="font-medium text-black hover:underline"
                >
                  Forgot password?
                </div>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <div>
            <button
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

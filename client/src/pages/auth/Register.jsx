import { useState } from "react";
import axios from "axios";
const Register = () => {
  // JS
  const [Form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  // handle
  const hldOnChangeInput = (e) => {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...Form,
      // key:value
      [e.target.name]: e.target.value,
    });
  };
  const hldSubmitInform = async (e) => {
    e.preventDefault();
    if (Form.password !== Form.confirmPassword) {
      return alert("Password is not match !!");
    }
    try {
      const resFront = await axios.post(
        "http://localhost:5001/api/register",
        Form
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // 1. Background & Center Layout: พื้นหลังสีเทาจางๆ ช่วยดันให้ Card ตรงกลางเด่นขึ้น
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* 2. The Card: กล่องสีขาว มุมโค้ง มีเงา และขอบบางๆ */}
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
        <form className="mt-8 space-y-10" onSubmit={hldSubmitInform}>
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
                onChange={hldOnChangeInput}
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-black sm:text-sm outline-none transition-all"
              />
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
                onChange={hldOnChangeInput}
                name="password"
                type="text"
                required
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-black sm:text-sm outline-none transition-all"
              />
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
                  onChange={hldOnChangeInput}
                  name="confirmPassword"
                  type="text"
                  required
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-black sm:text-sm outline-none transition-all"
                />
              </div>
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-full bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all active:scale-95 shadow-lg"
              >
                Create Account
              </button>
            </div>
            {/* Link to Login */}
            <div className="text-center text-sm">
              <span className="text-gray-500">Already have an account? </span>
              {/* <Link
                to="login"
                className="font-medium text-black hover:underline"
              >
                Log in
              </Link> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;

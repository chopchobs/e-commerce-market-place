import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { forgotPassword } from "../../api/auth";

// MAIL_REGEX
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [passError, setPassError] = useState("");

  // Real-time Validation
  useEffect(() => {
    if (!email) {
      setPassError(""); // default = empty data
      return;
    }

    // if input data start check Format
    if (!EMAIL_REGEX.test(email)) {
      setPassError("Invalid email format (e.g., user@example.com).");
    } else {
      setPassError(""); // if pass clear error
    }
  }, [email]);

  // handle
  const hldEmail = async (e) => {
    e.preventDefault();
    // Validation - have error , empty email
    if (passError || !email) return;
    // start to DB
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      console.log("Response from Backend:", res);

      Swal.fire({
        icon: "success",
        title: "Check your email",
        text: "We have sent a password reset link to your email.",
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getInputClass = (error, value) => {
    let baseClass =
      "block w-full rounded-lg px-4 py-3 outline-none transition-colors border mt-1";
    if (error) {
      // Error: red
      return `${baseClass} border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50 text-red-900`;
    } else if (value && !error) {
      // Success: green
      return `${baseClass} border-green-500 focus:border-green-500 focus:ring-green-500 bg-white`;
    } else {
      //  Not data: Gray
      return `${baseClass} border-gray-300 focus:border-black focus:ring-black bg-white`;
    }
  };
  // check button: ถ้ากำลังโหลด OR มี error OR อีเมลว่าง => ให้ Disable
  const isButtonDisabled = loading || !!passError || !email;
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        {/* -- Form -- */}
        <form className="mt-8 space-y-6" onSubmit={hldEmail}>
          <div>
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-gray-700 ml-1 mb-1 text-left"
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              placeholder="user@example.com"
              // ส่งค่า email เข้าไปในฟังก์ชันด้วย เพื่อเช็คว่าควรขึ้นสีเขียวไหม
              className={getInputClass(passError, email)}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/*  Error Message */}
            {passError && (
              <p className="text-red-500 text-xs mt-2 text-left flex items-center">
                ⚠️ {passError}
              </p>
            )}
          </div>

          <div>
            {/* button */}
            <button
              disabled={isButtonDisabled}
              type="submit"
              className={`group relative flex w-full justify-center rounded-full px-4 py-3 text-sm font-semibold text-white transition-all shadow-lg 
                ${
                  isButtonDisabled
                    ? "bg-gray-400 cursor-not-allowed" // ปุ่มเทา กดไม่ได้
                    : "bg-black hover:bg-gray-800 active:scale-95 focus:ring-2 focus:ring-gray-500" // ปุ่มปกติ
                }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            {/* login link */}
            <div className="text-center text-sm py-4 mt-2">
              <Link
                to="/login"
                className="font-medium text-gray-600 hover:text-black hover:underline transition-colors"
              >
                ← Back to Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

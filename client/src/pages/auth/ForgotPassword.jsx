import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { forgotPassword } from "../../api/auth";
import {
  Mail,
  ArrowLeft,
  KeyRound,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [passError, setPassError] = useState("");

  // Validation
  useEffect(() => {
    if (!email) {
      setPassError("");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setPassError("Invalid email format.");
    } else {
      setPassError("");
    }
  }, [email]);

  // Handle Submit
  const hldEmail = async (e) => {
    e.preventDefault();
    if (passError || !email) return;

    setLoading(true);
    try {
      const res = await forgotPassword(email);
      Swal.fire({
        icon: "success",
        title: "Check your email",
        text: "We have sent a password reset link.",
        confirmButtonColor: "#4f46e5",
        timer: 3000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Error sending email.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = loading || !!passError || !email;

  // Style Function
  const getInputStyles = () => {
    const base =
      "block w-full rounded-xl pl-11 pr-10 py-3 text-sm outline-none transition-all duration-200 border";
    if (passError)
      return `${base} border-red-300 bg-red-50 text-red-900 focus:border-red-500 placeholder:text-red-300`;
    if (email && !passError)
      return `${base} border-green-300 bg-green-50 text-green-900 focus:border-green-500`;
    return `${base} border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10`;
  };

  return (
    // ✨ Container:
    // - ตัด min-h-screen ออก ใช้ min-h-[60vh] แทนเพื่อให้การ์ดอยู่กลางๆ พื้นที่ content
    // - เอา background ออกเพื่อให้กลืนไปกับ Layout หลัก
    <div className="flex w-full min-h-[60vh] items-center justify-center font-sans py-4">
      {/* ✨ Card:
          - max-w-md: จำกัดความกว้างไม่ให้ใหญ่เกิน
          - overflow-hidden: ตัดขอบที่เกิน
          - shadow-xl: ใส่เงาให้ดูลอยเด่นขึ้นมาจากพื้นหลัง Layout
      */}
      <div className="w-full max-w-md bg-white rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-6 sm:p-8 relative">
        {/* Decorative Background Blob (แถบสีด้านบน) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1.5 bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>

        {/* Header Icon */}
        <div className="flex justify-center mb-6 mt-2">
          <div className="h-14 w-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner ring-4 ring-white">
            <KeyRound size={28} strokeWidth={1.5} />
          </div>
        </div>

        {/* Titles */}
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Forgot Password?
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed max-w-[90%] mx-auto">
            Enter your email and we'll send you a link to get back into your
            account.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={hldEmail}>
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-bold text-slate-700 ml-1"
            >
              Email Address
            </label>

            <div className="relative group">
              {/* Left Icon */}
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors">
                <Mail
                  size={18}
                  className={
                    passError
                      ? "text-red-400"
                      : email && !passError
                        ? "text-green-500"
                        : "text-slate-400 group-focus-within:text-indigo-500"
                  }
                />
              </div>

              {/* Input Field */}
              <input
                id="email"
                type="email"
                value={email}
                placeholder="name@example.com"
                className={getInputStyles()}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Right Status Icon */}
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                {passError && (
                  <AlertCircle
                    size={18}
                    className="text-red-500 animate-pulse"
                  />
                )}
                {email && !passError && (
                  <CheckCircle2
                    size={18}
                    className="text-green-500 animate-in fade-in"
                  />
                )}
              </div>
            </div>

            {/* Error Text */}
            {passError && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium animate-in slide-in-from-top-1">
                {passError}
              </p>
            )}
          </div>

          <div className="pt-2 space-y-4">
            {/* Submit Button */}
            <button
              disabled={isButtonDisabled}
              type="submit"
              className={`w-full flex justify-center items-center rounded-xl px-4 py-3 text-sm font-bold text-white shadow-md transition-all duration-300
                ${
                  isButtonDisabled
                    ? "bg-slate-300 cursor-not-allowed shadow-none"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 hover:-translate-y-0.5 active:scale-[0.98]"
                }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>

            {/* Back Link */}
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors py-1"
            >
              <ArrowLeft size={16} />
              Back to Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

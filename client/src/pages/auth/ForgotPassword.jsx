import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { forgotPassword } from "../../api/auth";

// component
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // function
  console.log("Email State Updated:", email);

  const hldEmail = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // set data = empty
    // --Validation : wrong data ---
    if (!email || email.trim() === "") {
      setErrorMessage("Please enter your email address.");
      Swal.fire({
        icon: "warning",
        title: "Input Required",
        text: "Please enter your email address.",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|co\.th|ac\.th|io)$/i;
    if (!emailRegex.test(email)) {
      setErrorMessage(
        "Please enter a valid email format (e.g., user@example.com)."
      );
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email format (e.g.,user@example.com).",
        confirmButtonColor: "#ef4444", // สีแดง (Optional)
      });
      return;
    }
    // Start to DB
    setLoading(true);
    try {
      // call APi
      // await forgotPassword(email);
      console.log("Sending Email:", email);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your email has been submitted successfully.",
        showConfirmButton: false, // ซ่อนปุ่ม OK
        timer: 2000, // ปิดเองใน 2 วินาที
      });
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };
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
            <label htmlFor="email-address" className="sr-only">
              Email Address
            </label>
            <input
              value={email}
              placeholder="Email Address"
              className={`block w-full rounded-lg px-4 py-3 outline-none transition-colors border-2 
              ${
                errorMessage
                  ? "border-red-500 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-indigo-400 text-indigo-800 placeholder-indigo-300 focus:border-indigo-600 focus:ring-indigo-600"
              }
            `}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
            />
            {errorMessage && (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
          <div>
            {/* button */}
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-full bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all active:scale-95 shadow-lg disabled:bg-gray-400"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            {/* login */}
            <div className="text-center text-sm py-2">
              <Link
                to="/login"
                className="font-medium text-gray-900 hover:underline"
              >
                Black to Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;

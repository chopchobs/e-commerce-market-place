import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { resetPassword } from "../../api/auth";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //  string keep error text
  const [passError, setPassError] = useState("");
  const [matchError, setMatchError] = useState("");

  // Following - real time
  useEffect(() => {
    if (newPassword.length > 0 && newPassword.length < 6) {
      setPassError("Password must be at least 6 characters.");
    } else {
      setPassError("");
    }
    if (confirmPassword.length > 0 && newPassword !== confirmPassword) {
      setMatchError("Passwords do not match.");
    } else {
      setMatchError("");
    }
  }, [newPassword, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // when show error can not submit
    if (passError || matchError) return;
    // Start to DB
    setLoading(true);
    try {
      const res = await resetPassword(token, newPassword);
      console.log("Response:", res);

      // --- Success (ใช้ Swal ได้ เพราะจบ Process แล้ว) ---
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.log("error", error);
      // System Error: ใช้ Swal หรือเปลี่ยนเป็น Toast ก็ได้
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getInputClass = (error, value) => {
    let baseClass =
      "w-full block rounded-lg border mt-1 px-4 py-3 text-indigo-900 focus:ring-1 sm:text-sm outline-none transition-colors";

    if (error) {
      return `${baseClass} border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50`;
    } else if (value && !error) {
      return `${baseClass} border-green-500 focus:border-green-500 focus:ring-green-500`;
    } else {
      return `${baseClass} border-gray-300 focus:border-black focus:ring-black`;
    }
  };
  const isButtonDisabled =
    loading || passError || matchError || !newPassword || !confirmPassword;
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full bg-white max-w-md rounded-2xl shadow-xl p-10 border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Set New Password
          </h2>
          <p className="text-sm mt-2 text-gray-500">
            Please enter your new password below.
          </p>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 text-left">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className={getInputClass(passError, newPassword)}
              />
              {passError && (
                <p className="text-red-500 text-xs mt-1 text-left">
                  {passError}
                </p>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 text-left">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={getInputClass(matchError, confirmPassword)}
                />
                {matchError && (
                  <p className="text-red-500 text-xs mt-1 text-left">
                    {matchError}
                  </p>
                )}
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`group relative flex w-full justify-center rounded-full px-4 py-3 text-white text-sm font-semibold shadow-lg transition-all
                ${
                  isButtonDisabled
                    ? "bg-gray-400 cursor-not-allowed" // style not success
                    : "bg-black hover:bg-gray-800 active:scale-95 focus:ring-2 focus:ring-gray-500" // style normal
                }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;

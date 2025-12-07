import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const LoadingPage = ({
  countStart = 3,
  redirectPath = "/",
  enableRedirect = true,
}) => {
  const [count, setCount] = useState(countStart);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!enableRedirect) return;

    const intervalId = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount <= 1) {
          clearInterval(intervalId);
          setRedirect(true);
          return 0;
        }
        return currentCount - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [enableRedirect]);

  if (redirect && enableRedirect) {
    return <Navigate to={redirectPath} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 font-sans">
      {/* Container */}
      <div className="relative flex flex-col items-center justify-center p-10 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 min-w-[300px]">
        {/* ---  Animation --- */}
        <div className="relative flex justify-center items-center mb-6">
          {/*  (Pulse Effect) */}
          <div className="absolute animate-ping inline-flex h-20 w-20 rounded-full bg-indigo-100 opacity-75"></div>

          {/*Loading (Spinning Ring) */}
          {/* CSS Border */}
          <div className="relative animate-spin rounded-full h-16 w-16 border-[3px] border-indigo-100 border-t-indigo-600 shadow-sm"></div>

          {/* Countdown number*/}
          {enableRedirect && (
            <div className="absolute flex items-center justify-center inset-0">
              <span className="text-indigo-600 font-bold text-lg font-mono">
                {count}
              </span>
            </div>
          )}
        </div>

        {/* --- text --- */}
        <h3 className="text-lg font-bold text-slate-800 mb-2 tracking-tight">
          {enableRedirect ? "Redirecting..." : "Loading..."}
        </h3>

        <p className="text-slate-400 text-sm text-center">
          {enableRedirect
            ? `Taking you to home page in ${count}s`
            : "Please wait a moment"}
        </p>
      </div>

      {/* Footer (Optional) */}
      <div className="mt-8 text-xs text-slate-300">Secure Redirect System</div>
    </div>
  );
};

export default LoadingPage;

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Loading.jsx
const LoadingPage = () => {
  const [count, setCount] = useState(3);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
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
  }, []);
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-4">
      <div className="relative flex justify-center items-center">
        {/* วงกลมพื้นหลังเด้งๆ */}
        <div className="absolute animate-ping inline-flex h-16 w-16 rounded-full bg-green-100 opacity-75"></div>

        {/* ตัวหมุน Loading */}
        <div className="relative animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500 border-t-transparent shadow-md"></div>

        {/* (Option) ใส่ตัวเลขนับถอยหลังตรงกลางให้ดูเท่ๆ */}
        <div className="absolute text-green-600 font-bold text-sm">{count}</div>
      </div>

      {/* ข้อความบอกผู้ใช้ */}
      <p className="text-gray-500 text-sm">Returning to Home...</p>
    </div>
  );
};

export default LoadingPage;

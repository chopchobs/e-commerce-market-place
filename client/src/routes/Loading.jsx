import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const LoadingPage = ({
  countStart = 2, // เริ่มนับถอยหลังจากเลขนี้
  redirectPath = "/",
  enableRedirect = true, //  (เปิด/ปิด) นับถอยหลัง
}) => {
  const [count, setCount] = useState(countStart);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // ถ้าไม่เปิดระบบ redirect ก็ไม่ต้องทำอะไร (return ออกเลย)
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
  }, [enableRedirect]); // ใส่ dependency เพื่อความชัวร์

  if (redirect && enableRedirect) {
    return <Navigate to={redirectPath} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-4">
      <div className="relative flex justify-center items-center">
        {/* วงกลมพื้นหลังเด้งๆ */}
        <div className="absolute animate-ping inline-flex h-16 w-16 rounded-full bg-green-100 opacity-75"></div>

        {/* ตัวหมุน Loading */}
        <div className="relative animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-400 border-t-transparent shadow-md"></div>

        {/* (Option) ใส่ตัวเลขนับถอยหลัง (โชว์เฉพาะตอนเปิด Redirect) */}
        {enableRedirect && (
          <div className="absolute text-green-600 font-bold text-sm">
            {count}
          </div>
        )}
      </div>

      {/* ข้อความบอกผู้ใช้ (เปลี่ยนตามโหมด) */}
      <p className="text-gray-500 text-sm">
        {enableRedirect ? "Redirecting in Home" : "Loading..."}
      </p>
    </div>
  );
};

export default LoadingPage;

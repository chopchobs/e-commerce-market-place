import { Link } from "react-router-dom";

const LoginRegisterMenu = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* --- LOGIN BUTTON --- 
        Mobile: ซ่อนขอบ/พื้นหลัง เน้นประหยัดที่
        Desktop: ดู Clean สบายตา
      */}
      <Link
        to="/login"
        className="
          rounded-full px-3 py-2 text-xs font-bold text-gray-600 transition-all 
          hover:bg-indigo-50 hover:text-indigo-600
          sm:px-4 sm:text-sm
        "
      >
        Log in
      </Link>

      {/* --- REGISTER BUTTON --- 
        Mobile: ปุ่มเด่นแต่ขนาดกะทัดรัด
        Desktop: ปุ่มใหญ่ มีเงาสวยงาม
      */}
      <Link
        to="/register"
        className="
          rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-200 
          transition-all duration-300
          hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5
          active:scale-95 active:shadow-none
          sm:px-6 sm:py-2.5 sm:text-sm
        "
      >
        Sign up
      </Link>
    </div>
  );
};

export default LoginRegisterMenu;

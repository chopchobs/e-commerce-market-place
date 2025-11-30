import { Link } from "react-router-dom";

const MainNav = () => {
  return (
    // // 1. Sticky & Glassmorphism: ติดหนึบด้านบน + พื้นหลังเบลอแบบกระจก
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      {/* 2. Container: คุมความกว้างเนื้อหาไม่ให้ยาวเกินไป บนจอใหญ่ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* --- Left Section: Logo & Main Links --- */}
        <div className="flex h-16 items-center justify-between">
          {/* LOGO: ตัวหนา จัดระยะห่างตัวอักษรให้ชิดกันนิดนึง (Tight) ดู Inter/Modern */}
          <div className="flex items-center gap-12">
            <Link
              to={"/"}
              className="text-2xl font-bold tracking-tighter text-gray-900 hover:opacity-80 transition-opacity"
            >
              LOGO
            </Link>
            {/* Navigation Links: ซ่อนบนมือถือ (hidden md:flex) */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to={"/"}
                className="group relative text-sm font-medium text-gray-500 hover:text-black transition-colors"
              >
                <span className="font-medium text-sm">HOME</span>
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all group-hover:w-full"></span>
              </Link>
              <Link
                to={"shop"}
                className=" group relative text-sm font-medium text-gray-500 hover:text-black transition-colors"
              >
                <span className="font-medium text-sm">SHOP</span>
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all group-hover:w-full"></span>
              </Link>
              <Link
                to={"about"}
                className=" group relative text-sm font-medium text-gray-500 hover:text-black transition-colors"
              >
                <span className="font-medium text-sm">ABOUT</span>
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all group-hover:w-full"></span>
              </Link>
            </div>
          </div>
          {/* --- Right Section: Cart & Actions --- */}
          <div className="flex items-center gap-6">
            <Link
              to={"cart"}
              className="group relative text-gray-500 hover:text-black transition-colors"
            >
              <span className="font-medium text-sm">CART(0)</span>
              {/* ขีดเส้นใต้ที่จะวิ่งออกมาเมื่อ Hover (Micro-interaction) */}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all group-hover:w-full"></span>
            </Link>
            <div className="flex items-center gap-3">
              {/* Login: ปุ่มแบบ Ghost (ไม่มีพื้นหลัง) */}
              <Link
                to={"login"}
                className="group rela hidden sm:block text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                <span className="font-medium text-sm">LOGIN</span>
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all group-hover:w-full"></span>
              </Link>
              {/* Register: ปุ่มหลัก (Primary Button) สีดำมุมโค้ง */}
              <Link
                checkout
                main
                to={"register"}
                className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-105 hover:bg-gray-800 shadow-lg shadow-gray-200"
              >
                REGISTER
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default MainNav;

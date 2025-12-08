import { Link } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ShoppingCart } from "lucide-react";
const MainNav = () => {
  const cart = useEcomStore((state) => state.carts);
  const actionOpenCart = useEcomStore((state) => state.actionOpenCart);
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
              <Link
                to={"contact"}
                className=" group relative text-sm font-medium text-gray-500 hover:text-black transition-colors"
              >
                <span className="font-medium text-sm">CONTACT</span>
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all group-hover:w-full"></span>
              </Link>
            </div>
          </div>
          {/* --- Right Section: Cart & Actions --- */}
          <div className="flex items-center gap-6">
            {/* CART 🛒 */}
            <button
              onClick={actionOpenCart}
              className="relative p-2 rounded-full hover:bg-slate-100 transition-all duration-200 active:scale-95"
            >
              <ShoppingCart size={22} className="text-slate-600" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm border-2 border-white">
                  {cart.length > 99 ? "99+" : cart.length}
                </span>
              )}
            </button>
            <div className="flex items-center gap-3">
              {/* Login: ปุ่มแบบ Ghost (ไม่มีพื้นหลัง) */}
              <Link
                to={"login"}
                className="group rela hidden sm:block text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                <span className="font-medium text-sm">LOGIN</span>
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all group-hover:w-full"></span>
              </Link>

              <Link
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

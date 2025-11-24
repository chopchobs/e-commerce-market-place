import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, User, Hexagon } from "lucide-react";

const MainNav = () => {
  return (
    // 1. Navbar Container: พื้นหลังขาวโปร่งแสง + เส้นขอบ Slate อ่อนๆ
    <nav className="sticky  top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl transition-all duration-300">
      {/* 2. Inner Content Wrapper */}
      {/* max-w-7xl px-4 sm:px-6 lg:px-8 */}
      <div className="mx-auto px-30 sm:px-6 lg:px-8 ">
        <div className="flex h-20 justify-between">
          {/* --- Left Section: Logo & Main Links --- */}
          <div className="flex items-center gap-12">
            {/* LOGO: ใช้ Icon Hexagon สี Indigo เข้าชุดกับ Admin */}
            <Link to={"/"} className="flex items-center gap-2 group">
              <div className="p-1.5 bg-indigo-600 rounded-lg group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
                <Hexagon size={24} className="text-white fill-indigo-600" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors">
                BRAND
              </span>
            </Link>

            {/* Navigation Links (Desktop) */}
            <div className="hidden md:flex items-center gap-8">
              {["HOME", "SHOP", "ABOUT"].map((item) => (
                <NavLink
                  key={item}
                  to={item === "HOME" ? "/" : item.toLowerCase()}
                  className={({ isActive }) => `
                    group relative text-sm font-semibold tracking-wide transition-colors duration-300
                    ${
                      isActive
                        ? "text-indigo-600"
                        : "text-slate-500 hover:text-indigo-600"
                    }
                  `}
                >
                  {item}
                  {/* Underline Animation: วิ่งจากซ้ายไปขวาด้วยสี Indigo */}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full group-[.active]:w-full"></span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* --- Right Section: Cart & Actions --- */}
          <div className="flex items-center gap-6">
            {/* Cart Link */}
            <Link
              to={"cart"}
              className="group relative flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors duration-300"
            >
              <div className="relative">
                <ShoppingCart size={20} strokeWidth={2} />
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">
                  0
                </span>
              </div>
              <span className="text-sm font-medium hidden sm:block">Cart</span>
            </Link>

            {/* Divider */}
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

            <div className="flex items-center gap-3">
              {/* Login Button: แบบ Ghost */}
              <Link
                to={"login"}
                className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <User size={18} />
                Login
              </Link>

              {/* Register Button: แบบ Primary (Indigo Theme) */}
              <Link
                to={"register"}
                className="group relative overflow-hidden rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105 hover:bg-indigo-700 hover:shadow-indigo-500/50 active:scale-95"
              >
                <span className="relative z-10">Register</span>
                {/* Shine Effect (Optional) */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-linear-to-r from-transparent via-white/20 to-transparent" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
// bg - gradient - to - r;
export default MainNav;

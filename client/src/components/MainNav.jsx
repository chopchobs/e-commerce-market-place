import { Link, useLocation } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { Menu, ShoppingCart, X, Home, Store, Info, Phone } from "lucide-react";
import ProfileMenu from "./ProfileMenu";
import LoginRegisterMenu from "./LoginRegisterMenu";
import { useState, useEffect } from "react";

const MainNav = () => {
  // Zustand
  const cart = useEcomStore((state) => state.carts);
  const actionOpenCart = useEcomStore((state) => state.actionOpenCart);
  const user = useEcomStore((state) => state.user);

  // Router
  const location = useLocation();

  // State
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => setIsOpenMenu(!isOpenMenu);

  // ✨ ปิดเมนูอัตโนมัติเมื่อเปลี่ยนหน้า
  useEffect(() => {
    setIsOpenMenu(false);
  }, [location.pathname]);

  // ✨ Menu Items Config (รวม Icon เพื่อใช้ใน Mobile)
  const menuItems = [
    { path: "/", label: "HOME", icon: <Home size={20} /> },
    { path: "/shop", label: "SHOP", icon: <Store size={20} /> },
    { path: "/about", label: "ABOUT", icon: <Info size={20} /> },
    { path: "/contact", label: "CONTACT", icon: <Phone size={20} /> },
  ];

  return (
    <>
      {/* ✨ Navbar 
        backdrop-blur-md: พื้นหลังเบลอ
        supports-[...]: รองรับ browser ใหม่ๆ ให้เบลอสวยขึ้น
      */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md supports-backdrop-filter:bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* --- Left Section: Logo & Mobile Toggle --- */}
            <div className="flex items-center gap-3 md:gap-8">
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 hover:text-indigo-600 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isOpenMenu ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <Link
                to={"/"}
                className="text-2xl font-black tracking-tighter text-gray-900 hover:text-indigo-600 transition-colors duration-300"
              >
                LOGO
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative text-sm font-semibold tracking-wide transition-colors duration-300 py-2
                      ${location.pathname === item.path ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"}
                    `}
                  >
                    {item.label}
                    {/* Underline Animation */}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300 rounded-full
                      ${location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"}`}
                    ></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* --- Right Section: Cart & Actions --- */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* CART 🛒 */}
              <button
                onClick={actionOpenCart}
                className="relative p-2 rounded-full hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-all duration-200 active:scale-95"
              >
                <ShoppingCart size={22} />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-sm border-[1.5px] border-white">
                    {cart.length > 99 ? "99+" : cart.length}
                  </span>
                )}
              </button>

              {/* Profile / Login */}
              {user ? <ProfileMenu /> : <LoginRegisterMenu />}
            </div>
          </div>
        </div>
      </nav>

      {/* ✨ Mobile Menu Overlay & Content 
        แยกออกมาอยู่นอก nav structure หลักเพื่อให้ z-index ทำงานถูกต้อง
      */}
      {isOpenMenu && (
        <div className="md:hidden fixed inset-0 z-40 top-16">
          {/* Backdrop: กดที่ว่างเพื่อปิด */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={toggleMenu}
          />

          {/* Menu Panel */}
          <div className="relative bg-white border-t border-gray-100 shadow-xl rounded-b-2xl p-4 space-y-1 animate-in slide-in-from-top-2 duration-300">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={toggleMenu}
                  className={`
                    flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-base transition-all active:scale-[0.98]
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  {/* Icon Wrapper */}
                  <span
                    className={`${isActive ? "text-indigo-600" : "text-gray-400"}`}
                  >
                    {item.icon}
                  </span>
                  {item.label}

                  {/* Active Indicator (จุดวงกลมเล็กๆ) */}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Decoration line */}
            <div className="pt-2">
              <div className="h-px w-full bg-gray-100"></div>
              <p className="text-xs text-center text-gray-400 mt-3 font-light">
                © 2025 CHOPPY Company
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default MainNav;

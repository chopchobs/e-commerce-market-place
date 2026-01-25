import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import {
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  FileText,
  Heart,
  MapPin,
  ClipboardList,
  PackagePlus,
  Users,
  Settings,
} from "lucide-react";

const ProfileMenu = () => {
  const logout = useEcomStore((state) => state.logout);
  const user = useEcomStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // --- Configuration: List 🐳 ---

  // 1. Menu User 💕
  const userMenus = [
    { label: "My Profile", icon: <User size={18} />, link: "/user/profile" },
    {
      label: "Order History",
      icon: <FileText size={18} />,
      link: "/user/history",
    },
    { label: "Wishlist", icon: <Heart size={18} />, link: "/user/wishlist" },
    { label: "My Address", icon: <MapPin size={18} />, link: "/user/address" },
  ];

  // 2. Menu Admin 🧑‍💼
  const adminMenus = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      link: "/admin",
    },
    {
      label: "Manage Orders",
      icon: <ClipboardList size={18} />,
      link: "/admin/orders",
    },
    {
      label: "Manage Products",
      icon: <PackagePlus size={18} />,
      link: "/admin/product",
    },
    {
      label: "Manage Users",
      icon: <Users size={18} />,
      link: "/admin/manage",
    },
  ];

  const avatarSrc = user?.picture
    ? user.picture
    : user?.role === "admin"
      ? "https://cdn-icons-png.flaticon.com/512/5836/5836504.png" // 👨‍💼 รูป Admin (ใส่สูท/ทางการ)
      : "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-flat-user-pattern-round-image_1200090.jpg"; // 🙍‍♂️ รูป User (น่ารัก/ทั่วไป)
  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <div className="relative z-50" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 sm:gap-3 p-1 pr-2 rounded-full hover:bg-indigo-50 transition-all focus:ring-2 focus:ring-indigo-100"
      >
        {/* img */}
        <img
          className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-indigo-200"
          src={avatarSrc}
          alt="User Avatar"
        />
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-bold text-gray-700 group-hover:text-indigo-700">
            {user?.name || "User"}
          </span>
          <span className="text-[10px] text-gray-400 uppercase">
            {user?.role}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 group-hover:text-indigo-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 origin-top-right bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
            <p className="text-sm font-bold text-gray-900 truncate">
              {user?.email}
            </p>
            <p className="text-xs text-gray-500">Welcome back!</p>
          </div>

          {/* Dynamic Menu List */}
          <ul className="p-2 space-y-1">
            {/* ถ้าเป็น ADMIN ให้โชว์เมนู Admin */}
            {user?.role === "admin" ? (
              <>
                <div className="px-3 py-1 text-xs font-semibold text-indigo-500 uppercase tracking-wider">
                  Admin Panel
                </div>
                {adminMenus.map((item, index) => (
                  <MenuItem
                    key={index}
                    {...item}
                    onClick={() => {
                      setIsOpen(false);
                      navigate(item.link);
                    }}
                    highlight // ใส่สีให้รู้ว่าเป็นเมนู Admin
                  />
                ))}
                <div className="my-1 border-t border-gray-100 mx-2"></div>
              </>
            ) : (
              // ถ้าเป็น USER ให้โชว์เมนู User
              userMenus.map((item, index) => (
                <MenuItem
                  key={index}
                  {...item}
                  onClick={() => {
                    setIsOpen(false);
                    navigate(item.link);
                  }}
                />
              ))
            )}

            {/* ปุ่ม Logout (มีทุก Role) */}
            {user?.role !== "admin" && (
              <div className="my-1 border-t border-gray-100 mx-2"></div>
            )}

            <MenuItem
              icon={<LogOut size={18} />}
              label="Sign Out"
              isDanger
              onClick={handleLogout}
            />
          </ul>
        </div>
      )}
    </div>
  );
};

// Sub-Component เพื่อลดโค้ดซ้ำ
const MenuItem = ({ icon, label, onClick, isDanger, highlight }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all
          ${
            isDanger
              ? "text-red-600 hover:bg-red-50"
              : highlight
                ? "text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
                : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
          }
        `}
      >
        <span
          className={
            isDanger
              ? "text-red-500"
              : highlight
                ? "text-indigo-600"
                : "text-gray-400"
          }
        >
          {icon}
        </span>
        {label}
      </button>
    </li>
  );
};

export default ProfileMenu;

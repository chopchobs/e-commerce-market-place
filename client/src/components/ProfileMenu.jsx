import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  CreditCard,
  History,
} from "lucide-react";
import useEcomStore from "../store/ecom-store";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  //Zustand
  const logout = useEcomStore((state) => state.logout);
  const user = useEcomStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // function - logout
  const hldLogOut = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  // Logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="relative" ref={menuRef}>
      {/* ปุ่ม Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 rounded-full transition-all duration-300 hover:bg-gray-100 focus:outline-none"
      >
        <div className="relative">
          <img
            className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
            src="https://i.ibb.co/08rJb0w/Avatar.png" // ยังไม่มีรูปใน DB
            alt="User Avatar"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        <div className="hidden md:flex flex-col items-start mr-1">
          <span className="text-sm font-medium text-gray-700">
            {user?.name || user?.email}
          </span>
          <span className="text-[10px] text-gray-400">{user?.role}</span>
        </div>

        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 animate-fade-in-up">
          <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
            <p className="text-sm font-medium text-gray-900">
              {user?.email ? "Welcome back" : "Welcome Guest"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || "Guest"}
            </p>
          </div>

          <ul className="py-2">
            <MenuItem
              icon={<User size={16} />}
              text="My Profile"
              onClick={() => navigate("/user")}
            />
            <MenuItem
              icon={<CreditCard size={16} />}
              text="Billing"
              onClick={() => navigate("/user/billing")}
            />
            <MenuItem
              icon={<History size={16} />}
              text="History"
              onClick={() => navigate("/user/history")}
            />
            <MenuItem
              icon={<Settings size={16} />}
              text="Settings"
              onClick={() => navigate("/user/edit-profile")}
            />

            <div className="my-1 border-t border-gray-100"></div>
            <MenuItem
              icon={<LogOut size={16} />}
              text="Log Out"
              isDanger
              onClick={hldLogOut}
            />
          </ul>
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ icon, text, onClick, isDanger = false }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200
        ${
          isDanger
            ? "text-red-600 hover:bg-red-50"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
      >
        {icon}
        {text}
      </button>
    </li>
  );
};

export default ProfileMenu;

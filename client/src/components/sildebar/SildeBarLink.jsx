import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";

//  Component สำหรับ "Link" (เมนูที่เปลี่ยน URL)
// ใช้ NavLink ของ react-router-dom เพื่อจับสถานะ isActive อัตโนมัติ
const SideBarLink = ({ to, icon: Icon, label, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `
        group relative flex items-center w-full px-4 py-3.5 my-1 rounded-xl transition-all duration-300 ease-out
        ${
          isActive
            ? "bg-indigo-500/10 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.15)] border border-indigo-500/20"
            : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
        }
      `}
    >
      {({ isActive }) => (
        <>
          {/* Active Indicator (แถบแสงด้านซ้าย) */}
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full blur-[2px]" />
          )}

          <Icon
            size={20}
            className={`mr-3 transition-transform duration-300 group-hover:scale-110 ${
              isActive ? "text-indigo-400" : ""
            }`}
            strokeWidth={isActive ? 2.5 : 2}
          />

          <span
            className={`font-medium text-sm tracking-wide ${
              isActive ? "font-semibold" : ""
            }`}
          >
            {label}
          </span>

          {/* ลูกศรเล็กๆ โผล่มาตอน Hover (ถ้ายังไม่ได้เลือกหน้านั้น) */}
          {!isActive && (
            <ChevronRight
              size={14}
              className="ml-auto opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-50 transition-all duration-300"
            />
          )}
        </>
      )}
    </NavLink>
  );
};

export default SideBarLink;

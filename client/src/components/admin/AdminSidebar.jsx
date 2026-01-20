import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserCog,
  SquareChartGantt,
  ShoppingBasket,
  ListOrdered,
  LogOut,
  Hexagon,
} from "lucide-react";
import SideBarLink from "../sidebar/SildeBarLink";
import useEcomStore from "../../store/ecom-store";

// Main Sidebar Component
const AdminSidebar = () => {
  const logout = useEcomStore((state) => state.logout);
  const user = useEcomStore((state) => state.user);
  console.log("User", user);
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      logout();
      console.log("Logging out...");
      navigate("/login");
    } catch (error) {}
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <div className="h-screen w-72 bg-[#0B1120] border-r border-slate-800/60 flex flex-col shadow-2xl relative overflow-hidden">
      {/* Background Decor  */}
      <div className="absolute top-0 left-0 w-full h-64 bg-indigo-600/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-600/5 blur-[60px] pointer-events-none" />

      {/* Header */}
      <div className="h-24 flex items-center px-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/30">
            <Hexagon size={24} className="text-white fill-indigo-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight leading-tight">
              Admin Panel
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Enterprise Edition
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar relative z-10">
        <div className="px-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Main Menu
        </div>

        {/* ใช้ SidebarLink: ใส่ Path ปลายทางได้เลย (ไม่ต้องใส่ /admin นำหน้าถ้าอยู่ใน Route ซ้อน) */}
        {/* end={true} ใส่เฉพาะหน้าแรก (Dashboard) เพื่อไม่ให้มัน Active ตลอดเวลา */}
        <SideBarLink to="/admin" end icon={LayoutDashboard} label="Dashboard" />
        <SideBarLink
          to="/admin/product"
          icon={ShoppingBasket}
          label="Products"
        />
        <SideBarLink to="/admin/orders" icon={ListOrdered} label="Orders" />

        <div className="px-4 pt-6 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Management
        </div>

        <SideBarLink
          to="/admin/category"
          icon={SquareChartGantt}
          label="Categories"
        />
        <SideBarLink to="/admin/manage" icon={UserCog} label="Users & Roles" />
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-slate-800/60 bg-[#0f172a]/50 backdrop-blur-sm relative z-10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800 mb-3 group cursor-pointer hover:border-indigo-500/30 transition-colors">
          <img
            src="https://i.ibb.co/08rJb0w/Avatar.png" // ยังไม่มีรูปใน DB
            alt="User Avatar"
            className="w-9 h-9 rounded-full ring-2 ring-slate-700 group-hover:ring-indigo-500/50 transition-all"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">
              {user?.name || user?.email}
            </p>
            <p className="text-xs text-slate-500 truncate">{user?.role}</p>
          </div>
        </div>

        {/*  Logout */}
        <div
          onClick={handleLogout}
          className="w-full cursor-pointer text-red-400 hover:text-red-400 transition-colors"
        >
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all">
            <LogOut size={25} />
            <span className="font-medium">Sign Out</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminSidebar;

import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Nav อยู่บนสุด ไม่ต้อง fix position แล้ว เพราะ flex จัดการให้ */}
      <div className="flex flex-1 overflow-hidden">
        {/* (Sidebar + Content) ให้ยืดเต็มพื้นที่ที่เหลือ (flex-1) */}
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
export default LayoutAdmin;

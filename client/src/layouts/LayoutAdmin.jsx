import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
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

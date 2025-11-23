import { Outlet } from "react-router-dom";
import MainNavAdmin from "../components/MainNavAdmin";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";

const LayoutAdmin = () => {
  return (
    <>
      <MainNavAdmin />
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 bg-gray-200 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
export default LayoutAdmin;

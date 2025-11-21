import { Outlet } from "react-router-dom";
import MainNavAdmin from "../components/MainNavAdmin";

const LayoutAdmin = () => {
  return (
    <>
      <MainNavAdmin />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default LayoutAdmin;

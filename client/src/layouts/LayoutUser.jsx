import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

const LayoutUser = () => {
  return (
    <>
      <MainNav />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default LayoutUser;

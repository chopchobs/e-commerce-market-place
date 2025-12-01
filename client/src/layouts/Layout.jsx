import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";
import FoodBar from "../components/FoodBar";
import PageHeader from "../components/PageHeader";

const Layout = () => {
  return (
    <>
      <div>
        <MainNav />
        <PageHeader />
        <main>
          <Outlet />
        </main>
        <FoodBar />
      </div>
    </>
  );
};
export default Layout;

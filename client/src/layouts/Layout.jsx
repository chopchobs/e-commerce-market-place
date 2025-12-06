import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";
import FoodBar from "../components/FoodBar";
import PageHeader from "../components/PageHeader";
import CartDrawer from "../components/card/CardDrawer";

const Layout = () => {
  return (
    <>
      <div>
        <MainNav />
        <CartDrawer />
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

import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";
import FoodBar from "../components/FoodBar";
import CartDrawer from "../components/card/CardDrawer";
import PageHeader from "../components/PageHeader";

const LayoutUser = () => {
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
export default LayoutUser;

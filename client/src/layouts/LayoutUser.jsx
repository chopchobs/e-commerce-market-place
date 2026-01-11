import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";
import FoodBar from "../components/FoodBar";
import CartDrawer from "../components/card/CardDrawer";

const LayoutUser = () => {
  return (
    <>
      <div>
        <MainNav />
        <CartDrawer />
        <main>
          <Outlet />
        </main>
        <FoodBar />
      </div>
    </>
  );
};
export default LayoutUser;

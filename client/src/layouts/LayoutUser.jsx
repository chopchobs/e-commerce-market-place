import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";
import FoodBar from "../components/FoodBar";

const LayoutUser = () => {
  return (
    <>
      <div>
        <MainNav />
        <main>
          <Outlet />
        </main>
        <FoodBar />
      </div>
    </>
  );
};
export default LayoutUser;

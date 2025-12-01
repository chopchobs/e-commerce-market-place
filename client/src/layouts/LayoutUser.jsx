import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";
import FoodBar from "../components/FoodBar";

const LayoutUser = () => {
  return (
    <>
      <MainNav />
      <main>
        <Outlet />
      </main>
      <FoodBar />
    </>
  );
};
export default LayoutUser;

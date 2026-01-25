import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";
import FoodBar from "../components/FoodBar";
import PageHeader from "../components/PageHeader";
import CartDrawer from "../components/card/CardDrawer";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <CartDrawer />
        <PageHeader />
        <main className="grow container mx-auto px-4 py-6 md:px-8">
          <Outlet />
        </main>
        <FoodBar />
      </div>
    </>
  );
};
export default Layout;

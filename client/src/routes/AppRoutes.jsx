import { createBrowserRouter, RouterProvider } from "react-router-dom"; // instal
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import About from "../pages/About";
import CheckOut from "../pages/CheckOut";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Dashboard from "../pages/admin/Dashboard";
import Product from "../pages/admin/Product";
import LayoutUser from "../layouts/LayoutUser";
import ProtectRouteUser from "./ProtectRouteUser";
import ProtectRouteAdmin from "./ProtectRouteAdmin";
import Manage from "../pages/admin/Manage";
import EditProduct from "../pages/admin/EditProduct";
import Category from "../pages/admin/Category";
import Contact from "../pages/Contact";
import History from "../pages/user/History";
import ManageOrders from "../components/admin/ManageOrders";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import UserProfile from "../pages/user/UserProfile";
import EditProfile from "../pages/user/EditProfile";
import Billing from "../pages/user/Billing";
import Payment from "../pages/user/Payment";

const router = createBrowserRouter([
  {
    // general 🎃
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "checkout", element: <CheckOut /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
    ],
  },
  {
    // User  🐽
    path: "/user",
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <UserProfile /> },
      { path: "edit-profile", element: <EditProfile /> },
      { path: "billing", element: <Billing /> },
      { path: "payment", element: <Payment /> },
      { path: "history", element: <History /> },
    ],
  },
  {
    // admin  ☕️
    path: "/admin",
    element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "category", element: <Category /> },
      { path: "product", element: <Product /> },
      { path: "product/:id", element: <EditProduct /> },
      { path: "manage", element: <Manage /> },
      { path: "orders", element: <ManageOrders /> },
    ],
  },
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default AppRoutes;

import { createBrowserRouter, RouterProvider } from "react-router-dom"; // instal
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import About from "../pages/About";
import Cart from "../pages/Cart";
import History from "../pages/History";
import CheckOut from "../pages/CheckOut";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Dashboard from "../pages/admin/Dashboard";
import Category from "../pages/admin/Category";
import Product from "../pages/admin/product";
import LayoutUser from "../layouts/LayoutUser";
import HomeUser from "../pages/user/HomeUser";

const router = createBrowserRouter([
  {
    // user
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "about", element: <About /> },
      { path: "cart", element: <Cart /> },
      { path: "history", element: <History /> },
      { path: "checkout", element: <CheckOut /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    // admin
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "category", element: <Category /> },
      { path: "product", element: <Product /> },
    ],
  },
  {
    // user
    path: "/user",
    element: <LayoutUser />,
    children: [{ index: true, element: <HomeUser /> }],
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

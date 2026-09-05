import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/pages/Home/Home";
import Menu from "../components/pages/Menu/Menu";
import OrderShop from "../components/pages/Shop/OrderShop/OrderShop";
import Shop from "../components/pages/Shop/Shop";
import ContactUs from "../components/pages/ContactUs/ContactUs";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/contact",
                element:<ContactUs></ContactUs>
            },
            {
                path: "/menu",
                element: <Menu></Menu>
            },
            {
                path: "/shop",
                element: <Shop></Shop>
            },
            {
                path: "shop/:category",
                element: <OrderShop></OrderShop>
            }
        ]
    },
]);
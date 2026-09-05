import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/pages/Home/Home";
import Menu from "../components/pages/Menu/Menu";
import OrderShop from "../components/pages/Shop/OrderShop/OrderShop";
import Shop from "../components/pages/Shop/Shop";

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
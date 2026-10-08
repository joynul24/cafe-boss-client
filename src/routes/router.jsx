import {
    createBrowserRouter,
    Navigate,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/pages/Home/Home";
import Menu from "../components/pages/Menu/Menu";
import OrderShop from "../components/pages/Shop/OrderShop/OrderShop";
import Shop from "../components/pages/Shop/Shop";
import ContactUs from "../components/pages/ContactUs/ContactUs";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Mycart from "../components/dashbaord/User/Mycart";
import UserHome from "../components/dashbaord/User/UserHome";
import AdminDashboard from "../components/dashbaord/Admin/AdminDashboard";
import MyBooking from "../components/dashbaord/User/MyBooking";
import ManageItem from "../components/dashbaord/Admin/ManageItem";
import AllUser from "../components/dashbaord/Admin/AllUser";
import AddItem from "../components/dashbaord/Admin/AddItem";
import ManageBookings from "../components/dashbaord/Admin/ManageBookings";
import Reservation from "../components/dashbaord/User/Reservation";
import PaymentHistory from "../components/dashbaord/User/PaymentHistory";
import AddReview from "../components/dashbaord/User/AddReview";
import useAdmin from "../hooks/useAdmin";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../components/pages/ErrorPage/ErrorPage";
import UserRoute from "./UserRoute";
import UpdateItem from "../components/dashbaord/Admin/UpdateItem";
import Payment from "../components/dashbaord/User/Payment";
import AllPaymentHistory from "../components/dashbaord/Admin/AllPaymentHistory";

const DashboardRedirect = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    // const isAdmin = false

    if(isAdminLoading){
    return <span className="loading loading-bars loading-xl"></span>
  }

    if (isAdmin) {
        return <Navigate to="/dashboard/adminHome" replace />;
    }

    return <Navigate to="/dashboard/userHome" replace />;
};

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
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
    {
      path: "/dashboard",
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
            index: true,
            element: <DashboardRedirect></DashboardRedirect>
        },
        // User releted routes
        {
            path:"/dashboard/userHome",
            element:<PrivateRoute><UserRoute><UserHome></UserHome></UserRoute></PrivateRoute>
        },
        {
            path:"reservation",
            element:<PrivateRoute><UserRoute><Reservation></Reservation></UserRoute></PrivateRoute>
        },
        {
            path:"paymentHistory",
            element:<PrivateRoute><UserRoute><PaymentHistory></PaymentHistory></UserRoute></PrivateRoute>
        },
        {
            path: "payment",
            element: <PrivateRoute><UserRoute><Payment></Payment></UserRoute></PrivateRoute>
        },
        {
            path: "myCart",
            element: <PrivateRoute><UserRoute><Mycart></Mycart></UserRoute></PrivateRoute>
        },
        {
            path: "addReview",
            element: <PrivateRoute><UserRoute><AddReview></AddReview></UserRoute></PrivateRoute>
        },
        {
            path: "myBooking",
            element: <PrivateRoute><UserRoute><MyBooking></MyBooking></UserRoute></PrivateRoute>
        },
        // Admin Reletd Routes
                {
            path: "adminHome",
            element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
        },
        {
            path: "manageItems",
            element:<AdminRoute><ManageItem></ManageItem></AdminRoute>
        },
        {
            path: "updateItem/:id",
            element: <UpdateItem></UpdateItem>
        },
        {
            path:"addItem",
            element:<AdminRoute><AddItem></AddItem></AdminRoute>
        },
        {
            path:"manageBooking",
            element:<AdminRoute><ManageBookings></ManageBookings></AdminRoute>
        },
        {
            path:"allUsers",
            element:<AdminRoute><AllUser></AllUser></AdminRoute>
        },
        {
            path:"allPaymentHistory",
            element:<AdminRoute><AllPaymentHistory></AllPaymentHistory></AdminRoute>
        }
      ]
    },
    {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            }
        ]
    }
]);
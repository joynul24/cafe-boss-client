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
import Secret from "../components/pages/Secret/Secret";
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
            },
            {
                path: 'secret',
                element: <PrivateRoute><Secret></Secret></PrivateRoute>
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
        {
            path:"/dashboard/userHome",
            element:<PrivateRoute><UserHome></UserHome></PrivateRoute>
        },
        {
            path:"/dashboard/reservation",
            element:<PrivateRoute><Reservation></Reservation></PrivateRoute>
        },
        {
            path:"/dashboard/paymentHistory",
            element:<PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
        },
        {
            path: "/dashboard/myCart",
            element: <PrivateRoute><Mycart></Mycart></PrivateRoute>
        },
        {
            path: "/dashboard/addReview",
            element: <PrivateRoute><AddReview></AddReview></PrivateRoute>
        },
        {
            path: "/dashboard/myBooking",
            element: <PrivateRoute><MyBooking></MyBooking></PrivateRoute>
        },
        // Admin Reletd Routes
                {
            path: "/dashboard/adminHome",
            element:<PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>
        },
        {
            path: "/dashboard/manageItems",
            element: <PrivateRoute><ManageItem></ManageItem></PrivateRoute>
        },
        {
            path:"/dashboard/addItem",
            element:<PrivateRoute><AddItem></AddItem></PrivateRoute>
        },
        {
            path:"/dashboard/manageBooking",
            element:<PrivateRoute><ManageBookings></ManageBookings></PrivateRoute>
        },
        {
            path:"/dashboard/allUsers",
            element:<PrivateRoute><AllUser></AllUser></PrivateRoute>
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
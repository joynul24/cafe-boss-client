import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  // Auth ও Admin স্ট্যাটাস লোড হওয়া পর্যন্ত ওয়েট করবে
  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-[#D1A054]"></span>
      </div>
    );
  }

  // ইউজার যদি সাধারণ ইউজার হয় (লগইন করা আছে কিন্তু Admin নয়)
  if (user && !isAdmin) {
    return children;
  }

  // ইউজার যদি Admin হয়, তাকে সাথে সাথে Admin Home-এ নিয়ে যাবে
  if (user && isAdmin) {
    return <Navigate to="/dashboard/adminHome" replace />;
  }

  // লগইন না করা থাকলে Login পেজে রিডাইরেক্ট
  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default UserRoute;
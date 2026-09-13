import { NavLink, Outlet } from "react-router-dom";
import { 
  FaHome, 
  FaShoppingCart, 
  FaUsers, 
  FaUtensils, 
  FaList, 
  FaEnvelope, 
  FaSearch, 
  FaBars,
  FaTimes,
} from "react-icons/fa";
import useCartsData from "../hooks/useCartsData";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

function Dashboard() {
  const {user} = useAuth();
  const [cart] = useCartsData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle this boolean to switch between Admin and User dashboard views
  const isAdmin = false;

  // Close sidebar on link click (for mobile devices)
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
   <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 relative">
      
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden bg-[#D1A054] text-black p-4 flex justify-between items-center shadow-md sticky top-0 z-40">
        <div>
          <h1 className="text-xl font-black uppercase">Cafe Boss</h1>
          <p className="text-xs font-bold tracking-widest uppercase">Restaurant</p>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="text-2xl p-2 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Backdrop / Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={closeSidebar} 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
        ></div>
      )}

      {/* Navigation Sidebar Component */}
      <div 
        className={`fixed md:static top-0 left-0 h-full md:h-auto z-50 w-64 min-h-screen bg-[#D1A054] text-black p-6 font-semibold uppercase transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header (Desktop) */}
        <div className="hidden md:block mb-8 tracking-widest text-center">
          <h1 className="text-2xl font-black">Cafe Boss</h1>
          <p className="text-sm font-bold tracking-widest">R e s t a u r a n t</p>
        </div>

        {/* Dynamic Route Links */}
        <ul className="space-y-3 menu">
          {isAdmin ? (
            /* Admin Navigation Links */
            <>
              <li>
                <NavLink 
                  to="/dashboard/adminHome" 
                  onClick={closeSidebar}
                  className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#b58742]"
                >
                  <FaHome className="text-xl" /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/manageItems" 
                  onClick={closeSidebar}
                  className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#b58742]"
                >
                  <FaUtensils className="text-xl" /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/allUsers" 
                  onClick={closeSidebar}
                  className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#b58742]"
                >
                  <FaUsers className="text-xl" /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            /* User Navigation Links */
            <>
              <li>
                <NavLink 
                  to="/dashboard/userHome" 
                  onClick={closeSidebar}
                  className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#b58742]"
                >
                  <FaHome className="text-xl" /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/myCart" 
                  onClick={closeSidebar}
                  className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#b58742]"
                >
                  <FaShoppingCart className="text-xl" /> My Cart ({cart?.length || 0})
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/myBooking" 
                  onClick={closeSidebar}
                  className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#b58742]"
                >
                  <FaList className="text-xl" /> My Booking
                </NavLink>
              </li>
            </>
          )}

          {/* Sidebar Section Divider */}
          <div className="my-6 border-t border-black/30"></div>

          {/* Main Site Navigation */}
          <li>
            <NavLink 
              to="/" 
              onClick={closeSidebar}
              className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#b58742]"
            >
              <FaHome className="text-xl" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/menu" 
              onClick={closeSidebar}
              className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#b58742]"
            >
              <FaSearch className="text-xl" /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              onClick={closeSidebar}
              className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#b58742]"
            >
              <FaEnvelope className="text-xl" /> Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dynamic View Render Area */}
      <div className="flex-1 p-4 md:p-10 w-full overflow-x-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
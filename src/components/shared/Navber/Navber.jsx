import { NavLink } from "react-router-dom"
import "./Navber.css"
import useAuth from "../../../hooks/useAuth"
import { toast } from "react-toastify";

function Navber() {
  const {user, logOut} = useAuth();

  // Sign out
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged out successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        toast.error(error.message)
      });
  };

 const NavItems = (
  <>
    <li><NavLink to={"/"}>HOME</NavLink></li>
    <li><NavLink to={"/contact"}>CONTACT</NavLink></li>
    <li><NavLink to={"/menu"}>MENU</NavLink></li>
    <li><NavLink to={"/shop"}>SHOP</NavLink></li>

    {user ? (
      <>
        <li>
          <button onClick={handleLogOut} className="btn btn-ghost btn-sm">
            SIGN OUT
          </button>
        </li>
        {user?.photoURL && (
          <li className="flex justify-center items-center">
            <img
              src={user?.photoURL}
              alt="Profile"
              title={user?.displayName || "User"}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-amber-500"
            />
          </li>
        )}
      </>
    ) : (
      <li><NavLink to={"/auth/login"}>LOGIN</NavLink></li>
    )}
  </>
);

  return (
    <div className="container mx-auto fixed top-0 left-0 right-0 z-50 bg-black/20 text-white navbar">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black">
         {NavItems}
      </ul>
    </div>
     <div className="font-medium font-cinzel pl-10">
       <p>Cafe Boss</p>
       <p className="tracking-[0.3em]">Restaurant</p>
     </div>
  </div>
  <div className="navbar-center">
   
  </div>
  <div className="navbar-end  hidden lg:flex">
     <ul className="menu menu-horizontal px-1">
       {NavItems}
    </ul>
  </div>
</div>
  )
}

export default Navber
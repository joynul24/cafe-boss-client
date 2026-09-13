import { Outlet } from "react-router-dom"
import Footer from "../components/shared/Footer/Footer"
import Navber from "../components/shared/Navber/Navber"

function MainLayout() {
  return (
    <div className="container mx-auto">
        <Navber></Navber>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default MainLayout
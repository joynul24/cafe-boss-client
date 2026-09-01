import { Outlet } from "react-router-dom"
import Navber from "../components/shared/Navber/Navber"
import Footer from "../components/shared/Footer/Footer"

function Main() {
  return (
    <div className="container mx-auto">
        <Navber></Navber>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Main
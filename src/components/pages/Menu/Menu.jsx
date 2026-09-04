import SectionCover from "../../shared/SectionCover/SectionCover"
import banner1 from "../../../assets/menu/banner3.jpg"
import OfferdMenu from "./OfferdMenu/OfferdMenu"
import DessertsMenu from "./DessertsMenu/DessertsMenu"

function Menu() {
  return (
    <div>
        <SectionCover img={banner1} title="our menu" subTitle="Would you like to try a dish?"></SectionCover>
        <OfferdMenu></OfferdMenu>
        <DessertsMenu></DessertsMenu>
    </div>
  )
}

export default Menu
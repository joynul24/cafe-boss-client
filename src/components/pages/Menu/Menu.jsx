import SectionCover from "../../shared/SectionCover/SectionCover"
import banner1 from "../../../assets/menu/banner3.jpg"
import OfferdMenu from "./OfferdMenu/OfferdMenu"
import DessertsMenu from "./DessertsMenu/DessertsMenu"
import SaladMenu from "./SaladMenu/SaladMenu"
import useMenuData from "../../../hooks/useMenuData"
import PizzaMenu from "./PizzaMenu/PizzaMenu"
import SoupsMenu from "./SoupsMenu/SoupsMenu"
import { Helmet } from "react-helmet-async"

function Menu() {
  const [menu, loading] = useMenuData();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-bars loading-lg text-amber-500"></span>
      </div>
    );
  }

  const offeredMenu = menu.filter(item => item.category === "offered").slice(0, 6);
  const dessertsMenu = menu.filter(item => item.category === "dessert").slice(0, 6);
  const pizzaMenu = menu.filter(item => item.category === "pizza").slice(0, 6)
  const saladMenu = menu.filter(item => item.category === "salad").slice(0, 6);
  const soupMenu = menu.filter(item => item.category === "soup").slice(0, 6);
  // console.log(soupMenu)
  return (
    <div>
      <Helmet>
        <title>Cafe Boss | Menu</title>
      </Helmet>
      <SectionCover img={banner1} title="our menu" subTitle="Would you like to try a dish?"></SectionCover>
      <OfferdMenu items={offeredMenu}></OfferdMenu>
      <DessertsMenu items={dessertsMenu}></DessertsMenu>
      <PizzaMenu items={pizzaMenu}></PizzaMenu>
      <SaladMenu items={saladMenu}></SaladMenu>
      <SoupsMenu items={soupMenu}></SoupsMenu>
    </div>
  )
}

export default Menu
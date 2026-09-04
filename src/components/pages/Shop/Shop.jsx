import { Helmet } from "react-helmet-async"
import SectionCover from "../../shared/SectionCover/SectionCover"
import imgShop from "../../../assets/shop/banner2.jpg"

function Shop() {
  return (
    <div>
        <Helmet>
         <title>Cafe Boss | Shop</title>
       </Helmet>
       <SectionCover img={imgShop} title="our shop" subTitle="Would you like to try a dish?"></SectionCover>
    </div>
  )
}

export default Shop
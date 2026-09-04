import { Helmet } from "react-helmet-async"
import Banner from "./Banner/Banner"
import BistroBoss from "./BistroBoss/BistroBoss"
import CallUsBanner from "./CallUsBanner/CallUsBanner"
import ChefRecommends from "./ChefRecommends/ChefRecommends"
import DisplayFoodSlider from "./DisplayFoodSlider/DisplayFoodSlider"
import Featured from "./Featured/Featured"
import FoodMenu from "./FoodMenu/FoodMenu"
import Testimonials from "./Testimonials/Testimonials"

function Home() {
  return (
    <div>
       <Helmet>
         <title>Cafe Boss | Home</title>
       </Helmet>
        <Banner></Banner>,
        <DisplayFoodSlider></DisplayFoodSlider>
        <BistroBoss></BistroBoss>
        <FoodMenu></FoodMenu>
        <CallUsBanner></CallUsBanner>
        <ChefRecommends></ChefRecommends>
        <Featured></Featured>
        <Testimonials></Testimonials>
    </div>
  )
}

export default Home
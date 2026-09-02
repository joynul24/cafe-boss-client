import Banner from "./Banner/Banner"
import BistroBoss from "./BistroBoss/BistroBoss"
import CallUsBanner from "./CallUsBanner/CallUsBanner"
import ChefRecommends from "./ChefRecommends/ChefRecommends"
import DisplayFoodSlider from "./DisplayFoodSlider/DisplayFoodSlider"
import FoodMenu from "./FoodMenu/FoodMenu"

function Home() {
  return (
    <div>
        <Banner></Banner>,
        <DisplayFoodSlider></DisplayFoodSlider>
        <BistroBoss></BistroBoss>
        <FoodMenu></FoodMenu>
        <CallUsBanner></CallUsBanner>
        <ChefRecommends></ChefRecommends>
    </div>
  )
}

export default Home
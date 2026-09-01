import Banner from "./Banner/Banner"
import BistroBoss from "./BistroBoss/BistroBoss"
import DisplayFoodSlider from "./DisplayFoodSlider/DisplayFoodSlider"

function Home() {
  return (
    <div>
        <Banner></Banner>,
        <DisplayFoodSlider></DisplayFoodSlider>
        <BistroBoss></BistroBoss>
    </div>
  )
}

export default Home
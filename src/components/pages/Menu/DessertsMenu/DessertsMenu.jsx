import SectionCover from "../../../shared/SectionCover/SectionCover"
import imgDessert from "../../../../assets/menu/dessert-bg.jpeg";
import MenuFoodCard from "../../../shared/MenuFoodCard/MenuFoodCard";
import { Link } from "react-router-dom";

function DessertsMenu({items}) {


  return (
    <div>
        <SectionCover img={imgDessert} title="DESSERTS" subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." ></SectionCover>
        {/* Display Desserts Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         {
            items.map(data => <MenuFoodCard key={data._id} item={data}></MenuFoodCard>)
         }
        </div>
        {/* Button */}
        <div className="flex justify-center my-10">
            <Link to={`/shop/dessert`} className="btn btn-outline border-0 border-b-4 border-slate-900 bg-transparent text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 uppercase mt-4 transition-all duration-300">ORDER YOUR FAVOURITE FOOD</Link>
        </div>
    </div>
  )
}

export default DessertsMenu
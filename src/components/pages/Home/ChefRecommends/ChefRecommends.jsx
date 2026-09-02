import useMenuData from "../../../../hooks/useMenuData";
import FoodCard from "../../../shared/FoodCard/FoodCard";
import SectionTitle from "../../../shared/SectionTitle/SectionTitle";

export default function ChefRecommends() {
    const [menu, loading] = useMenuData()

    if(loading){
       <div className="flex justify-center">
         <span className="loading loading-bars loading-lg"></span>
       </div>
    }

    const saladItem = menu.filter(item => item.category === "salad")[0]
    const popularItem = menu.filter(item => item.category === "popular")[0]
    const dessertsItem = menu.filter(item => item.category === "dessert")[0]
  
    const recommendedItems = [saladItem, popularItem, dessertsItem].filter(Boolean);
    console.log(recommendedItems)
  return (
    <div className="my-20">
      <SectionTitle title="CHEF RECOMMENDS" subTitle="---Should Try---"></SectionTitle>
      {/* Display 3 Category Food Cards */}
      <div className="grid grid-cols-1
       md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
        {
          recommendedItems.map(item=> <FoodCard key={item._id} item={item}></FoodCard>)
        }
      </div>
    </div>
  )
}

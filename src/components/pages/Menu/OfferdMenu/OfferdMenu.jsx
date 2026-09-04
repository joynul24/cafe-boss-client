import MenuFoodCard from "../../../shared/MenuFoodCard/MenuFoodCard";
import SectionTitle from "../../../shared/SectionTitle/SectionTitle"

function OfferdMenu({items}) {

  return (
    <div className="my-20">
      <SectionTitle title="Today's Offer" subTitle="---Don't miss---"></SectionTitle>
      {/* Display Offred Menu data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {
          items.map(data => <MenuFoodCard key={data._id} item={data}></MenuFoodCard>)
        }
      </div>
      <div className="flex justify-center my-10">
        <button className="btn btn-outline border-0 border-b-4 border-slate-900 bg-transparent text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 uppercase mt-4 transition-all duration-300">ORDER YOUR FAVOURITE FOOD</button>
      </div>
    </div>
  )
}

export default OfferdMenu
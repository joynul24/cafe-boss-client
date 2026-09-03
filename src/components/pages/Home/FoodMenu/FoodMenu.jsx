import { useEffect, useState } from "react"
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import SectionTitle from "../../../shared/SectionTitle/SectionTitle";
import MenuFoodCard from "../../../shared/MenuFoodCard/MenuFoodCard";
import { toast } from "react-toastify";

function FoodMenu() {
    const [menu, setMenu] = useState([]);
    const axiosPublic = useAxiosPublic();
    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        axiosPublic.get("/menu")
            .then(res => setMenu(res.data))
            .catch(err => {
                toast.error(err?.response?.data?.message || "Failed to load menu data!");
            })
    }, [axiosPublic])

    // Slice the array to show 6 items by default, or all items when showAll is true
    const displayMenu = showAll ? menu : menu.slice(0, 6);

    return (
        <div className="my-20">
            <SectionTitle subTitle="---Check it out---" title="FROM OUR MENU"></SectionTitle>
            {/* menus data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/*Map over displayedMenu instead of menu */}
                {
                    displayMenu.map(item => <MenuFoodCard key={item._id} item={item}></MenuFoodCard>)
                }
            </div>
            {/*Show the button only when there are more than 6 items and showAll is false */}
            {
                !showAll && menu.length > 6 && (
                    <div className="flex justify-center my-10">
                        <button onClick={()=> setShowAll(true)} className="btn btn-outline border-0 border-b-4 border-slate-900 bg-transparent text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 uppercase mt-4 transition-all duration-300">VIEW FULL MENU</button>
                    </div>
                )
            }
        </div>
    )
}

export default FoodMenu
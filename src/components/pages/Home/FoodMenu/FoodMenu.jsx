import { useEffect, useState } from "react"
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import SectionTitle from "../../../shared/SectionTitle/SectionTitle";
import MenuFoodCard from "../../../shared/MenuFoodCard/MenuFoodCard";

function FoodMenu() {
    const [menu, setMenu] = useState([]);
    const axiosPublic = useAxiosPublic();
    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        axiosPublic.get("/menu")
            .then(res => setMenu(res.data))
            .catch(err => console.log(err))
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
                        <button onClick={()=> setShowAll(true)} className="btn btn-outline">VIEW FULL MENU</button>
                    </div>
                )
            }
        </div>
    )
}

export default FoodMenu
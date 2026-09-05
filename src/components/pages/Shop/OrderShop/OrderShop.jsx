import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // Your shop card component
import useMenuData from "../../../../hooks/useMenuData";
import FoodCard from "../../../shared/FoodCard/FoodCard";
import { Helmet } from "react-helmet-async";
import SectionCover from "../../../shared/SectionCover/SectionCover";
import imgShop from "../../../../assets/shop/banner2.jpg"

function OrderShop() {
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  const { category } = useParams();
  
  // Find initial tab index based on URL parameter (defaulting to 0 if undefined)
  const initialIndex = categories.indexOf(category?.toLowerCase());
  const [tabIndex, setTabIndex] = useState(initialIndex !== -1 ? initialIndex : 0);

  const [menu, loading] = useMenuData();
  const navigate = useNavigate();

  // Filter items by category
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const soup = menu.filter((item) => item.category === "soup");
  const dessert = menu.filter((item) => item.category === "dessert");
  const drinks = menu.filter((item) => item.category === "drinks");

  // Handle tab click & update URL dynamically
  const handleSelect = (index) => {
    setTabIndex(index);
    navigate(`/shop/${categories[index]}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-bars loading-lg text-amber-500"></span>
      </div>
    );
  }

  return (
    <div className="mb-12">
        <Helmet>
        <title>Cafe Boss | Shop</title>
       </Helmet>
       <SectionCover img={imgShop} title="order food" subTitle="Would you like to try a dish?"></SectionCover>
      <Tabs selectedIndex={tabIndex} onSelect={handleSelect}>
        {/* Tab Headers */}
        <TabList className="flex justify-center items-center gap-6 border-none mt-10 mb-10 text-lg font-bold uppercase cursor-pointer">
          <Tab selectedClassName="border-b-4 border-amber-500 text-amber-500 outline-none pb-1">Salad</Tab>
          <Tab selectedClassName="border-b-4 border-amber-500 text-amber-500 outline-none pb-1">Pizza</Tab>
          <Tab selectedClassName="border-b-4 border-amber-500 text-amber-500 outline-none pb-1">Soups</Tab>
          <Tab selectedClassName="border-b-4 border-amber-500 text-amber-500 outline-none pb-1">Desserts</Tab>
          <Tab selectedClassName="border-b-4 border-amber-500 text-amber-500 outline-none pb-1">Drinks</Tab>
        </TabList>

        {/* Tab Panels */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {salad.map((item) => <FoodCard key={item._id} item={item} />)}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pizza.map((item) => <FoodCard key={item._id} item={item} />)}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {soup.map((item) => <FoodCard key={item._id} item={item} />)}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dessert.map((item) => <FoodCard key={item._id} item={item} />)}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drinks.map((item) => <FoodCard key={item._id} item={item} />)}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default OrderShop;
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import useCartsData from "../../../hooks/useCartsData";

function FoodCard({ item }) {
  const { image, name, recipe, _id, price } = item || {};
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosPublic();
  const location = useLocation();
  const [, refetch] = useCartsData()

  const handleAddToCard = () => {
    if (user && user.email) {
      const cartItem = {
        menuId : _id,
        email: user.email,
        name,
        image,
        price,
      }
      axiosSecure.post("/carts", cartItem)
      .then((res) => {
        if(res.data.insertedId){
          toast.success(`${name} added to your cart`);
          refetch();
        }
      })
    } else {
      Swal.fire({
        title: "You are not logged In?",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login"
      }).then(() => {
         navigate("/auth/login", {state: {from: location}})
      });
    }
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={image}
          alt={name}
          className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button onClick={handleAddToCard} className="btn btn-outline border-0 border-b-4 border-[#BB8506] bg-[#E8E8E8] text-[#BB8506] hover:bg-[#111827] hover:border-[#111827] hover:text-[#BB8506] uppercase rounded-lg px-6 transition-all duration-300">Add to card</button>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
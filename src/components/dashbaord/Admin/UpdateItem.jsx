import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// ImageBB API Key
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

function UpdateItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic.get(`/menu/${id}`)
      .then(res => {
        setItem(res.data);
        reset(res.data); 
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, axiosPublic, reset]);
  
const onSubmit = async (data) => {
  try {
    let imageURL = item?.image;

    if (data.image && data.image.length > 0 && data.image[0]?.name) {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (res.data.success) {
        imageURL = res.data.data.display_url;
      }
    }

    const menuItem = {
      name: data.name,
      category: data.category,
      price: parseFloat(data.price),
      recipe: data.recipe,
      image: imageURL,
    };

    const menuRes = await axiosSecure.patch(`/menu/${id}`, menuItem);

    if (menuRes.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.name} updated successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/manageItems");
    } else {
      Swal.fire({
        icon: "info",
        title: "No changes made",
        text: "You didn't change any field!",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text: error?.response?.data?.error?.message || error?.message || "Something went wrong!",
    });
  }
};

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-md shadow-sm my-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 uppercase">
        Update Item
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Item Name */}
        <div>
          <label className="label font-semibold">Recipe Name*</label>
          <input
            type="text"
            defaultValue={item?.name}
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Category & Price */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="label font-semibold">Category*</label>
            <select
              defaultValue={item?.category}
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="dessert">Dessert</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>

          <div className="w-1/2">
            <label className="label font-semibold">Price*</label>
            <input
              type="number"
              step="any"
              defaultValue={item?.price}
              {...register("price", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Recipe Details */}
        <div>
          <label className="label font-semibold">Recipe Details*</label>
          <textarea
            defaultValue={item?.recipe}
            {...register("recipe", { required: true })}
            className="textarea textarea-bordered w-full h-28"
          ></textarea>
        </div>

        {/* Image File Input */}
        <div>
          <label className="label font-semibold">Change Image (Optional)</label>
          <input
            type="file"
            {...register("image")}
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>

        <button
          type="submit"
          className="btn bg-[#D1A054] hover:bg-[#b58742] text-white w-full mt-4"
        >
          Update Recipe Item
        </button>
      </form>
    </div>
  );
}

export default UpdateItem;
import { useForm } from "react-hook-form";
import SectionTitle from "../../shared/SectionTitle/SectionTitle"
import { Utensils } from "lucide-react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

// ImgBB API Key ও URL
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

function AddItem() {
 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price), 
        recipe: data.recipe,
        image: res.data.data.display_url,
      };

      const menuRes = await axiosSecure.post("/menu", menuItem);
      
      if (menuRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the menu!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
       <SectionTitle title="add an item" subTitle="---What's New---"></SectionTitle>
       {/* Form Seciton */}
       <div className="w-full max-w-4xl mx-auto my-6 sm:my-10 p-4 sm:p-8 md:p-12 bg-[#F3F3F3] rounded-sm shadow-sm font-sans">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        {/* Recipe Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
            Recipe name*
          </label>
          <input
            type="text"
            placeholder="Recipe name"
            {...register("name", { required: "Recipe name is required" })}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#D1A054] text-gray-700 text-sm sm:text-base"
          />
          {errors.name && (
            <span className="text-red-500 text-xs sm:text-sm mt-1 block">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Category & Price Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              Category*
            </label>
            <select
              defaultValue=""
              {...register("category", { required: "Category is required" })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#D1A054] text-gray-500 text-sm sm:text-base"
            >
              <option value="" disabled>
                Category
              </option>
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="dessert">Dessert</option>
              <option value="drinks">Drinks</option>
            </select>
            {errors.category && (
              <span className="text-red-500 text-xs sm:text-sm mt-1 block">
                {errors.category.message}
              </span>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              Price*
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              {...register("price", { required: "Price is required" })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#D1A054] text-gray-700 text-sm sm:text-base"
            />
            {errors.price && (
              <span className="text-red-500 text-xs sm:text-sm mt-1 block">
                {errors.price.message}
              </span>
            )}
          </div>
        </div>

        {/* Recipe Details */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
            Recipe Details*
          </label>
          <textarea
            rows="4"
            placeholder="Recipe Details"
            {...register("recipe", { required: "Recipe details are required" })}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#D1A054] text-gray-700 resize-none text-sm sm:text-base"
          ></textarea>
          {errors.recipe && (
            <span className="text-red-500 text-xs sm:text-sm mt-1 block">
              {errors.recipe.message}
            </span>
          )}
        </div>

        {/* Image File Input */}
        <div>
          <input
            type="file"
            {...register("image", { required: "Image file is required" })}
            className="file-input file-input-bordered w-full max-w-full sm:max-w-xs bg-gray-200 text-gray-700 rounded-none border-none text-xs sm:text-sm"
          />
          {errors.image && (
            <span className="text-red-500 text-xs sm:text-sm mt-1 block">
              {errors.image.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#835D23] to-[#B58130] hover:opacity-90 text-white font-semibold rounded-none transition-all duration-200 cursor-pointer shadow-md text-sm sm:text-base"
          >
            Add Item <Utensils className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default AddItem
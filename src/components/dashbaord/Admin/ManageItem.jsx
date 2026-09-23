import { Trash2, SquarePen } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMenu from "../../../hooks/useMenuData";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

function ManageItem() {
  const [menu, loading, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete "${item.name}"!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D1A054",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/menu/${item._id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${item.name} has been deleted.`,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error?.response?.data?.message || "Failed to delete item.",
            icon: "error",
          });
        }
      }
    });
  };


  const handleUpdateItem = (id)=> {
    console.log(id)
  }


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-[#D1A054]"></span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto my-2 sm:my-6 p-4 sm:p-8 bg-white rounded-sm shadow-sm font-sans">
      <SectionTitle title="Manage all items" subTitle="---Hurry Up---"></SectionTitle>
  {/* Header Section */}
  <div className="mb-4 sm:mb-8">
    <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold uppercase text-gray-800 tracking-wide">
      Total Items: {menu.length}
    </h2>
  </div>

  {/* 1. MOBILE VIEW (Card Layout - Hidden on Desktop) */}
  <div className="block md:hidden space-y-3">
    {menu.map((item, index) => (
      <div
        key={item._id || index}
        className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between gap-3 shadow-sm"
      >
        {/* Left Side: Serial, Image, Name & Price */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-bold text-gray-500 text-sm">#{index + 1}</span>
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 rounded-md object-cover flex-shrink-0 border border-gray-200"
          />
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-800 text-sm truncate">
              {item.name}
            </h3>
            <p className="text-xs font-bold text-[#D1A054]">${item.price}</p>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link to={`/dashboard/updateItem/${item._id}`}>
          <button
            className="p-2 bg-[#D1A054] hover:bg-[#b58742] text-white rounded-md transition-all shadow-sm active:scale-95"
            title="Edit Item"
          >
            <SquarePen className="w-4 h-4" />
          </button>
          </Link>
          <button
            onClick={() => handleDeleteItem(item)}
            className="p-2 bg-red-700 hover:bg-red-800 text-white rounded-md transition-all shadow-sm active:scale-95"
            title="Delete Item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* 2. DESKTOP & TABLET VIEW (Table Layout - Hidden on Mobile) */}
  <div className="hidden md:block overflow-x-auto w-full">
    <table className="table w-full border-collapse">
      {/* Table Head */}
      <thead>
        <tr className="bg-[#D1A054] text-white text-xs sm:text-sm uppercase font-semibold">
          <th className="py-4 px-3 sm:px-4 text-center rounded-tl-lg">#</th>
          <th className="py-4 px-3 sm:px-4 text-center">Item Image</th>
          <th className="py-4 px-3 sm:px-4 text-left">Item Name</th>
          <th className="py-4 px-3 sm:px-4 text-center">Price</th>
          <th className="py-4 px-3 sm:px-4 text-center">Action</th>
          <th className="py-4 px-3 sm:px-4 text-center rounded-tr-lg">Action</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody className="divide-y divide-gray-100 text-sm sm:text-base text-gray-700">
        {menu.map((item, index) => (
          <tr key={item._id || index} className="hover:bg-gray-50 transition-colors">
            <td className="py-3 px-3 sm:px-4 text-center font-bold text-gray-800">
              {index + 1}
            </td>
            <td className="py-3 px-3 sm:px-4 text-center">
              <div className="avatar flex justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden bg-gray-200 border border-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </td>
            <td className="py-3 px-3 sm:px-4 font-medium text-gray-700">
              {item.name}
            </td>
            <td className="py-3 px-3 sm:px-4 text-center font-semibold text-gray-600">
              ${item.price}
            </td>
            <td className="py-3 px-3 sm:px-4 text-center">
          <Link to={`/dashboard/updateItem/${item._id}`}>
          <button
            className="p-2 bg-[#D1A054] hover:bg-[#b58742] text-white rounded-md transition-all shadow-sm active:scale-95"
            title="Edit Item"
          >
            <SquarePen className="w-4 h-4" />
          </button>
          </Link>
            </td>
            <td className="py-3 px-3 sm:px-4 text-center">
              <button
                onClick={() => handleDeleteItem(item)}
                className="p-2.5 bg-red-700 hover:bg-red-800 text-white rounded-md transition-all shadow-sm active:scale-95 inline-flex items-center justify-center"
                title="Delete Item"
              >
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
}

export default ManageItem;
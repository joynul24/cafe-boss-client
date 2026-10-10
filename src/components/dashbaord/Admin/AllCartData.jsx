import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

function AllCartData() {
  const axiosSecure = useAxiosSecure();

  // Fetch all cart data for Admin
  const { data: carts = [], refetch, isLoading } = useQuery({
    queryKey: ["all-carts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/carts");
      return res.data;
    },
  });

  // Calculate Total Price
  const totalPrice = carts.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

  // Delete Cart Item Handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B91C1C",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/carts/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Cart item has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error?.response?.data?.message || "Failed to delete item!",
          });
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-[#D1A054]"></span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-10 bg-[#F6F6F6] min-h-screen">
      <Helmet>
        <title>Cafe Boss | All Carts</title>
      </Helmet>
      {/* Page Title Header */}
      <div className="text-center mb-8">
        <h3 className="text-sm sm:text-base font-serif tracking-widest text-[#D1A054] uppercase">
          --- My Cart Items ---
        </h3>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold uppercase tracking-wider text-gray-800 mt-1 border-y-2 border-gray-300 py-3 inline-block px-6">
          ALL CARTS DATA
        </h1>
      </div>

      {/* Main Content Card */}
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm border border-gray-100">

        {/* Top Info Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 pb-4 border-b">
          <h2 className="text-lg sm:text-2xl font-bold uppercase text-gray-800">
            Total Items: <span className="text-[#D1A054]">{carts.length}</span>
          </h2>
          <h2 className="text-lg sm:text-2xl font-bold uppercase text-gray-800">
            Total Price: <span className="text-emerald-600">${totalPrice.toFixed(2)}</span>
          </h2>
        </div>

        {/* Desktop View: Table Format */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead>
              <tr className="bg-[#D1A054] text-white uppercase text-xs sm:text-sm border-none">
                <th className="py-4 rounded-tl-lg">#</th>
                <th className="py-4">Item Image</th>
                <th className="py-4">Item Name</th>
                <th className="py-4">User Email</th>
                <th className="py-4">Price</th>
                <th className="py-4 text-center rounded-tr-lg">Action</th>
              </tr>
            </thead>

            <tbody>
              {carts.length > 0 ? (
                carts.map((item, index) => (
                  <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="font-bold text-gray-600">{index + 1}</td>
                    <td>
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="font-semibold text-gray-800">{item.name}</td>
                    <td className="text-gray-600 text-sm">{item.email}</td>
                    <td className="font-bold text-gray-900">${parseFloat(item.price).toFixed(2)}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        title="Delete Item"
                        className="btn btn-sm bg-[#B91C1C] hover:bg-red-800 text-white border-none p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500 font-medium">
                    No cart items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Fully Responsive Card Format */}
        <div className="block md:hidden space-y-4">
          {carts.length > 0 ? (
            carts.map((item, index) => (
              <div
                key={item._id}
                className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-400 text-sm">#{index + 1}</span>
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-200 flex-shrink-0 border">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500 break-all">{item.email}</p>
                    <p className="text-sm font-bold text-[#D1A054]">
                      ${parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-sm bg-[#B91C1C] hover:bg-red-800 text-white border-none p-2 flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 font-medium bg-gray-50 rounded-lg">
              No cart items found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default AllCartData;
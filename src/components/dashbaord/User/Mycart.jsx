import Swal from "sweetalert2";
import useCartsData from "../../../hooks/useCartsData";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

function Mycart() {
  const [cart, refetch] = useCartsData();
  const axiosSecure = useAxiosPublic();

  // Calculate total cart price dynamically
  const totalPrice = cart?.reduce((total, item) => total + (item.price || 0), 0) || 0;

  // Placeholder handler for item deletion
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              // Refresh cart data automatically after delete
              if (refetch) refetch();

              Swal.fire({
                title: "Deleted!",
                text: "Your item has been removed from the cart.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the item. Please try again.",
              icon: "error"
            });
          });
      }
    });
  };

  return (
    <div className="w-full">
      {/* Page Title Section */}
      <SectionTitle title="WANNA ADD MORE?" subTitle="---My Cart---" />

      {/* Main Table Container Card */}
      <div className="bg-white p-4 md:p-10 rounded-lg shadow-sm mt-8 max-w-5xl mx-auto">
        
        {/* Top Summary Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 font-cinzel">
          <h2 className="text-xl md:text-2xl font-bold uppercase text-gray-800">
            Total Orders: {cart?.length || 0}
          </h2>
          <h2 className="text-xl md:text-2xl font-bold uppercase text-gray-800">
            Total Price: ${totalPrice.toFixed(2)}
          </h2>
          <button 
            disabled={!cart?.length}
            className="bg-[#D1A054] hover:bg-[#b58742] text-white px-5 py-2 rounded-md font-semibold text-sm uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Pay
          </button>
        </div>

        {/* Responsive Table Area */}
        <div className="overflow-x-auto rounded-t-xl">
          <table className="table w-full text-left border-collapse">
            
            {/* Table Header */}
            <thead>
              <tr className="bg-[#D1A054] text-white uppercase text-sm md:text-base font-semibold">
                <th className="py-4 px-4 text-center">#</th>
                <th className="py-4 px-4">Item Image</th>
                <th className="py-4 px-4">Item Name</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4 text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {cart && cart.length > 0 ? (
                cart.map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-gray-50 transition-colors">
                    {/* Index Number */}
                    <td className="py-4 px-4 font-bold text-center">
                      {index + 1}
                    </td>

                    {/* Item Image */}
                    <td className="py-4 px-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 md:w-16 md:h-16 bg-gray-200">
                          <img 
                            src={item.image || "https://via.placeholder.com/64"} 
                            alt={item.name} 
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </td>

                    {/* Item Name */}
                    <td className="py-4 px-4 font-medium text-gray-800">
                      {item.name}
                    </td>

                    {/* Item Price */}
                    <td className="py-4 px-4 font-semibold text-gray-600">
                      ${item.price?.toFixed(2)}
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-4 text-center">
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-700 hover:bg-red-800 text-white p-3 rounded-md transition-colors inline-flex items-center justify-center"
                        aria-label="Delete item"
                      >
                        <FaTrashAlt className="text-base" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                /* Empty Cart State */
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500 font-semibold">
                    Your cart is currently empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Mycart;
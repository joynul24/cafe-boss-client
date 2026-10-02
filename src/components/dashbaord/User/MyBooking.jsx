import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useCartsData from "../../../hooks/useCartsData";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

function MyBooking() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [cart = []] = useCartsData();

  // Fetch logged-in user's bookings using query
  const { data: bookings = [], refetch, isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reservations/${user?.email}`);
      return res.data;
    },
  });

  // Helper function to get matched price from cart array or booking item
  const getItemDetails = (bookingItem, index) => {
    const matchedCartItem = cart.find(
      (c) => c._id === bookingItem.cartId || c.menuId === bookingItem.menuId
    );
    const itemPrice = bookingItem.price || matchedCartItem?.price || cart[index]?.price || 0;

    return { itemPrice };
  };

  // Calculate Total Price
  const totalPrice = bookings.reduce((sum, item, index) => {
    const { itemPrice } = getItemDetails(item, index);
    return sum + (parseFloat(itemPrice) || 0);
  }, 0);

  // Delete Booking Handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/reservations/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your booking has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error?.response?.data?.message || "Failed to delete booking!",
          });
        }
      }
    });
  };

  if (isLoading) {
    return <div className="text-center py-20 text-lg font-semibold">Loading bookings...</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 bg-[#F6F6F6] min-h-screen">
      
      {/* Section Header */}
      <div className="text-center">
        <SectionTitle title="MY BOOKINGS" subTitle="--- Excellent Ambience ---"></SectionTitle>
      </div>

      {/* Main Content Box */}
      <div className="bg-white p-4 sm:p-8 rounded-md shadow-sm">
        
        {/* Top Info Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-bold uppercase text-gray-800">
            Total Bookings: {bookings.length}
          </h3>
          <h3 className="text-xl sm:text-2xl font-bold uppercase text-gray-800">
            Total Price: ${totalPrice.toFixed(2)}
          </h3>
          <Link to={`/dashboard/payment`}>
            <button 
              disabled={bookings.length === 0}
              className="btn bg-[#D1A054] hover:bg-[#b58130] text-white px-6 border-none disabled:bg-gray-300"
            >
              PAY
            </button>
          </Link>
        </div>

        {/* Desktop View: Table Format */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#D1A054] text-white uppercase text-sm border-none">
                <th className="py-4 rounded-tl-lg">#</th>
                <th className="py-4">Guest Number</th>
                <th className="py-4">Date</th>
                <th className="py-4">Price</th>
                <th className="py-4">Status</th>
                <th className="py-4 rounded-tr-lg">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((bookingItem, index) => {
                  const { itemPrice } = getItemDetails(bookingItem, index);
                  const isDone = bookingItem.status?.toLowerCase() === 'done';

                  return (
                    <tr key={bookingItem._id} className="border-b border-gray-100 text-gray-700">
                      <td className="font-bold">{index + 1}</td>
                      <td>{bookingItem.guest || "4 guest"}</td>
                      <td className="text-gray-600 font-medium">{bookingItem.date || "N/A"}</td>
                      <td className="font-bold">${parseFloat(itemPrice).toFixed(2)}</td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                          isDone 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {bookingItem.status || 'pending'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(bookingItem._id)}
                          className="btn btn-sm bg-[#B91C1C] hover:bg-red-800 text-white border-none p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Card Format */}
        <div className="block md:hidden space-y-4">
          {bookings.length > 0 ? (
            bookings.map((item, index) => {
              const { itemPrice } = getItemDetails(item, index);
              const isDone = item.status?.toLowerCase() === 'done';

              return (
                <div 
                  key={item._id} 
                  className="border border-gray-200 p-4 rounded-lg flex items-center justify-between gap-4 bg-gray-50 shadow-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-500">#{index + 1}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        isDone 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status || 'pending'}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600">
                      Guests: <span className="font-semibold">{item.guest || "4 guest"}</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Date: <span className="font-semibold">{item.date || "N/A"}</span>
                    </p>
                    <p className="text-sm font-bold text-[#D1A054]">
                      ${parseFloat(itemPrice).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-sm bg-[#B91C1C] hover:bg-red-800 text-white border-none p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500">
              No bookings found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default MyBooking;
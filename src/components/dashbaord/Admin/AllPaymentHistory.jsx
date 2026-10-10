import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

function AllPaymentHistory() {
  const axiosSecure = useAxiosSecure();

  // Fetch all payment history for Admin
  const { data: payments = [], refetch, isLoading } = useQuery({
    queryKey: ["all-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  // Calculate Total Revenue
  const totalRevenue = payments.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

  // Delete Payment Record Handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this payment record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B91C1C",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/payments/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Payment history has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error?.response?.data?.message || "Failed to delete payment record!",
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
        <title>Cafe Boss | All Payments</title>
      </Helmet>
      {/* Page Title Header */}
      <div className="text-center mb-8">
        <h3 className="text-sm sm:text-base font-serif tracking-widest text-[#D1A054] uppercase">
          --- At a Glance ---
        </h3>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold uppercase tracking-wider text-gray-800 mt-1 border-y-2 border-gray-300 py-3 inline-block px-6">
          ALL PAYMENTS HISTORY
        </h1>
      </div>

      {/* Main Container */}
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm border border-gray-100">

        {/* Summary Info */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 pb-4 border-b">
          <h2 className="text-lg sm:text-2xl font-bold uppercase text-gray-800">
            Total Payments: <span className="text-[#D1A054]">{payments.length}</span>
          </h2>
          <h2 className="text-lg sm:text-2xl font-bold uppercase text-gray-800">
            Total Revenue: <span className="text-emerald-600">${totalRevenue.toFixed(2)}</span>
          </h2>
        </div>

        {/* Desktop View: Table Format */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead>
              <tr className="bg-[#D1A054] text-white uppercase text-xs sm:text-sm border-none">
                <th className="py-4 rounded-tl-lg">#</th>
                <th className="py-4">User Email</th>
                <th className="py-4">Transaction ID</th>
                <th className="py-4">Price</th>
                <th className="py-4">Payment Date</th>
                <th className="py-4 text-center rounded-tr-lg">Action</th>
              </tr>
            </thead>

            <tbody>
              {payments.length > 0 ? (
                payments.map((payment, index) => (
                  <tr key={payment._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="font-bold text-gray-600">{index + 1}</td>
                    <td className="text-gray-800 font-medium">{payment.email}</td>
                    <td className="font-mono text-xs text-blue-600 font-semibold">{payment.transactionId}</td>
                    <td className="font-bold text-gray-900">${parseFloat(payment.price).toFixed(2)}</td>
                    <td className="text-gray-500 text-sm">
                      {payment.date ? new Date(payment.date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleDelete(payment._id)}
                        title="Delete Record"
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
                    No payment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Fully Responsive Card Format */}
        <div className="block md:hidden space-y-4">
          {payments.length > 0 ? (
            payments.map((payment, index) => (
              <div
                key={payment._id}
                className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm space-y-3"
              >
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-bold text-gray-500 text-sm">#{index + 1}</span>
                  <span className="text-xs font-semibold text-gray-500">
                    {payment.date ? new Date(payment.date).toLocaleDateString() : "N/A"}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-gray-400 uppercase font-semibold">User Email</p>
                  <p className="text-sm font-medium text-gray-800 break-all">{payment.email}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Transaction ID</p>
                  <p className="font-mono text-xs text-blue-600 font-semibold break-all">{payment.transactionId}</p>
                </div>

                <div className="pt-2 flex justify-between items-center border-t">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Price</p>
                    <p className="text-base font-bold text-emerald-600">
                      ${parseFloat(payment.price).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(payment._id)}
                    className="btn btn-sm bg-[#B91C1C] hover:bg-red-800 text-white border-none p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 font-medium bg-gray-50 rounded-lg">
              No payment records found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default AllPaymentHistory;
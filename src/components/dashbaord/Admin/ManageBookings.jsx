import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all bookings for admin
  const { data: bookings = [], refetch, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reservations');
      return res.data;
    }
  });

  // Handle status change (Pending -> Done)
  const handleConfirmBooking = (booking) => {
    if (booking.status === 'done' || booking.status === 'Done') return;

    Swal.fire({
      title: 'Confirm Booking?',
      text: 'Are you sure you want to mark this booking as done?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Confirm!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/reservations/${booking._id}`, {
            status: 'done'
          });

          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Booking Status Updated!',
              showConfirmButton: false,
              timer: 1500
            });
          }
        } catch (error) {
          console.error('Failed to update booking status:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Could not update status. Please try again.'
          });
        }
      }
    });
  };


  // 2. Delete Booking Handler (Admin)
  const handleDeleteBooking = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this booking!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B91C1C',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/reservations/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Booking has been deleted.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error?.response?.data?.message || 'Failed to delete booking!'
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
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
      <Helmet>
        <title>Cafe Boss | Manage Booking</title>
      </Helmet>
      {/* Header Title */}
      <div className="text-center mb-8">
        <h3 className="text-xl sm:text-2xl font-serif tracking-widest text-gray-400 uppercase">
          --- At a Glance ---
        </h3>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold uppercase tracking-wider text-gray-800 mt-2 border-y-2 border-gray-200 py-3 inline-block px-8">
          MANAGE ALL BOOKINGS
        </h1>
      </div>

      {/* Container Box */}
      <div className="bg-[#F3F3F3] p-6 sm:p-10 rounded-lg shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-800">
            TOTAL ITEMS: <span className="text-[#D1A054]">{bookings.length}</span>
          </h2>
        </div>

        {/* Desktop & Tablet Table View */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="table w-full text-left border-collapse">
            <thead className="bg-[#D1A054] text-white text-xs sm:text-sm uppercase tracking-wider">
              <tr>
                <th className="py-4 px-4">USER EMAIL</th>
                <th className="py-4 px-4">PHONE NUMBER</th>
                <th className="py-4 px-4">BOOKING DATE</th>
                <th className="py-4 px-4">BOOKING TIME</th>
                <th className="py-4 px-4">ACTIVITY</th>
                <th className="py-4 px-4 text-center">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500 font-medium">
                    No bookings available right now.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => {
                  const isDone = booking.status?.toLowerCase() === 'done';
                  return (
                    <tr key={booking._id} className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                      <td className="py-4 px-4 text-gray-600 text-sm font-medium">
                        {booking.email}
                      </td>
                      <td className="py-4 px-4 text-gray-500 text-sm">
                        {booking.phone || 'N/A'}
                      </td>
                      <td className="py-4 px-4 text-gray-500 text-sm">
                        {booking.date}
                      </td>
                      <td className="py-4 px-4 text-gray-500 text-sm">
                        {booking.time}
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold">
                        <span className={isDone ? 'text-[#007A5A]' : 'text-[#D1A054]'}>
                          {isDone ? 'Done' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {/* Confirm Button */}
                          <button
                            onClick={() => handleConfirmBooking(booking)}
                            disabled={isDone}
                            title={isDone ? 'Booking Done' : 'Confirm Booking'}
                            className={`p-2 rounded-full transition-transform duration-200 ${isDone
                                ? 'bg-[#007A5A] text-white cursor-not-allowed opacity-90'
                                : 'bg-[#6EE7B7] hover:bg-[#34D399] text-white hover:scale-110'
                              }`}
                          >
                            <FaCheckCircle className="text-lg" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteBooking(booking._id)}
                            title="Delete Booking"
                            className="p-2.5 rounded-full bg-[#B91C1C] hover:bg-red-800 text-white transition-transform hover:scale-110"
                          >
                            <FaTrashAlt className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View (Card Format) */}
        <div className="block md:hidden space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500 font-medium bg-white rounded-lg p-4">
              No bookings available right now.
            </div>
          ) : (
            bookings.map((booking) => {
              const isDone = booking.status?.toLowerCase() === 'done';
              return (
                <div key={booking._id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-xs font-semibold text-gray-400">Activity</span>
                    <span className={`text-sm font-bold ${isDone ? 'text-[#007A5A]' : 'text-[#D1A054]'}`}>
                      {isDone ? 'Done' : 'Pending'}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">User Email</p>
                    <p className="text-sm font-medium text-gray-800 break-all">{booking.email}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-400">Phone</p>
                      <p className="text-xs text-gray-700 font-medium">{booking.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Date & Time</p>
                      <p className="text-xs text-gray-700 font-medium">{booking.date} | {booking.time}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center border-t">
                    <span className="text-xs text-gray-500">Actions</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleConfirmBooking(booking)}
                        disabled={isDone}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-white ${isDone ? 'bg-[#007A5A] opacity-90 cursor-not-allowed' : 'bg-[#34D399]'
                          }`}
                      >
                        <FaCheckCircle />
                        <span>{isDone ? 'Done' : 'Confirm'}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="p-2 rounded-full bg-[#B91C1C] text-white text-xs"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
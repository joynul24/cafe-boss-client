import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import useAllUsers from "../../../hooks/useAllUsers";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

function AllUser() {
  const [users, , refetch] = useAllUsers();
  const axiosPublic = useAxiosPublic();

  // Handle Role Change to Admin
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make ${user.name} an Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D1A054",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is now an Admin!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
  

  const handleDeleteUser = (user) => {
    // Handle User Delete
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete user!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been removed.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-full p-4 md:p-8">
      {/* Section Header */}
      <div className="font-cinzel">
        <SectionTitle title="MANAGE ALL USERS" subTitle="---How many??---" />
      </div>

      {/* Main Table Card */}
      <div className="bg-white p-6 md:p-10 rounded-lg shadow-md mt-8 max-w-5xl mx-auto">
        
        {/* Total Users Counter */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-serif font-bold uppercase text-gray-800">
            Total Users: {users.length}
          </h2>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto rounded-t-xl">
          <table className="table w-full text-left border-collapse">
            
            {/* Table Header */}
            <thead>
              <tr className="bg-[#D1A054] text-white uppercase text-xs md:text-sm font-semibold tracking-wider">
                <th className="py-4 px-4 text-center">#</th>
                <th className="py-4 px-4">Name</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4 text-center">Role</th>
                <th className="py-4 px-4 text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
              {users.map((user, index) => (
                <tr key={user._id || index} className="hover:bg-gray-50 transition-colors">
                  {/* Serial Number */}
                  <td className="py-4 px-4 font-bold text-center">
                    {index + 1}
                  </td>

                  {/* Name */}
                  <td className="py-4 px-4 font-medium text-gray-800">
                    {user.name}
                  </td>

                  {/* Email */}
                  <td className="py-4 px-4 text-gray-600">
                    {user.email}
                  </td>

                  {/* Role Button / Text */}
                  <td className="py-4 px-4 text-center">
                    {user.role === "admin" ? (
                      <span className="font-semibold text-[#D1A054]">Admin</span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="bg-[#D1A054] hover:bg-[#b58742] text-white p-2.5 rounded-md transition-colors inline-flex items-center justify-center"
                        title="Make Admin"
                      >
                        <FaUsers className="text-base" />
                      </button>
                    )}
                  </td>

                  {/* Delete Button */}
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="bg-red-800 hover:bg-red-900 text-white p-2.5 rounded-md transition-colors inline-flex items-center justify-center"
                      title="Delete User"
                    >
                      <FaTrashAlt className="text-base" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

export default AllUser;
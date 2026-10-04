import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Phone, MapPin, Clock, Utensils } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

function Reservation() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const reservationData = {
        date: data.date,
        time: data.time,
        guest: data.guest,
        name: data.name,
        phone: data.phone,
        email: data.email,
        status: "pending",
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/reservations", reservationData);

      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Table booked successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: error?.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 bg-white">
      <Helmet>
        <title>Cafe Boss | Reservation</title>
      </Helmet>
      {/* ---------- Section 1: Book A Table Form ---------- */}
      <div className="text-center mb-10">
        <SectionTitle title="Book a Table" subTitle="--- Reservation ---"></SectionTitle>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Row 1: Date, Time, Guest */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Date*</label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="input input-bordered w-full rounded-md focus:outline-none"
            />
            {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Time*</label>
            <input
              type="time"
              {...register("time", { required: "Time is required" })}
              className="input input-bordered w-full rounded-md focus:outline-none"
            />
            {errors.time && <span className="text-red-500 text-sm">{errors.time.message}</span>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Guest*</label>
            <select
              {...register("guest", { required: "Please select number of guests" })}
              className="select select-bordered w-full rounded-md focus:outline-none"
              defaultValue="1 Person"
            >
              <option value="1 Person">1 Person</option>
              <option value="2 Persons">2 Persons</option>
              <option value="3 Persons">3 Persons</option>
              <option value="4 Persons">4 Persons</option>
              <option value="5+ Persons">5+ Persons</option>
            </select>
            {errors.guest && <span className="text-red-500 text-sm">{errors.guest.message}</span>}
          </div>
        </div>

        {/* Row 2: Name, Phone, Email */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name*</label>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full rounded-md focus:outline-none"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone*</label>
            <input
              type="tel"
              placeholder="Phone Number"
              {...register("phone", { required: "Phone number is required" })}
              className="input input-bordered w-full rounded-md focus:outline-none"
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email*</label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              })}
              className="input input-bordered w-full rounded-md focus:outline-none"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="btn bg-gradient-to-r from-[#835D23] to-[#B58130] text-white hover:opacity-90 border-none rounded-none px-8 flex items-center gap-2 mx-auto"
          >
            Book A Table <Utensils className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* ---------- Section 2: Our Location ---------- */}
      <div className="text-center mt-20 mb-10">
        <p className="text-[#D1A054] italic text-sm font-medium">--- Visit Us ---</p>
        <h2 className="text-3xl font-normal uppercase my-2 border-y-4 border-[#E8E8E8] py-3 inline-block px-12">
          OUR LOCATION
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phone Card */}
        <div className="border border-[#E8E8E8]">
          <div className="bg-[#D1A054] p-4 flex justify-center text-white">
            <Phone className="w-6 h-6" />
          </div>
          <div className="bg-[#F3F3F3] mx-4 mb-4 p-8 text-center min-h-[140px] flex flex-col justify-center">
            <h4 className="font-bold uppercase text-gray-800 text-lg mb-2">PHONE</h4>
            <p className="text-gray-600 text-sm">+38 (012) 34 56 789</p>
          </div>
        </div>

        {/* Address Card */}
        <div className="border border-[#E8E8E8]">
          <div className="bg-[#D1A054] p-4 flex justify-center text-white">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="bg-[#F3F3F3] mx-4 mb-4 p-8 text-center min-h-[140px] flex flex-col justify-center">
            <h4 className="font-bold uppercase text-gray-800 text-lg mb-2">ADDRESS</h4>
            <p className="text-gray-600 text-sm">+38 (012) 34 56 789</p>
          </div>
        </div>

        {/* Working Hours Card */}
        <div className="border border-[#E8E8E8]">
          <div className="bg-[#D1A054] p-4 flex justify-center text-white">
            <Clock className="w-6 h-6" />
          </div>
          <div className="bg-[#F3F3F3] mx-4 mb-4 p-8 text-center min-h-[140px] flex flex-col justify-center">
            <h4 className="font-bold uppercase text-gray-800 text-lg mb-2">WORKING HOURS</h4>
            <p className="text-gray-600 text-sm">Mon - Fri: 08:00 - 22:00</p>
            <p className="text-gray-600 text-sm">Sat - Sun: 10:00 - 23:00</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Reservation;
import SectionCover from "../../shared/SectionCover/SectionCover"
import imgContact from "../../../assets/contact/banner.jpg"
import { FaClock, FaMapMarkerAlt, FaPaperPlane, FaPhoneAlt } from "react-icons/fa";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";

function ContactUs() {
    
 const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
  };

  return (
    <div>
        <SectionCover img={imgContact} title="contact us" subTitle="Would you like to try a dish?"></SectionCover>
        {/* Contact Cards */}
        <div className="mt-10">
            <SectionTitle title="our location" subTitle="Visit Us"></SectionTitle>
        <div className="max-w-6xl mx-auto px-4 my-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Phone */}
        <div className="border border-gray-200 rounded-xs overflow-hidden">
          <div className="bg-[#D1A054] py-4 flex justify-center items-center">
            <FaPhoneAlt className="text-white text-lg" />
          </div>
          <div className="bg-[#F3F3F3] mx-4 mb-4 py-8 px-4 text-center">
            <h3 className="font-bold text-gray-800 text-lg uppercase tracking-wider mb-2">
              PHONE
            </h3>
            <p className="text-xs text-gray-600">+38 (012) 34 56 789</p>
          </div>
        </div>

        {/* Card 2: Address */}
        <div className="border border-gray-200 rounded-xs overflow-hidden">
          <div className="bg-[#D1A054] py-4 flex justify-center items-center">
            <FaMapMarkerAlt className="text-white text-xl" />
          </div>
          <div className="bg-[#F3F3F3] mx-4 mb-4 py-8 px-4 text-center">
            <h3 className="font-bold text-gray-800 text-lg uppercase tracking-wider mb-2">
              ADDRESS
            </h3>
            <p className="text-xs text-gray-600">+38 (012) 34 56 789</p>
          </div>
        </div>

        {/* Card 3: Working Hours */}
        <div className="border border-gray-200 rounded-xs overflow-hidden">
          <div className="bg-[#D1A054] py-4 flex justify-center items-center">
            <FaClock className="text-white text-xl" />
          </div>
          <div className="bg-[#F3F3F3] mx-4 mb-4 py-8 px-4 text-center">
            <h3 className="font-bold text-gray-800 text-lg uppercase tracking-wider mb-2">
              WORKING HOURS
            </h3>
            <p className="text-xs text-gray-600">Mon - Fri: 08:00 - 22:00</p>
            <p className="text-xs text-gray-600">Sat - Sun: 10:00 - 23:00</p>
          </div>
        </div>
      </div>
        </div>
        </div>
        {/* Form Section */}
        <div>
         <SectionTitle title="contact form" subTitle="Send Us a Message"></SectionTitle>
        <div className="bg-[#f3f3f3] p-6 sm:p-12 md:p-16 lg:p-20 max-w-5xl mx-auto rounded-sm my-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label pl-0 pb-2">
              <span className="label-text font-semibold text-gray-800">
                Name*
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input w-full bg-white border border-gray-200 focus:outline-none focus:border-amber-500 rounded-md py-3 px-4 text-sm text-gray-700"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label pl-0 pb-2">
              <span className="label-text font-semibold text-gray-800">
                Email*
              </span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input w-full bg-white border border-gray-200 focus:outline-none focus:border-amber-500 rounded-md py-3 px-4 text-sm text-gray-700"
              required
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="form-control w-full">
          <label className="label pl-0 pb-2">
            <span className="label-text font-semibold text-gray-800">
              Phone*
            </span>
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="input w-full bg-white border border-gray-200 focus:outline-none focus:border-amber-500 rounded-md py-3 px-4 text-sm text-gray-700"
            required
          />
        </div>

        {/* Message Field */}
        <div className="form-control w-full">
          <label className="label pl-0 pb-2">
            <span className="label-text font-semibold text-gray-800">
              Message*
            </span>
          </label>
          <textarea
            placeholder="Write your message here"
            rows="6"
            className="textarea w-full bg-white border border-gray-200 focus:outline-none focus:border-amber-500 rounded-md p-4 text-sm text-gray-700 resize-none"
            required
          ></textarea>
        </div>

        {/* Fake reCAPTCHA Placeholder */}
        <div className="pt-2">
          <div className="bg-white border border-gray-300 rounded p-3 inline-flex items-center gap-4 shadow-xs">
            <input
              type="checkbox"
              className="w-5 h-5 accent-blue-600 cursor-pointer"
              id="recaptcha"
            />
            <label
              htmlFor="recaptcha"
              className="text-xs text-gray-600 cursor-pointer select-none"
            >
              I'm not a robot
            </label>
            <div className="flex flex-col items-center ml-4">
              <img
                src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                alt="reCAPTCHA"
                className="w-6 h-6 opacity-70"
              />
              <span className="text-[8px] text-gray-400">reCAPTCHA</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#835D23] to-[#B58130] text-white font-bold py-3 px-8 rounded-none flex items-center gap-2 hover:opacity-90 transition-all duration-300 uppercase tracking-wider text-sm cursor-pointer"
          >
            Send Message <FaPaperPlane className="text-xs" />
          </button>
        </div>
      </form>
       </div>
        </div>
    </div>
  )
}

export default ContactUs
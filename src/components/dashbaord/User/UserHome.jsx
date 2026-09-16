
import React from 'react';
import { FaWallet, FaStore, FaPhoneAlt, FaShoppingCart, FaStar, FaCalendarAlt, FaCreditCard } from 'react-icons/fa';
import useCartsData from '../../../hooks/useCartsData';
import useAuth from '../../../hooks/useAuth';

const UserHome = () => {
  const [cart] = useCartsData();
  const {user} = useAuth();

  return (
    <div className="w-full p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header Welcome Text */}
      <h1 className="text-2xl md:text-3xl font-semibold font-serif text-gray-800 mb-6 uppercase tracking-wide">
        Hi, Welcome Back!
      </h1>

      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Menu */}
        <div className="flex items-center justify-center gap-4 py-6 px-8 rounded-lg text-white bg-gradient-to-r from-purple-500 to-purple-200 shadow-md">
          <FaWallet className="text-4xl md:text-5xl" />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">{cart.length}</h2>
            <p className="text-lg font-medium opacity-90">Menu</p>
          </div>
        </div>

        {/* Card 2: Shop */}
        <div className="flex items-center justify-center gap-4 py-6 px-8 rounded-lg text-white bg-gradient-to-r from-[#D1A054] to-[#F3E3B6] shadow-md">
          <FaStore className="text-4xl md:text-5xl" />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">103</h2>
            <p className="text-lg font-medium opacity-90">Shop</p>
          </div>
        </div>

        {/* Card 3: Contact */}
        <div className="flex items-center justify-center gap-4 py-6 px-8 rounded-lg text-white bg-gradient-to-r from-pink-500 to-pink-200 shadow-md">
          <FaPhoneAlt className="text-4xl md:text-5xl" />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">03</h2>
            <p className="text-lg font-medium opacity-90">Contact</p>
          </div>
        </div>
      </div>

      {/* Bottom Profile and Activities Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 shadow-sm rounded-lg overflow-hidden border border-gray-100">
        
        {/* Left Side: User Profile Info */}
        <div className="bg-[#FFEDD5] flex flex-col items-center justify-center py-12 px-6 border-b md:border-b-0 md:border-r border-orange-200">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#D1A054] bg-white flex items-center justify-center overflow-hidden mb-4 shadow-inner">
            <img 
              src={user?.photoURL} 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-serif text-gray-800 uppercase tracking-wider text-center">
            {user.displayName}
          </h2>
        </div>

        {/* Right Side: Your Activities */}
        <div className="bg-[#FEF08A] flex flex-col justify-center py-12 px-8 md:px-16">
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-gray-800 uppercase tracking-wide mb-6">
            YOUR ACTIVITIES
          </h2>

          <ul className="space-y-3 text-lg md:text-xl font-semibold font-serif">
            <li className="flex items-center gap-3 text-blue-600">
              <FaShoppingCart />
              <span>ORDERS: 6</span>
            </li>
            <li className="flex items-center gap-3 text-teal-600">
              <FaStar />
              <span>REVIEWS: 2</span>
            </li>
            <li className="flex items-center gap-3 text-amber-600">
              <FaCalendarAlt />
              <span>BOOKINGS: 1</span>
            </li>
            <li className="flex items-center gap-3 text-orange-600">
              <FaCreditCard />
              <span>PAYMENT: 3</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default UserHome;
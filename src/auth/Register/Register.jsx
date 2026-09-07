import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaGithub, FaEyeSlash, FaEye } from "react-icons/fa";
import signUpImg from "../../assets/others/authentication2.png";
import "../Login/Login.css"
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log("Logged User:", loggedUser);

        updateUserProfile(data.name, data.photo)
          .then(() => {
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Profile Update Failed",
              text: error.message,
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };


  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged in with Google successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign In Failed",
          text: error.message,
        });
      });
  };


  return (
    <div className="bannerBG min-h-screen flex items-center justify-center bg-[#f3f3f3] p-4 sm:p-8">
      {/* Outer Card with Shadow */}
      <div className="bg-[#f3f3f3] shadow-2xl rounded-lg max-w-5xl w-full p-6 sm:p-12 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left Side: Form */}
          <div className="w-full">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Sign Up
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div className="form-control">
                <label className="label pl-0 pb-1">
                  <span className="label-text font-semibold text-gray-700">
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  className="input w-full bg-white border border-gray-300 focus:outline-none focus:border-[#D1A054] rounded-md py-2.5 px-4 text-sm"
                />
                {errors.name && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>
              {/* Photo URL Field */}
              <div className="form-control">
                <label className="label pl-0 pb-1">
                  <span className="label-text font-semibold text-gray-700">
                    Photo URL
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Input photo url"
                  {...register("photo", {
                    required: "Photo url is required",
                  })}
                  className="input w-full bg-white border border-gray-300 focus:outline-none focus:border-[#D1A054] rounded-md py-2.5 px-4 text-sm"
                />
                {errors.photo && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.photo.message}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label pl-0 pb-1">
                  <span className="label-text font-semibold text-gray-700">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Type here"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="input w-full bg-white border border-gray-300 focus:outline-none focus:border-[#D1A054] rounded-md py-2.5 px-4 text-sm"
                />
                {errors.email && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control w-full">
                <label className="label pl-0 pb-1">
                  <span className="label-text font-semibold text-gray-700">
                    Password
                  </span>
                </label>

                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="input w-full bg-white border border-gray-300 focus:outline-none focus:border-[#D1A054] rounded-md py-2.5 px-4 pr-10 text-sm"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-800 z-10"
                  >
                    {showPassword ? <FaEyeSlash className="text-base" /> : <FaEye className="text-base" />}
                  </span>
                </div>

                {errors.password && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Sign Up Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#D1A054] hover:bg-[#b88a43] text-white font-bold py-3 rounded-md transition-all duration-300 text-sm tracking-wider uppercase cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            </form>

            {/* Link to Login Page */}
            <div className="text-center mt-4">
              <p className="text-xs text-[#D1A054]">
                Already registered?{" "}
                <Link to="/auth/login" className="font-bold hover:underline">
                  Go to log in
                </Link>
              </p>
            </div>

            {/* Social Logins */}
            <div className="text-center mt-6">
              <p className="text-xs text-gray-600 mb-3">Or sign up with</p>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  className="w-9 h-9 border border-gray-600 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all cursor-pointer"
                >
                  <FaFacebookF className="text-sm" />
                </button>
                <button
                  onClick={handleGoogleSignIn}
                  type="button"
                  className="w-9 h-9 border border-gray-600 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all cursor-pointer"
                >
                  <FaGoogle className="text-sm" />
                </button>
                <button
                  type="button"
                  className="w-9 h-9 border border-gray-600 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all cursor-pointer"
                >
                  <FaGithub className="text-sm" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Side: Illustration Image */}
          <div className="flex justify-center order-first md:order-last">
            <img
              src={signUpImg}
              alt="Sign Up Illustration"
              className="w-full max-w-md object-contain"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;
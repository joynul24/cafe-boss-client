import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import loginImg from "../../assets/others/authentication2.png";
import "./Login.css";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

function Login() {
  const [captchaText, setCaptchaText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Random Captcha Genarate
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setIsCaptchaValid(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Captcha input function check
  const handleCaptchaChange = (e) => {
    if (e.target.value === captchaText) {
      setIsCaptchaValid(true);
    } else {
      setIsCaptchaValid(false);
    }
  };

  // Login method
  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Logged In Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  // Google sign in
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
        navigate(from, { replace: true });
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
      <div className="bg-[#f3f3f3] shadow-2xl rounded-lg max-w-5xl w-full p-6 sm:p-12 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left Side Illustration */}
          <div className="flex justify-center">
            <img
              src={loginImg}
              alt="Login Illustration"
              className="w-full max-w-md object-contain"
            />
          </div>

          {/* Right Side Form */}
          <div className="w-full">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Login
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

              {/* Password Field with Eye Toggle */}
              <div className="form-control relative">
                <label className="label pl-0 pb-1">
                  <span className="label-text font-semibold text-gray-700">
                    Password
                  </span>
                </label>
                <div className="relative">
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
                    className="absolute right-3 top-3 cursor-pointer text-gray-600 hover:text-gray-800"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Dynamic Captcha Box */}
              <div className="form-control">
                <div className="bg-white border border-gray-300 rounded-md p-2 text-center text-lg font-mono tracking-widest text-gray-700 select-none font-bold">
                  {captchaText}
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="text-xs text-blue-600 hover:underline text-left mt-1 font-medium cursor-pointer"
                >
                  Reload Captcha
                </button>
              </div>

              {/* Captcha Input Field */}
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Type the captcha above"
                  onChange={handleCaptchaChange}
                  className="input w-full bg-white border border-gray-300 focus:outline-none focus:border-[#D1A054] rounded-md py-2.5 px-4 text-sm"
                />
                {!isCaptchaValid && (
                  <span className="text-xs text-amber-600 mt-1">
                    Please match the exact captcha to enable Sign In button.
                  </span>
                )}
              </div>

              {/* Submit Button (Disabled until captcha matches) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!isCaptchaValid}
                  className={`w-full font-bold py-3 rounded-md transition-all duration-300 text-sm tracking-wider uppercase ${
                    isCaptchaValid
                      ? "bg-[#D1A054] hover:bg-[#b88a43] text-white cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Sign In
                </button>
              </div>
            </form>

            {/* Link to Register Page */}
            <div className="text-center mt-4">
              <p className="text-xs text-[#D1A054]">
                New here?{" "}
                <Link to="/auth/register" className="font-bold hover:underline">
                  Create a New Account
                </Link>
              </p>
            </div>

            {/* Social Logins */}
            <div className="text-center mt-6">
              <p className="text-xs text-gray-600 mb-3">Or sign in with</p>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  className="w-9 h-9 border border-gray-600 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all cursor-pointer"
                >
                  <FaFacebookF className="text-sm" />
                </button>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
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
        </div>
      </div>
    </div>
  );
}

export default Login;









// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
// import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
// import loginImg from "../../assets/others/authentication2.png";
// import "./Login.css"

// function Login() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log("Form Data Submitted:", data);
//   };

//   return (
//     <div className="bannerBG min-h-screen flex items-center justify-center bg-[#f3f3f3] p-4 sm:p-8">
//       {/* Container Box */}
//       <div className="bg-[#f3f3f3] shadow-2xl rounded-lg max-w-5xl w-full p-6 sm:p-12 border border-gray-200">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
//           {/* Left Side Illustration */}
//           <div className="flex justify-center">
//             <img
//               src={loginImg}
//               alt="Login Illustration"
//               className="w-full max-w-md object-contain"
//             />
//           </div>

//           {/* Right Side Form */}
//           <div className="w-full">
//             <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
//               Login
//             </h2>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               {/* Email Field */}
//               <div className="form-control">
//                 <label className="label pl-0 pb-1">
//                   <span className="label-text font-semibold text-gray-700">
//                     Email
//                   </span>
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="Type here"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^\S+@\S+$/i,
//                       message: "Invalid email address",
//                     },
//                   })}
//                   className="input w-full bg-white border border-gray-300 focus:outline-none focus:border-[#D1A054] rounded-md py-2.5 px-4 text-sm"
//                 />
//                 {errors.email && (
//                   <span className="text-xs text-red-500 mt-1">
//                     {errors.email.message}
//                   </span>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div className="form-control">
//                 <label className="label pl-0 pb-1">
//                   <span className="label-text font-semibold text-gray-700">
//                     Password
//                   </span>
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="Enter your password"
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: {
//                       value: 6,
//                       message: "Password must be at least 6 characters",
//                     },
//                   })}
//                   className="input w-full bg-white border border-gray-300 focus:outline-none focus:border-[#D1A054] rounded-md py-2.5 px-4 text-sm"
//                 />
//                 {errors.password && (
//                   <span className="text-xs text-red-500 mt-1">
//                     {errors.password.message}
//                   </span>
//                 )}
//               </div>

//               {/* Static Captcha Box */}
//               <div className="form-control">
//                 <div className="bg-white border border-gray-300 rounded-md p-2 text-center text-lg font-mono tracking-widest text-gray-600 select-none">
//                   U d q l u e
//                 </div>
//                 <button
//                   type="button"
//                   className="text-xs text-blue-600 hover:underline text-left mt-1 font-medium"
//                 >
//                   Reload Captcha
//                 </button>
//               </div>

//               {/* Captcha Input Field */}
//               <div className="form-control">
//                 <input
//                   type="text"
//                   placeholder="Type here"
//                   {...register("captcha", {
//                     required: "Captcha is required",
//                   })}
//                   className="input w-full bg-white border border-gray-300 focus:outline-none focus:border-[#D1A054] rounded-md py-2.5 px-4 text-sm"
//                 />
//                 {errors.captcha && (
//                   <span className="text-xs text-red-500 mt-1">
//                     {errors.captcha.message}
//                   </span>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <div className="pt-2">
//                 <button
//                   type="submit"
//                   className="w-full bg-[#D1A054] hover:bg-[#b88a43] text-white font-bold py-3 rounded-md transition-all duration-300 text-sm tracking-wider uppercase cursor-pointer"
//                 >
//                   Sign In
//                 </button>
//               </div>
//             </form>

//             {/* Link to Register Page */}
//             <div className="text-center mt-4">
//               <p className="text-xs text-[#D1A054]">
//                 New here?{" "}
//                 <Link to="/auth/register" className="font-bold hover:underline">
//                   Create a New Account
//                 </Link>
//               </p>
//             </div>

//             {/* Social Logins */}
//             <div className="text-center mt-6">
//               <p className="text-xs text-gray-600 mb-3">Or sign in with</p>
//               <div className="flex justify-center gap-4">
//                 <button
//                   type="button"
//                   className="w-9 h-9 border border-gray-600 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all cursor-pointer"
//                 >
//                   <FaFacebookF className="text-sm" />
//                 </button>
//                 <button
//                   type="button"
//                   className="w-9 h-9 border border-gray-600 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all cursor-pointer"
//                 >
//                   <FaGoogle className="text-sm" />
//                 </button>
//                 <button
//                   type="button"
//                   className="w-9 h-9 border border-gray-600 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all cursor-pointer"
//                 >
//                   <FaGithub className="text-sm" />
//                 </button>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
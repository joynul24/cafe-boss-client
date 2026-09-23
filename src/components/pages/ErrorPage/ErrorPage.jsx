import { Link, useNavigate, useRouteError } from "react-router-dom";
import { Home, ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Glowing Animated Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#D1A054]/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none"></div>

      <div className="max-w-md w-full text-center relative z-10">
        
        {/* Floating Animated Illustration Icon */}
        <div className="relative inline-block mb-6">
          <div className="w-28 h-28 mx-auto bg-gradient-to-tr from-[#D1A054] to-amber-200/20 rounded-full flex items-center justify-center shadow-lg shadow-[#D1A054]/20 animate-bounce duration-1000">
            <AlertTriangle className="w-14 h-14 text-[#D1A054]" />
          </div>
          {/* Subtle pulse ring */}
          <div className="absolute inset-0 rounded-full border border-[#D1A054]/40 animate-ping pointer-events-none"></div>
        </div>

        {/* 404 Text Gradient */}
        <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D1A054] via-amber-200 to-[#b58742] tracking-widest drop-shadow-sm">
          404
        </h1>

        {/* Heading & Subtext */}
        <h2 className="text-2xl md:text-3xl font-bold mt-4 text-gray-100">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-400 mt-2 text-sm md:text-base leading-relaxed px-2">
          {error?.statusText || error?.message || "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Go Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-700 bg-slate-900/80 hover:bg-slate-800 text-gray-200 font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          {/* Go to Home Button */}
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D1A054] hover:bg-[#b58742] text-slate-950 font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-[#D1A054]/20"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          
        </div>

        {/* Optional Page Reload Action */}
        <div className="mt-6">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#D1A054] transition-colors duration-200"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try Refreshing Page
          </button>
        </div>

      </div>
    </div>
  );
};

export default ErrorPage;
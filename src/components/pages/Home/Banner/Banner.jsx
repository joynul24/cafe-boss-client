import { Link } from "react-router-dom";
import bannerVideoMp4 from "../../../../assets/banne_videos/video1.mp4";
import bannerVideoWebm from "../../../../assets/banne_videos/video1.mp4";
import bannerPoster from "../../../../assets/home/banner-2.jpg";

function BannerVideo() {
  return (
    <div className="relative w-full overflow-hidden h-screen">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={bannerPoster}
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={bannerVideoWebm} type="video/webm" />
        <source src={bannerVideoMp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay*/}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content over video */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold font-inter uppercase tracking-wide">
          Welcome to Cafe Boss
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-xl font-cinzel">
          Experience the best culinary delights with premium taste & ambiance.
        </p>

        {/* Added Button */}
        <div className="mt-8">
          <Link
            to="/menu"
            className="btn bg-[#fff] hover:bg-[#b58742] hover:text-white text-black border-none px-8 py-3 rounded-full text-base md:text-lg font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-105"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BannerVideo;
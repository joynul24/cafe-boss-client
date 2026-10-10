// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
// import "./Banner.css";
// import img1 from "../../../../assets/home/banner-1.jpg";
// import img2 from "../../../../assets/home/banner-2.jpg";
// import img3 from "../../../../assets/home/banner-3.png";
// import img4 from "../../../../assets/home/banner-4.jpg";
// import img5 from "../../../../assets/home/banner-5.png";
// import img6 from "../../../../assets/home/banner-6.png";

// function Banner() {
//   return (
//     <div>
//       <Carousel
//         autoPlay={true}
//         infiniteLoop={true}
//         interval={3000}
//         transitionTime={800}
//         showThumbs={true}
//         showStatus={false}
//         stopOnHover={false}
//       >
//         <div>
//           <img src={img1} alt="banner 1" />
//         </div>
//         <div>
//           <img src={img2} alt="banner 2" />
//         </div>
//         <div>
//           <img src={img3} alt="banner 3" />
//         </div>
//         <div>
//           <img src={img4} alt="banner 4" />
//         </div>
//         <div>
//           <img src={img5} alt="banner 5" />
//         </div>
//         <div>
//           <img src={img6} alt="banner 6" />
//         </div>
//       </Carousel>
//     </div>
//   );
// }

// export default Banner;





import { Link } from "react-router-dom";
import bannerVideoMp4 from "../../../../assets/banne_videos/banner-video.mp4";
import bannerVideoWebm from "../../../../assets/banne_videos/banner-video.mp4";
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
        <h1 className="text-4xl md:text-6xl font-bold font-cinzel uppercase tracking-wide">
          Welcome to Cafe Boss
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-xl font-inter">
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




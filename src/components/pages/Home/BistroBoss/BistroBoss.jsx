import { Parallax } from "react-parallax";
import bgImg from "../../../../assets/home/chef-service.jpg";

function BistroBoss() {
  return (
    <div className="my-10 md:my-20">
  <Parallax
    blur={{ min: -15, max: 15 }}
    bgImage={bgImg}
    bgImageAlt="Cafe Boss Background"
    strength={300}
  >
    <div className="py-12 sm:py-20 md:py-28 px-4 sm:px-8 md:px-20">
      <div className="bg-white w-full max-w-5xl flex flex-col justify-center items-center p-6 sm:p-10 md:p-16 lg:p-20 mx-auto text-center shadow-md rounded-sm">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel uppercase text-slate-900 tracking-wide">
          Cafe Boss
        </h2>
        <p className="mt-3 md:mt-4 text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base max-w-3xl">
          Welcome to Cafe Boss, where passion meets flavor. We take pride in
          serving delicious, freshly prepared dishes made with the finest
          local ingredients. Experience exceptional dining and warm
          hospitality in every bite.
        </p>
      </div>
    </div>
  </Parallax>
</div>
  );
}

export default BistroBoss;
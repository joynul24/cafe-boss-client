import { Parallax } from "react-parallax";
import bgImg from "../../../../assets/home/chef-service.jpg";

function BistroBoss() {
  return (
    <div className="my-20">
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={bgImg}
        bgImageAlt="Cafe Boss Background"
        strength={300}
      >
        <div className="py-28 px-4 md:px-20">
          <div className="bg-white lg:w-[1000px] flex flex-col justify-center items-center p-10 md:p-20 mx-auto text-center shadow-md">
            <h2 className="text-4xl md:text-5xl font-cinzel uppercase text-slate-900">
              Cafe Boss
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed text-sm md:text-base">
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
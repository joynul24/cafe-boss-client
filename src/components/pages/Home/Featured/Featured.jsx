import { Parallax } from "react-parallax";
import SectionTitle from "../../../shared/SectionTitle/SectionTitle";
import featuredImg from "../../../../assets/home/featured.jpg";

export default function Featured() {
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={featuredImg}
      bgImageAlt="featured menu background"
      strength={300}
    >
      <div className="bg-black/60 pt-8 pb-20 px-6 md:px-36 text-white my-20">
        {/* Section Title */}
        <SectionTitle
          subTitle="---Check it out---"
          title="FROM OUR MENU"
        ></SectionTitle>

        {/* Content Section */}
        <div className="md:flex justify-center items-center gap-10 pt-12">
          {/* Left Image */}
          <div className="md:w-1/2">
            <img 
              src={featuredImg} 
              alt="Featured Item" 
              className="rounded-lg shadow-2xl"
            />
          </div>

          {/* Right Text Content */}
          <div className="md:w-1/2 space-y-4 mt-6 md:mt-0">
            <p className="text-lg font-semibold">March 20, 2026</p>
            <h3 className="text-2xl uppercase">WHERE CAN I GET SOME?</h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              voluptate facere, deserunt dolores maiores quod nobis quas quasi.
              Eaque repetre nesciunt ad laudantium tempore consequatur
              consequatur omnis ullam maxime tenetur.
            </p>
            <button className="btn btn-outline border-0 border-b-4 border-white text-white hover:bg-white hover:text-black uppercase mt-4">
              Read More
            </button>
          </div>
        </div>
      </div>
    </Parallax>
  );
}
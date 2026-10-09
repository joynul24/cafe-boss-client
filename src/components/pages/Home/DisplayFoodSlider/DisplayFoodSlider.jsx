import SectionTitle from "../../../shared/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

import img1 from "../../../../assets/home/slide1.jpg";
import img2 from "../../../../assets/home/slide2.jpg";
import img3 from "../../../../assets/home/slide3.jpg";
import img4 from "../../../../assets/home/slide4.jpg";
import img5 from "../../../../assets/home/slide5.jpg";

function DisplayFoodSlider() {
  return (
    <div className="mb-20">
      <SectionTitle
        subTitle="---From 11:00am to 10:00pm---"
        title="Order Online"
      />

      {/* Display Food Slider */}
      <div className="mt-12">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}

          // Responsive
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}

          // Auto Slide
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}

          // Infinite loop
          loop={true}

          // Slide animation speed
          speed={800}

          pagination={{
            clickable: true,
          }}

          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              className="w-full"
              src={img1}
              alt="Salads"
            />
            <p className="text-xl md:text-2xl lg:text-3xl font-cinzel relative text-center bottom-12 text-white drop-shadow-md">
              Salads
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img
              className="w-full"
              src={img2}
              alt="Pizza"
            />
            <p className="text-xl md:text-2xl lg:text-3xl font-cinzel relative text-center bottom-12 text-white drop-shadow-md">
              Pizza
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img
              className="w-full"
              src={img3}
              alt="Soup"
            />
            <p className="text-xl md:text-2xl lg:text-3xl font-cinzel relative text-center bottom-12 text-white drop-shadow-md">
              Soup
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img
              className="w-full"
              src={img4}
              alt="Desserts"
            />
            <p className="text-xl md:text-2xl lg:text-3xl font-cinzel relative text-center bottom-12 text-white drop-shadow-md">
              Desserts
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img
              className="w-full"
              src={img5}
              alt="Salads"
            />
            <p className="text-xl md:text-2xl lg:text-3xl font-cinzel relative text-center bottom-12 text-white drop-shadow-md">
              Salads
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img
              className="w-full"
              src={img2}
              alt="Pizza"
            />
            <p className="text-xl md:text-2xl lg:text-3xl font-cinzel relative text-center bottom-12 text-white drop-shadow-md">
              Pizza
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img
              className="w-full"
              src={img1}
              alt="Salads"
            />
            <p className="text-xl md:text-2xl lg:text-3xl font-cinzel relative text-center bottom-12 text-white drop-shadow-md">
              Salads
            </p>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default DisplayFoodSlider;
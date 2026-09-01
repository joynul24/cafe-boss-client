import SectionTitle from "../../../shared/SectionTitle/SectionTitle"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import img1 from "../../../../assets/home/slide1.jpg"
import img2 from "../../../../assets/home/slide2.jpg"
import img3 from "../../../../assets/home/slide3.jpg"
import img4 from "../../../../assets/home/slide4.jpg"
import img5 from "../../../../assets/home/slide5.jpg"


function DisplayFoodSlider() {
  return (
    <div className="mb-20">
        <SectionTitle subTitle="---From 11:00am to 10:00pm---" title="Order Online"></SectionTitle>
        {/* Display Food Slider */}
        <div className="mt-12">
               <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img className="w-full" src={img1} alt="Slide 1" />
            <p className="font-cinzel relative text-center bottom-10">Salads</p>
        </SwiperSlide>
        <SwiperSlide>
             <img className="w-full" src={img2} alt="Slide 2" />
             <p className="font-cinzel relative text-center bottom-10 text-white">Pizza</p>
        </SwiperSlide>
        <SwiperSlide>
             <img className="w-full" src={img3} alt="Slide 3" />
             <p className="font-cinzel relative text-center bottom-10 text-white">Soup</p>
        </SwiperSlide>
        <SwiperSlide>
             <img className="w-full" src={img4} alt="Slide 4" />
             <p className="font-cinzel relative text-center bottom-10 text-white">desserts</p>
        </SwiperSlide>
        <SwiperSlide>
             <img className="w-full" src={img5} alt="Slide 5" />
              <p className="font-cinzel relative text-center bottom-10 text-white">Salads</p>
        </SwiperSlide>
        <SwiperSlide>
             <img className="w-full" src={img2} alt="Slide 5" />
              <p className="font-cinzel relative text-center bottom-10 text-white">Pizza</p>
        </SwiperSlide>
        <SwiperSlide className="">
             <img className="w-full" src={img1} alt="Slide 5" />
              <p className="font-cinzel relative text-center bottom-10 text-white">Salads</p>
        </SwiperSlide>
      </Swiper>
        </div>
    </div>
  )
}

export default DisplayFoodSlider
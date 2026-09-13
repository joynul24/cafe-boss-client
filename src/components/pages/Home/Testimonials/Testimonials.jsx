import SectionTitle from "../../../shared/SectionTitle/SectionTitle";
import useReviewsData from "../../../../hooks/useReviewsData";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Rating component & styles
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

// Quote icon
import { FaQuoteLeft } from "react-icons/fa";

export default function Testimonials() {
  const [reviews, loading] = useReviewsData();

  if (loading) {
    return <div className="flex justify-center">
         <span className="loading loading-bars loading-lg"></span>
       </div>;
  }

  return (
    <section className="my-20 max-w-5xl mx-auto px-4">
      <SectionTitle
        subTitle="---What Our Clients Say---"
        title="TESTIMONIALS"
      />

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center text-center space-y-6 px-12 md:px-24 my-10">
              {/* Star Rating */}
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />

              {/* Quote Icon */}
              <FaQuoteLeft className="text-6xl md:text-7xl text-slate-900 my-4" />

              {/* Review Text */}
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {review.details}
              </p>

              {/* Reviewer Name */}
              <h3 className="text-xl md:text-2xl font-medium text-[#D99904] uppercase">
                {review.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
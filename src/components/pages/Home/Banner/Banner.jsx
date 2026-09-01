import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "./Banner.css"
import img1 from "../../../../assets/home/banner-1.jpg"
import img2 from "../../../../assets/home/banner-2.jpg"
import img3 from "../../../../assets/home/banner-3.png"
import img4 from "../../../../assets/home/banner-4.jpg"
import img5 from "../../../../assets/home/banner-5.png"
import img6 from "../../../../assets/home/banner-6.png"

function Banner() {
  return (
    <div className="">
             <Carousel>
                <div>
                    <img src={img1} alt="banner 1" />
                </div>
                <div>
                    <img src={img2} alt="banner 2" />
                </div>
                <div>
                    <img src={img3} alt="banner 3" />
                </div>
                <div>
                    <img src={img4} alt="banner 4" />
                </div>
                <div>
                    <img src={img5} alt="banner 5" />
                </div>
                <div>
                    <img src={img6} alt="banner 6" />
                </div>
            </Carousel>
    </div>
  )
}

export default Banner
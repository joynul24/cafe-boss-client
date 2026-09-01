import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./Banner.css"


function Banner() {
    return (
        <div>
            <Carousel>
                <div>
                    <img src="/home/banner1.jpg" alt="banner 1" />
                </div>
                <div>
                    <img src="home/banner2.jpg" alt="banner 2" />
                </div>
                <div>
                    <img src="home/banner3.png" alt="banner 3" />
                </div>
                <div>
                    <img src="home/banner4.jpg" alt="banner 4" />
                </div>
                <div>
                    <img src="home/banner5.png" alt="banner 5" />
                </div>
                <div>
                    <img src="home/banner6.png" alt="banner 6" />
                </div>
            </Carousel>
        </div>
    )
}

export default Banner
import style from "./CarouselImg.module.scss";
import one from "/carousel/1.jpg";
import two from "/carousel/2.jpg";
import three from "/carousel/3.jpg";
import Slider from "react-slick";

function CarouselImg() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    swipeToSlide: true,
  };
  return (
    <div className={style.carouselimg}>
      <Slider {...settings} className="carouselhome">
        <div>
          <img src={one} alt="" />
        </div>
        <div>
          <img src={two} alt="" />
        </div>
        <div>
          <img src={three} alt="" />
        </div>
      </Slider>
      <hr />
    </div>
  );
}

export default CarouselImg;

import Slider from "react-slick";
import { useState, useEffect, useRef } from "react";
import style from "./CarouselImgDetail.module.scss";

function CarouselImgDetail({ imgs }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  return (
    <div className="carouselImg">
      <Slider asNavFor={nav2} ref={(slider) => (sliderRef1 = slider)}>
        {imgs && imgs.length > 0
          ? imgs.map((imgSrc, index) => (
              <div
                key={index}
                style={{ padding: "10px" }}
                className={style.img1}
              >
                <img src={imgSrc} alt={`Картинка ${index + 1}`} />
              </div>
            ))
          : null}
      </Slider>
      <div className={style.imgSmall}>
        <Slider
          asNavFor={nav1}
          ref={(slider) => (sliderRef2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
          className={style.slider2}
        >
          {imgs && imgs.length > 0
            ? imgs.map((imgSrc, index) => (
                <div key={index} style={{ padding: "10px" }}>
                  <img
                    className={style.img2}
                    src={imgSrc}
                    alt={`Картинка ${index + 1}`}
                  />
                </div>
              ))
            : null}
        </Slider>
      </div>
    </div>
  );
}

export default CarouselImgDetail;

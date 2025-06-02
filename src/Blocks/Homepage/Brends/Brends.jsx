import style from "./Brends.module.scss";
import { Link } from "react-router";
import Slider from "react-slick";

function Brends() {
  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "0px",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    swipeToSlide: true,
  };
  return (
    <div className="brends">
      <Slider {...settings} className={style.brends}>
        <div className={style.brend}>
          <div>
            <Link className={style.hawk} to={"/hawk/up"}></Link>
          </div>
        </div>
        <div className={style.brend}>
          <div>
            <Link className={style.mustang} to={"/mustang"}></Link>
          </div>
        </div>
        <div className={style.brend}>
          <div>
            <Link className={style.osse} to={"/osse/up"}></Link>
          </div>
        </div>
        <div className={style.brend}>
          <div>Diverso</div>
        </div>
      </Slider>
    </div>
  );
}

export default Brends;

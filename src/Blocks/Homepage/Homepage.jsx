import "./Homepage.module.scss";
import CarouselImg from "./CarouselImg/CarouselImg";
import Brends from "./Brends/Brends";

function Homepage() {
  return (
    <section className="homepage">
      <CarouselImg />
      <Brends />
    </section>
  );
}

export default Homepage;

import style from "./osse.module.scss";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";

import { Link } from "react-router";

function Osse() {
  return (
    <section className={style.osse}>
      <ScrollToTop />
      <div>
        <div className={style.img}></div>
        <div>
          <h2 id="up">Osse</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            nesciunt consequatur voluptate. Reiciendis excepturi, autem optio
            eius nobis illo aspernatur praesentium voluptas eos totam id
            molestiae commodi sapiente enim deserunt.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            commodi odit sapiente iure quasi ipsa est, eveniet unde id veniam
            numquam rem, tenetur alias excepturi, omnis exercitationem officia.
            Repellendus, quaerat?
          </p>
          <div>
            <div className={style.button}>
              <Link to="/filters?activateFilters=osse,optik">
                Заказать Mед.оправы
              </Link>
            </div>
            <div className={style.button}>
              <Link to="/filters?activateFilters=osse,sunscreen">
                Заказать С/З
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={style.video}>Здесь будет видео</div>
    </section>
  );
}

export default Osse;

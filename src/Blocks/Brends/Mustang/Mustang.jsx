import style from "./Mustang.module.scss";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";
import { Link } from "react-router";

function Mustang() {
  return (
    <section className={style.mustang} id="up">
      <ScrollToTop />
      <div>
        <div className={style.img}></div>
        <div>
          <h2>Mustang</h2>
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
              <Link
                to={{
                  pathname: "/filters",
                  search: "?activateFilters=mustang,optik",
                }}
              >
                Заказать Mед.оправы
              </Link>
            </div>
            <div className={style.button}>
              <Link
                to={{
                  pathname: "/filters",
                  search: "?activateFilters=mustang,sunscreen",
                }}
              >
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

export default Mustang;

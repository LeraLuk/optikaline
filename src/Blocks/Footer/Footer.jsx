import style from "./Footer.module.scss";
import logo from "/img/logo.svg";

function Footer() {
  return (
    <footer className={style.footer}>
      <hr />
      <div>
        <img className={style.logo} src={logo} alt="" />
        <nav>
          <ul>
            <li>
              <h3>Контакты</h3>
              <hr />
            </li>
            <li>
              <a href="">ссылка</a>
            </li>
            <li>
              <a href="">ссылка</a>
            </li>
            <li>
              <a href="">ссылка</a>
            </li>
            <li>
              <a href="">ссылка</a>
            </li>
          </ul>
          <ul>
            <li>
              <h3>Информация</h3>
              <hr />
            </li>
            <li>
              <a href="">ссылка</a>
            </li>
            <li>
              <a href="">ссылка</a>
            </li>
            <li>
              <a href="">ссылка</a>
            </li>
            <li>
              <a href="">ссылка</a>
            </li>
          </ul>
        </nav>
      </div>
      <p>© OptikaLine</p>
    </footer>
  );
}

export default Footer;

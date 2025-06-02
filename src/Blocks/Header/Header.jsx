import style from "./Header.module.scss";
import { Link } from "react-router";
import bascket from "/img/bascket.svg";
import account from "/img/account.svg";
import { useState, useRef } from "react";
import MenuBrends from "./MenuBrends/MenuBrends";

function Header() {
  const menu = useRef(null);
  const [brends, setBrends] = useState(false);

  const onMenu = (evt) => {
    if (evt.target.classList.contains("disabled")) return;

    console.log(evt.target);
    menu.current.checked = false;
  };
  return (
    <header className={style.header}>
      <Link to={""}>
        <div className={style.logo}></div>
      </Link>
      <nav>
        <div
          onClick={() => {
            setBrends(!brends);
          }}
          className={style.brendsbutton}
        >
          Бренды <div className={style.arrow}></div>
          {brends ? (
            <div className={style.brends}>
              <ul>
                <li>
                  <Link
                    onClick={() => {
                      setBrends(!brends);
                    }}
                    to={"/mustang"}
                  >
                    Mustang
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setBrends(!brends);
                    }}
                    to={"/osse"}
                  >
                    Osse
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setBrends(!brends);
                    }}
                    to={"/hawk"}
                  >
                    Hawk
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setBrends(!brends);
                    }}
                    to={""}
                  >
                    Diverso
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
        <div>
          <Link to={"/aboutus"}>О нас</Link>
        </div>
        <div>
          <Link to={"/contacts"}>Контакты</Link>
        </div>
        <div>
          <Link to={"/bascket"}>
            <img src={bascket} alt="" />
          </Link>
        </div>
        <div>
          <Link to={"/account"}>
            <img src={account} alt="" />
          </Link>
        </div>
      </nav>
      <nav className={style.nav2}>
        <input
          type="checkbox"
          id="burger"
          disabled
          ref={menu}
          className={style.input}
        />
        <label
          className={style.label}
          htmlFor="burger"
          onClick={(evt) => {
            evt.stopPropagation();
            menu.current.checked = !menu.current.checked;
            window.addEventListener("click", onMenu);
          }}
        >
          <span className={style.span}></span>
          <span className={style.span}></span>
          <span className={style.span}></span>
        </label>
        <div className={style.menu}>
          <MenuBrends brends={brends} setBrends={setBrends} />
        </div>
      </nav>
    </header>
  );
}

export default Header;

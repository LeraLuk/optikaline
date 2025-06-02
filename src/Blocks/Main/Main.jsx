import style from "./Main.module.scss";
import { Outlet } from "react-router";

function Main() {
  return (
    <main className={style.main}>
      <Outlet />
    </main>
  );
}

export default Main;

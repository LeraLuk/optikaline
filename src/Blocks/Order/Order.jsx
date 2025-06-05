import style from "./Order.module.scss";

function Order() {
  return (
    <section className={style.order}>
      <h3 className={style.fio}></h3>
      <h3 className={style.company}></h3>
      <h3 className={style.position}></h3>
      <h3 className={style.inn}></h3>
      <h3 className={style.phone}></h3>
      <h3 className={style.email}></h3>
      <div className={style.table}></div>
    </section>
  );
}

export default Order;

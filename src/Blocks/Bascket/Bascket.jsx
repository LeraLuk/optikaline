import style from "./Bascket.module.scss";
import { useCart } from "../../utils/CartContext";

function Bascket() {
  const { items, updateQuantity, removeItem, totalSum } = useCart();
  return (
    <section className={style.bascket}>
      <h2>Корзина</h2>
      <table cellSpacing={2} cellPadding={7}>
        <thead>
          <tr>
            <th>Товар</th>
            <th>Цена</th>
            <th>Кол-во</th>
            <th>Общая</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}₽</td>
              <td>
                {item.hm === 0 ? (
                  "П/З"
                ) : (
                  <input
                    type="number"
                    min={1}
                    max={item.hm}
                    value={item.quantity}
                    onChange={(e) => {
                      let val = parseInt(e.target.value);
                      if (val < 1) val = 1;
                      if (item.hm > 0 && val > item.hm) val = item.hm;
                      updateQuantity(item.id, val);
                    }}
                  />
                )}
              </td>
              <td>
                {/* {item.price * item.quantity} */}
                {item.hm === 0 ? "0" : item.price * item.quantity}
              </td>
              <td className={style.delite}>
                <button onClick={() => removeItem(item.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">ИТОГО</td>
            <td colSpan="1">{totalSum()}₽</td>
          </tr>
        </tfoot>
      </table>
      <button className={style.order}>Оформить заказ</button>
    </section>
  );
}

export default Bascket;

import style from "./Card.module.scss";
import { useNavigate } from "react-router";
import { useCart } from "../../../../utils/CartContext";
import bascket from "/img/bascket.svg";

function Card({ product }) {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, items } = useCart();
  const cartItem = items.find((item) => item.id === product.id);
  const hasInCart = !!cartItem;
  const quantity = cartItem ? cartItem.quantity : 0;

  // Обработка кнопки + для добавления
  const handleAdd = () => {
    // Для hm=0: можно только 1 раз
    if (product.hm === 0 && hasInCart) return; // уже есть "под заказ"
    if (product.hm === 0 && !hasInCart) {
      addToCart(product, 1);
    } else if (!hasInCart || quantity < product.hm) {
      addToCart(product, 1);
    }
  };

  // Обработка + / -
  const handleIncrease = () => {
    if (product.hm === 0) return; // для "Под заказ" — ничего не делаем
    if (quantity < product.hm) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (product.hm === 0 && hasInCart) {
      // взять "под заказ" — можно убрать
      updateQuantity(product.id, 0);
    } else if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else if (quantity === 1) {
      updateQuantity(product.id, 0); // убрать из корзины
    }
  };

  const handleClickImageOrTitle = () => {
    navigate(`/filters/${product.id}`);
  };
  const mainImage = product.dopImgs.length > 0 ? product.dopImgs[0].img : "";
  return (
    <div className={style.card}>
      <div className={style.img}>
        <img onClick={handleClickImageOrTitle} src={mainImage} alt="" />
      </div>
      <h2 onClick={handleClickImageOrTitle}>{product.name}</h2>
      <h3>{product.price}₽</h3>
      {!hasInCart ? (
        <button className={style.bascket} onClick={handleAdd}>
          <img src={bascket} alt="" />
        </button>
      ) : product.hm === 0 ? (
        // для "Под заказ": показывать "под заказ" и кнопку 'X' для удаления
        <div className={style.podOrderContainer}>
          <p>Под заказ</p>
          <button
            className={style.remove}
            onClick={() => updateQuantity(product.id, 0)}
          >
            Убрать
          </button>
        </div>
      ) : (
        // для товаров с hm>0: отображаем + / - и количество
        <div className={style.countControl}>
          {quantity > 0 && (
            <>
              <div className={style.remove} onClick={handleDecrease}>
                -
              </div>
              <div className={style.quantity}>{quantity}</div>
              <div className={style.add} onClick={handleIncrease}>
                +
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Card;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./CardDetail.module.scss";
import CarouselImgDetail from "./CarouselImgDetail/CarouselImgDetail";
import { useCart } from "../../../utils/CartContext";

const CardDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("/ex.json")
      .then((res) => res.json())
      .then((data) => {
        const prod = data.find((p) => p.id === parseInt(id));
        setProduct(prod);
      })
      .catch(console.error);
  }, [id]);

  if (!product) {
    return <div>Загрузка данных...</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { addToCart, updateQuantity, items, removeItem } = useCart();
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
      // Удаляем товар под заказ
      removeItem(product.id);
    } else if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else if (quantity === 1) {
      removeItem(product.id);
    }
  };

  return (
    <div className={style.carddetail}>
      <div>
        <h2>{product.name}</h2>
        <CarouselImgDetail imgs={product.dopImgs.map((item) => item.img)} />
      </div>
      <div className={style.description}>
        <img src={product.imgSize} alt="" />
        <p className={style.price}>{product.price}₽</p>
        <p>{product.hm > 0 ? "Есть в наличии" : "Под заказ"}</p>
        {!hasInCart ? (
          <button className={style.bascket} onClick={handleAdd}>
            Добавить в корзину
          </button>
        ) : product.hm === 0 ? (
          // для "Под заказ": показывать "под заказ" и кнопку 'X' для удаления
          <div className={style.podOrderContainer}>
            <p>Добавлено в корзину</p>
            <button
              className={style.remove}
              onClick={() => removeItem(product.id)}
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
    </div>
  );
};

export default CardDetail;

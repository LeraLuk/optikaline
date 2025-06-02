import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./CardDetail.module.scss";
import CarouselImgDetail from "./CarouselImgDetail/CarouselImgDetail";

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
        <button className={style.bascket}>Добавить в корзину</button>
      </div>
    </div>
  );
};

export default CardDetail;

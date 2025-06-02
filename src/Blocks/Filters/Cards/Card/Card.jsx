import style from "./Card.module.scss";
import { useNavigate } from "react-router";

function Card({ product }) {
  const navigate = useNavigate();
  const handleClick = () => {
    // Переход на страницу товара по его id
    navigate(`/filters/${product.id}`);
  };
  const mainImage = product.dopImgs.length > 0 ? product.dopImgs[0].img : "";
  return (
    <div className={style.card}>
      <div className={style.img}>
        <img onClick={handleClick} src={mainImage} alt="" />
      </div>
      <h2 onClick={handleClick}>{product.name}</h2>
      <h3>{product.price}₽</h3>
      <button className={style.bascket}></button>
    </div>
  );
}

export default Card;

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children, user }) => {
  const [cartByUser, setCartByUser] = useState(() => {
    try {
      const stored = localStorage.getItem("cart_byUser");
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error("Ошибка парсинга cart_byUser", e);
      return {};
    }
  });

  // Убираем начальный useState для items, он будет устанавливаться через useEffect
  const [items, setItems] = useState([]);

  // Когда `user` или `cartByUser` меняется — обновляем `items`
  useEffect(() => {
    if (user && user.id && cartByUser[user.id]) {
      setItems(cartByUser[user.id].items);
    } else {
      setItems([]);
    }
  }, [user, cartByUser]);

  const saveUserCart = (userId, newItems) => {
    setCartByUser((prev) => {
      const newCart = { ...prev, [userId]: { items: newItems } };
      localStorage.setItem("cart_byUser", JSON.stringify(newCart));
      return newCart;
    });
  };

  // Внутренние функции (add, update, remove)
  const addToCart = (product, quantity = 1) => {
    const index = items.findIndex((item) => item.id === product.id);
    let newItems;
    if (index !== -1) {
      newItems = [...items];
      newItems[index].quantity = Math.min(
        newItems[index].quantity + quantity,
        product.hm || Infinity
      );
    } else {
      newItems = [...items, { ...product, quantity }];
    }
    setItems(newItems);
    if (user && user.id) {
      saveUserCart(user.id, newItems);
    }
  };

  const updateQuantity = (id, qty) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    setItems(newItems);
    if (user && user.id) {
      saveUserCart(user.id, newItems);
    }
  };

  const removeItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    if (user && user.id) {
      saveUserCart(user.id, newItems);
    }
  };

  const totalSum = () =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeItem,
        totalSum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

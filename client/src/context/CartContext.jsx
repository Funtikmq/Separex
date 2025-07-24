import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("cartOrders");
    return saved ? JSON.parse(saved) : [];
  });

  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  const deleteOrder = (indexToDelete) => {
    setOrders(orders.filter((_, index) => index !== indexToDelete));
  };

  return (
    <CartContext.Provider value={{ orders, addOrder, deleteOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};

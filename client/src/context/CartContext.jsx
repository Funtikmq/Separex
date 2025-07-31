import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext"; // important pentru user.uid

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  // Load cart orders from localStorage for this user
  useEffect(() => {
    if (user) {
      const savedOrders = localStorage.getItem(`orders_${user.uid}`);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        setOrders([]);
      }
    } else {
      setOrders([]);
    }
  }, [user]);

  const saveToLocal = (newOrders) => {
    if (user) {
      localStorage.setItem(`orders_${user.uid}`, JSON.stringify(newOrders));
    }
  };

  const addOrder = (order) => {
    const updated = [...orders, order];
    setOrders(updated);
    saveToLocal(updated);
  };

  const deleteOrder = (index) => {
    const updated = orders.filter((_, i) => i !== index);
    setOrders(updated);
    saveToLocal(updated);
  };

  return (
    <CartContext.Provider value={{ orders, addOrder, deleteOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);

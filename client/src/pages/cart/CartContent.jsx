import { useState, useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import Table from "./Table";
import Order from "./Order";

function CartContent() {
  const { orders, addOrder, deleteOrder } = useCartContext();
  const [orderData, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const stored = localStorage.getItem("cartData");
    if (stored) setData(JSON.parse(stored));
  }, []);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[1-9]\d*$/.test(value)) {
      setQuantity(value === "" ? "" : parseInt(value));
    }
  };

  const handleSaveOrder = (orderData) => {
    const quantityInt = parseInt(quantity) || 1;
    const newOrder = {
      product: orderData.selectedCategory,
      type: orderData.selectedType,
      docs: "Link to docs",
      quantity: quantityInt,
      price: "Calculat",
    };
    addOrder(newOrder);
  };

  return (
    <div className="cartLayout">
      <Table orders={orders} onDeleteOrder={deleteOrder} />
      {orderData ? (
        <Order
          data={orderData}
          quantity={quantity}
          onSave={() => handleSaveOrder({ ...orderData, quantity })}
          onQuantityChange={handleQuantityChange}
        />
      ) : null}
    </div>
  );
}

export default CartContent;

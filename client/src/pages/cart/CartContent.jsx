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

  // Documentation

  const handleGenerateAndDownloadPDF = async () => {
    try {
      const response = await fetch("http://localhost:5000/generate/files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: orderData?.selectedCategory,
          type: orderData?.selectedType,
          dimensions: orderData?.doorDimensions,
          sectionType: orderData?.sectionTypes,
          sectionDimensions: orderData?.sectionDimensions,
          models: orderData?.sectionModels,
          colors: orderData?.sectionColors,
          handles: orderData?.selectedHandle,
        }),
      });

      if (!response.ok) {
        throw new Error("Error at Generating PDF");
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "order.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error at Generating PDF:", error);
    }
  };

  return (
    <div className="cartLayout">
      <Table
        orders={orders}
        onDeleteOrder={deleteOrder}
        onGenerate={handleGenerateAndDownloadPDF}
      />
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

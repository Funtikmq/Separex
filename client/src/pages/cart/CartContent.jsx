import { useState, useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import Table from "./Table";
import Order from "./Order";

function CartContent() {
  const { orders, addOrder, deleteOrder } = useCartContext();
  const [orderData, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const db = getFirestore();

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

  const { user } = useAuth();

  const handleSaveOrder = (orderData) => {
    if (!user) {
      alert("To Save Your Order, Log In First");
      return;
    }

    const quantityInt = parseInt(quantity) || 1;

    const newOrder = {
      product: orderData.selectedCategory,
      type: orderData.selectedType,
      docs: "Link to docs",
      quantity: quantityInt,
      price: "Calculat",
      dimensions: orderData.doorDimensions,
      sectionType: orderData.sectionTypes,
      sectionDimensions: orderData.sectionDimensions,
      sectionModels: orderData.sectionModels,
      sectionColors: orderData.sectionColors,
      handles: orderData.selectedHandle ? [orderData.selectedHandle] : [],
    };

    addOrder(newOrder);
  };

  const handleConfirmOrder = async () => {
    if (!user) {
      alert("To confirm your order, please log in first.");
      return;
    }

    if (!orders || orders.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const total = orders.reduce(
      (sum, order) => sum + (parseFloat(order.price) || 0),
      0
    );

    const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const transformedProducts = orders.map((order) => ({
      category: order.product,
      type: order.type,
      quantity: order.quantity,
      price: order.price,
      dimensions: order.dimensions || null,
      sectionType: (order.sectionType || []).flat(),
      sectionDimensions: (order.sectionDimensions || []).flat(),
      sectionModels: (order.sectionModels || []).flat(),
      sectionColors: (order.sectionColors || []).flat(),
      handles: (order.handles || []).flat(),
    }));

    const newOrder = {
      orderNumber,
      userEmail: user.email,
      createdAt: Timestamp.now(),
      products: transformedProducts,
      total,
    };

    try {
      await addDoc(collection(db, "orders"), newOrder);
      alert("Order successfully confirmed!");
      // clearOrders(); // dacă ai implementat
    } catch (error) {
      console.error("Error saving order:", error);
      alert("An error occurred while confirming your order.");
    }
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
        onConfirmOrder={handleConfirmOrder}
      />
      {orderData ? (
        <Order
          data={orderData}
          quantity={quantity}
          onSave={() => handleSaveOrder({ ...orderData, quantity })}
          onQuantityChange={handleQuantityChange}
          user={user}
        />
      ) : null}
    </div>
  );
}

export default CartContent;

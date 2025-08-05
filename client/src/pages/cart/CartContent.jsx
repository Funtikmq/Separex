import { useState, useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { getFirestore } from "firebase/firestore";
import { auth } from "../profile/firebase/firebase";
import { handleGenerateAndDownloadPDF } from "../../utils/downloadPDF";
import Table from "./Table";
import Order from "./Order";

function CartContent() {
  const { orders, addOrder, deleteOrder } = useCartContext();
  const [orderData, setOrderData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(null);
  const { user } = useAuth();
  const db = getFirestore();

  useEffect(() => {
    const stored = localStorage.getItem("cartData");
    if (stored) setOrderData(JSON.parse(stored));
  }, []);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[1-9]\d*$/.test(value)) {
      setQuantity(value === "" ? "" : parseInt(value));
    }
  };

  // Calculează prețul
  useEffect(() => {
    const fetchInitialPrice = async () => {
      if (!orderData || !user) return;

      const quantityInt = parseInt(quantity) || 1;

      const orderToSend = {
        category: orderData.selectedCategory,
        type: orderData.selectedType,
        mountType: orderData.slidingMountType,
        dimensions: orderData.doorDimensions,
        sectionType: orderData.sectionTypes,
        sectionDimensions: orderData.sectionDimensions,
        sectionModels: orderData.sectionModels,
        sectionColors: orderData.sectionColors,
        handles: orderData.selectedHandle || [],
        quantity: quantityInt,
      };

      try {
        const token = await auth.currentUser.getIdToken();

        const response = await fetch(
          "http://localhost:5000/api/calculate-order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderToSend),
          }
        );

        if (!response.ok) throw new Error("Failed to calculate price");

        const result = await response.json();
        setPrice(result.total);
      } catch (err) {
        console.error("Error fetching price:", err);
      }
    };

    fetchInitialPrice();
  }, [orderData, user, quantity]);

  // Adaugă în context
  const handleSaveOrder = () => {
    if (!user) {
      alert("To Save Your Order, Log In First");
      return;
    }

    if (!orderData || price == null) {
      alert("Order data or price is not ready.");
      return;
    }

    const quantityInt = parseInt(quantity) || 1;

    const newOrder = {
      category: orderData.selectedCategory,
      type: orderData.selectedType,
      mountType: orderData.slidingMountType,
      dimensions: orderData.doorDimensions,
      sectionType: orderData.sectionTypes,
      sectionDimensions: orderData.sectionDimensions,
      sectionModels: orderData.sectionModels,
      sectionColors: orderData.sectionColors,
      handles: orderData.selectedHandle || [],
      quantity: quantityInt,
      price: price.toFixed(2),
      product: orderData.selectedCategory,
    };

    addOrder(newOrder);
  };

  // Confirmă comenzile și le salvează în Firestore
  const handleConfirmOrder = async () => {
    if (!auth.currentUser) {
      alert("To confirm your order, please log in first.");
      return;
    }

    if (!orders || orders.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const token = await auth.currentUser.getIdToken();

      const orderToSave = {
        userEmail: auth.currentUser.email,
        products: orders,
      };

      const saveResponse = await fetch("http://localhost:5000/api/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderToSave),
      });

      if (!saveResponse.ok) {
        const errorText = await saveResponse.text();
        throw new Error(`Failed to save order: ${errorText}`);
      }

      const savedResult = await saveResponse.json();
      alert(`Order confirmed!`);
    } catch (error) {
      console.error("Error confirming and saving orders:", error);
      alert("There was an error confirming your order.");
    }
  };

  // Datele Pentru PDF
  const transformOrderDataForPDF = (data) => ({
    category: data.selectedCategory,
    type: data.selectedType,
    mountType: data.slidingMountType,
    dimensions: data.doorDimensions,
    sectionType: data.sectionTypes,
    sectionDimensions: data.sectionDimensions,
    sectionModels: data.sectionModels,
    sectionColors: data.sectionColors,
    handles: data.selectedHandle ? [data.selectedHandle] : [],
  });

  return (
    <div className="cartLayout">
      <Table
        orders={orders}
        onDeleteOrder={deleteOrder}
        onGenerate={() =>
          handleGenerateAndDownloadPDF(transformOrderDataForPDF(orderData))
        }
        onConfirmOrder={handleConfirmOrder}
      />
      {orderData && (
        <Order
          data={orderData}
          quantity={quantity}
          price={price}
          onSave={handleSaveOrder}
          onQuantityChange={handleQuantityChange}
          user={user}
        />
      )}
    </div>
  );
}

export default CartContent;

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

      console.log(orderData);

      const quantityInt = parseInt(quantity) || 1;

      const orderToSend = {
        category: orderData.selectedCategory,
        type: orderData.selectedType,
        mountType: orderData.slidingMountType,
        slidingType: orderData.slidingType,
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

  const compressImage = (base64Image, maxWidth = 1600, quality = 0.92) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64Image;

      img.onload = () => {
        const canvas = document.createElement("canvas");

        // Redimensionare păstrând aspect ratio
        const ratio = Math.min(maxWidth / img.width, 1);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        const ctx = canvas.getContext("2d");

        // Fundal alb pentru PNG-uri cu transparență
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Export ca base64 JPEG cu compresie ușoară
        const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedBase64);

        console.log(
          "Compressed size:",
          Math.round(compressedBase64.length / 1024),
          "KB"
        );
      };

      img.onerror = (err) => reject(err);
    });
  };

  // Adaugă în context
  const handleSaveOrder = async () => {
    if (!user) {
      alert("To Save Your Order, Log In First");
      return;
    }

    if (!orderData || price == null) {
      alert("Order data or price is not ready.");
      return;
    }

    const quantityInt = parseInt(quantity) || 1;

    const compressedImage = await compressImage(orderData.image, 1600, 0.92);

    const newOrder = {
      category: orderData.selectedCategory,
      type: orderData.selectedType,
      mountType: orderData.slidingMountType,
      slidingType: orderData.slidingType,
      dimensions: orderData.doorDimensions,
      sectionType: orderData.sectionTypes,
      sectionDimensions: orderData.sectionDimensions,
      sectionModels: orderData.sectionModels,
      sectionColors: orderData.sectionColors,
      handles: orderData.selectedHandle || [],
      quantity: quantityInt,
      price: price.toFixed(2),
      product: orderData.selectedCategory,
      image: compressedImage,
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
    category: data.category,
    type: data.type,
    mountType: data.mountType,
    dimensions: data.dimensions,
    sectionType: data.sectionType,
    sectionDimensions: data.sectionDimensions,
    sectionModels: data.sectionModels,
    sectionColors: data.sectionColors,
    handles: data.handles || [],
    image: data.image,
    price: data.price,
  });

  return (
    <div className="cartLayout">
      <Table
        orders={orders}
        onDeleteOrder={deleteOrder}
        onGenerate={(order) =>
          handleGenerateAndDownloadPDF(transformOrderDataForPDF(order))
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

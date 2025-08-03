import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { handleGenerateAndDownloadPDF } from "../../utils/downloadPDF";

function CustomerContent() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState({});

  const db = getFirestore();

  useEffect(() => {
    if (!user?.email) return;
    console.log("Logged-in user email:", user?.email);

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const ordersRef = collection(db, "orders");
        const q = query(
          ordersRef,
          where("userEmail", "==", user.email),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  const toggleRow = (orderId, productIndex) => {
    setExpandedRows((prev) => ({
      ...prev,
      [`${orderId}-${productIndex}`]: !prev[`${orderId}-${productIndex}`],
    }));
  };

  const typeMap = {
    right: "To Right",
    left: "To Left",
    fixed: "Fixed",
  };

  if (loading) return <p>Loading your orders...</p>;
  if (orders.length === 0) return <p>No orders found for your account.</p>;

  return (
    <div className="customerTablesContainer">
      <table className="table customerTable">
        <thead>
          <tr className="tableHeaderRow">
            <th>Order Number</th>
            <th>Products</th>
            <th>PDF</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {orders.map((order) => (
            <tr key={order.id} className="tableDataRow">
              <td>{order.orderNumber}</td>
              <td style={{ textAlign: "center" }}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {order.products.map((product, i) => (
                    <li
                      key={i}
                      style={{ marginBottom: "8px", fontSize: ".8rem" }}
                    >
                      Product {i + 1}: {product.category} - {product.type}
                      <button
                        style={{
                          background: "none",
                          padding: "5px",
                          border: "none",
                          color: "#4d5396",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                        onClick={() => toggleRow(order.id, i)}
                      >
                        {expandedRows[`${order.id}-${i}`] ? "▼" : "▶"}
                      </button>
                      {expandedRows[`${order.id}-${i}`] && (
                        <div style={{ marginTop: "5px", marginLeft: "15px" }}>
                          <ul>
                            {product.dimensions && (
                              <li>
                                Dimensions: {product.dimensions.height} x{" "}
                                {product.dimensions.width}
                              </li>
                            )}
                            {Array.isArray(product.sectionType) &&
                              product.sectionType.length > 0 && (
                                <li>
                                  Section Types:{" "}
                                  {product.sectionType
                                    .map((type) => typeMap[type] || type)
                                    .join(", ")}
                                </li>
                              )}
                            {Array.isArray(product.sectionDimensions) &&
                              product.sectionDimensions.length > 0 && (
                                <li>
                                  Section Dimensions:{" "}
                                  {product.sectionDimensions.join(", ")}
                                </li>
                              )}
                            {Array.isArray(product.sectionModels) &&
                              product.sectionModels.length > 0 && (
                                <li>
                                  Section Models:{" "}
                                  {product.sectionModels.join(", ")}
                                </li>
                              )}
                            {Array.isArray(product.sectionColors) &&
                              product.sectionColors.length > 0 && (
                                <li>
                                  Section Colors:{" "}
                                  {product.sectionColors.join(", ")}
                                </li>
                              )}
                            {product.selectedHandle && (
                              <li>Handle: {product.selectedHandle}</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </td>

              <td style={{ textAlign: "center" }}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {order.products.map((product, i) => (
                    <li key={i} style={{ marginBottom: "8px" }}>
                      <button
                        className="tableItemButton"
                        onClick={() => handleGenerateAndDownloadPDF(product)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                          <path d="M10 9H8" />
                          <path d="M16 13H8" />
                          <path d="M16 17H8" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </td>

              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerContent;

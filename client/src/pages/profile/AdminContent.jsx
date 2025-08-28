import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../profile/firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { handleGenerateAndDownloadDXF } from "../../utils/downloadDXF";

function AdminContent() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const { user, loading } = useAuth();

  const typeMap = {};
  const db = getFirestore(app);

  useEffect(() => {
    if (loading || !user || user.role !== "admin") return;

    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const snapshot = await getDocs(ordersRef);
        const orderList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);
        const userList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchOrders();
    fetchUsers();
  }, [db, loading, user]);

  if (loading) return <p>Loading...</p>;
  if (!user || user.role !== "admin") return <p>Access denied</p>;

  const handleDeleteOrderFromFirestore = async (orderId) => {
    try {
      await deleteDoc(doc(db, "orders", orderId));
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  const toggleRow = (orderId, productIndex) => {
    setExpandedRows((prev) => ({
      ...prev,
      [`${orderId}-${productIndex}`]: !prev[`${orderId}-${productIndex}`],
    }));
  };

  return (
    <div className="adminTablesContainer">
      {/* Orders Table */}
      <table className="table ordersTable">
        <thead>
          <tr className="tableHeaderRow">
            <th style={{ width: "20%" }}>Order Number</th>
            <th style={{ width: "30%" }}>Customer</th>
            <th style={{ width: "30%" }}>Product</th>
            <th style={{ width: "5%" }}>CAD</th>
            <th style={{ width: "10%" }}>Summ</th>
            <th style={{ width: "5%" }}>Cancel</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {orders.map((order) => (
            <tr key={order.id} className="tableDataRow">
              <td style={{ width: "19.5%" }}>{order.orderNumber}</td>
              <td style={{ width: "28.5%" }}>{order.userEmail}</td>
              {/*Products*/}
              <td style={{ width: "28.5%", textAlign: "left" }}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {Array.isArray(order.products) &&
                    order.products.map((product, i) => (
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
                                  Dimensions: {product.dimensions.width} x{" "}
                                  {product.dimensions.height}
                                </li>
                              )}
                              {product.sectionType?.length > 0 && (
                                <li>
                                  Section Types:{" "}
                                  {product.sectionType
                                    .map((type) => typeMap[type] || type)
                                    .join(", ")}
                                </li>
                              )}
                              {product.sectionDimensions?.length > 0 && (
                                <li>
                                  Section Dimensions:{" "}
                                  {product.sectionDimensions.join(", ")}
                                </li>
                              )}
                              {product.sectionModels?.length > 0 && (
                                <li>
                                  Section Models:{" "}
                                  {product.sectionModels.join(", ")}
                                </li>
                              )}
                              {product.sectionColors?.length > 0 && (
                                <li>
                                  Section Colors:{" "}
                                  {product.sectionColors.join(", ")}
                                </li>
                              )}
                              {product.handles?.length > 0 && (
                                <li>Handles: {product.handles.join(", ")}</li>
                              )}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                </ul>
              </td>
              {/*CAD*/}
              <td
                style={{
                  width: "6%",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {order.products.map((product, i) => (
                    <li key={i} style={{ marginBottom: "8px" }}>
                      <button
                        className="tableItemButton"
                        onClick={() => handleGenerateAndDownloadDXF(product)}
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
              {/*Total*/}
              <td style={{ width: "10.5%" }}>{order.total}</td>
              {/*Cancel Button*/}
              <td>
                <button
                  className="tableCancelButton"
                  onClick={() => handleDeleteOrderFromFirestore(order.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x-icon lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Users Table */}
      <table className="table userTable">
        <thead>
          <tr className="tableHeaderRow">
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {users.map((user) => (
            <tr className="tableDataRow" key={user.id}>
              <td>{user.email}</td>
              <td>
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminContent;

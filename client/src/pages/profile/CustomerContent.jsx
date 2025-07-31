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

function CustomerContent() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

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
  }, [user, db]);

  if (loading) {
    return <p>Loading your orders...</p>;
  }

  if (!user) {
    return <p>Please log in to see your orders.</p>;
  }

  if (orders.length === 0) {
    return <p>No orders found for your account.</p>;
  }

  return (
    <div className="customerTablesContainer">
      <table className="table customerTable">
        <thead>
          <tr className="tableHeaderRow">
            <th>Order Number</th>
            <th>Products</th>
            <th>Specifications</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {orders.map((order) => (
            <tr key={order.id} className="tableDataRow">
              <td>{order.orderNumber}</td>

              <td>
                <ul>
                  {order.products.map((product, i) => (
                    <li key={i}>
                      {product.category} - {product.type}
                    </li>
                  ))}
                </ul>
              </td>

              <td>
                <ul>
                  {order.products.map((product, i) => (
                    <li key={i}>
                      <strong>Product {i + 1}:</strong>
                      <ul>
                        {product.dimensions && (
                          <li>
                            Dimensions: {product.dimensions.height} x{" "}
                            {product.dimensions.width}
                          </li>
                        )}
                        {product.sectionType &&
                          product.sectionType.length > 0 && (
                            <li>
                              Section Types: {product.sectionType.join(", ")}
                            </li>
                          )}
                        {product.sectionDimensions &&
                          product.sectionDimensions.length > 0 && (
                            <li>
                              Section Dimensions:{" "}
                              {product.sectionDimensions.join(", ")}
                            </li>
                          )}
                        {product.sectionModels &&
                          product.sectionModels.length > 0 && (
                            <li>
                              Section Models: {product.sectionModels.join(", ")}
                            </li>
                          )}
                        {product.sectionColors &&
                          product.sectionColors.length > 0 && (
                            <li>
                              Section Colors: {product.sectionColors.join(", ")}
                            </li>
                          )}
                        {product.handles && product.handles.length > 0 && (
                          <li>Handles: {product.handles.join(", ")}</li>
                        )}
                      </ul>
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

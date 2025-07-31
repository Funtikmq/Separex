import { useEffect, useState } from "react";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { app } from "../profile/firebase/firebase";

function AdminContent() {
  const [users, setUsers] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userRef = collection(db, "users");
        const snapshot = await getDocs(userRef);
        const userList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="adminTablesContainer">
        <table className="table ordersTable">
          <thead>
            <tr className="tableHeaderRow">
              <th>Order Number</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Specifications</th>
              <th>Summ</th>
              <th>Cancel</th>
            </tr>
          </thead>
        </table>

        <table className="table userTable">
          <thead>
            <tr className="tableHeaderRow">
              <th>User</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="tableDataRow" key={user.id}>
                <td>{user.email}</td>
                <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminContent;

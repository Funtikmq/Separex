import { auth, signOut } from "./firebase/firebase";

function CustomerContent() {
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <table className="customerTable">
        <thead>
          <tr className="customerTableHeaderRow">
            <th>Order Number</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Docs</th>
          </tr>
        </thead>
        <tbody className="customerTableBody"></tbody>
      </table>
      <div className="authorizationContainer">
        <button className="authorizationButton" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </>
  );
}

export default CustomerContent;

function Table({ orders, onDeleteOrder, onGenerate, onConfirmOrder }) {
  console.log(orders[0]);

  return (
    <table className="table">
      <thead>
        <tr className="tableHeaderRow">
          <th>Product</th>
          <th>Type</th>
          <th>PDF</th>
          <th>Quantity</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="tableBody">
        {orders.map((order, index) => (
          <tr key={index} className="tableDataRow">
            <td>{order.product || order.category}</td>
            <td>{order.type}</td>
            <td>
              <button
                className="tableItemButton"
                onClick={() => onGenerate(order)}
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
            </td>
            <td>{order.quantity}</td>
            <td>{order.price}</td>
            <td>
              <button
                className="tableCancelButton"
                onClick={() => onDeleteOrder(index)}
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
      <tfoot>
        <tr className="tableFooterRow">
          <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>
            Total:
            {orders
              .reduce((sum, order) => sum + (parseFloat(order.price) || 0), 0)
              .toFixed(2)}
          </td>
          <td>
            <button className="tableSubmitButton" onClick={onConfirmOrder}>
              Confirm Order
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Table;

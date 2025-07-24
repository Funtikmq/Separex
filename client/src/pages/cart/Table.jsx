function Table({ orders, onDeleteOrder }) {
  return (
    <table className="table">
      <thead>
        <tr className="tableHeaderRow">
          <th>Product</th>
          <th>Type</th>
          <th>Docs</th>
          <th>Quantity</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="tableBody">
        {orders.map((order, index) => (
          <tr key={index} className="tableDataRow">
            <td>{order.product}</td>
            <td>{order.type}</td>
            <td>docs</td>
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
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-x-icon lucide-x"
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
            <button className="tableSubmitButton">Trimite comanda</button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Table;

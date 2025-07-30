function Order({ data, quantity, onSave, onQuantityChange, user }) {
  const sectionCount = data.sectionCount || 1;

  const renderRow = (label, values, keyPrefix) => (
    <tr className="orderTableRow">
      <th className="orderTableHead">{label}</th>
      {Array.from({ length: sectionCount }, (_, i) => (
        <td key={`${keyPrefix}-${i}`}>{values?.[i] || "-"}</td>
      ))}
    </tr>
  );

  return (
    <table className="orderTable">
      <tbody>
        {/* Primele 3 rânduri simple */}
        <tr className="orderTableRow">
          <th className="orderTableHead">Category</th>
          <td colSpan={sectionCount}>{data.selectedCategory}</td>
        </tr>
        <tr className="orderTableRow">
          <th className="orderTableHead">Type</th>
          <td colSpan={sectionCount}>{data.selectedType}</td>
        </tr>
        <tr className="orderTableRow">
          <th className="orderTableHead">Dimensions</th>
          <td colSpan={sectionCount}>
            {data.doorDimensions.width} x {data.doorDimensions.height}
          </td>
        </tr>

        {/* Header cu secțiunile */}
        <tr className="orderTableRow">
          <th className="orderTableHead">Section</th>
          {Array.from({ length: sectionCount }, (_, i) => {
            let label = `${i + 1}`;
            if (data.selectedType === "2-Part Element O") {
              label = i === 0 ? "Top" : "Bottom";
            } else if (data.selectedType === "4-Part Element O") {
              const labels = [
                "Top Left",
                "Top Right",
                "Bottom Left",
                "Bottom Right",
              ];
              label = labels[i] || `${i + 1}`;
            } else if (data.selectedType?.includes("Part Element A")) {
              label = i === 0 ? "Top" : `${i + 1}`;
            }
            return <td key={`section-${i}`}>{label}</td>;
          })}
        </tr>

        {renderRow(
          "Opening Direction",
          data.sectionTypes?.map((val) => {
            if (val === "right") return "To Right";
            if (val === "left") return "To Left";
            if (val === "fixed") return "Fixed";
            return val;
          }),
          "dir"
        )}
        {renderRow(
          "Section Dimensions",
          data.sectionDimensions?.map((dim, index, dims) => {
            if (data.selectedType === "2-Part Element O") {
              return `${data.doorDimensions.width} x ${dim}`;
            } else if (data.selectedType === "4-Part Element O") {
              const combinations = [
                `${dims[2]} x ${dims[0]}`,
                `${dims[3]} x ${dims[0]}`,
                `${dims[2]} x ${data.doorDimensions.height - dims[0]}`,
                `${dims[3]} x ${data.doorDimensions.height - dims[0]}`,
              ];
              return combinations[index] || "-";
            } else if (data.selectedType.includes("Part Element A")) {
              if (index === 0) {
                return `${data.doorDimensions.width} x ${dims[0]}`;
              } else {
                return `${dims[index]} x ${
                  data.doorDimensions.height - dims[0]
                }`;
              }
            } else {
              // Default case
              return `${dim} x ${data.doorDimensions.height}`;
            }
          }),
          "dim"
        )}
        {renderRow("Model", data.sectionModels, "model")}
        {renderRow("Color", data.sectionColors, "color")}
        {renderRow("Handle", data.selectedHandle, "handle")}

        {/* Rând final cu buton + input */}
        <tr className="orderTableRow">
          <td colSpan={sectionCount}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "30% 40%",
                gap: "10px",
                padding: "12px",
              }}
            >
              <button
                className="saveButton"
                onClick={() => {
                  if (!user) {
                    alert("To Save Your Order, Log In First");
                    return;
                  }
                  onSave();
                }}
              >
                Save
              </button>
              <input
                className="orderInput"
                type="number"
                value={quantity === "" ? "" : quantity}
                onChange={(e) => onQuantityChange(e)}
              />
            </div>
          </td>
          <td>
            <p>{user && <p>Price : </p>}</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Order;

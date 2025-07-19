import { useEffect, useState } from "react";

function Order() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("cartData");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return <p>Loading order...</p>;
  }

  const sectionCount = data.sectionCount || 1;
  const colWidth = `${100 / (sectionCount + 1)}%`;

  const renderRow = (label, values, keyPrefix) => (
    <tr className="tableRow">
      <th className="tableHead" style={{ width: colWidth }}>
        {label}
      </th>
      {Array.from({ length: sectionCount }, (_, i) => (
        <td key={`${keyPrefix}-${i}`} style={{ width: colWidth }}>
          {values?.[i] || "-"}
        </td>
      ))}
    </tr>
  );

  return (
    <table
      className="orderTable"
      style={{ tableLayout: "fixed", width: "100%" }}
    >
      <tbody>
        {/* Primele 3 rânduri simple */}
        <tr className="tableRow">
          <th className="tableHead" style={{ width: colWidth }}>
            Category
          </th>
          <td colSpan={sectionCount}>{data.selectedCategory}</td>
        </tr>
        <tr className="tableRow">
          <th className="tableHead" style={{ width: colWidth }}>
            Type
          </th>
          <td colSpan={sectionCount}>{data.selectedType}</td>
        </tr>
        <tr className="tableRow">
          <th className="tableHead" style={{ width: colWidth }}>
            Dimensions
          </th>
          <td colSpan={sectionCount}>
            {data.doorDimensions.width} x {data.doorDimensions.height}
          </td>
        </tr>

        {/* Header cu secțiunile */}
        <tr className="tableRow">
          <th className="tableHead" style={{ width: colWidth }}>
            Section
          </th>
          {Array.from({ length: sectionCount }, (_, i) => (
            <td key={`section-${i}`} style={{ width: colWidth }}>
              {i + 1}
            </td>
          ))}
        </tr>

        {renderRow("Opening Direction", data.sectionTypes, "dir")}
        {renderRow(
          "Section Dimensions",
          data.sectionDimensions?.map(
            (dim) => `${dim} x ${data.doorDimensions.height}`
          ),
          "dim"
        )}
        {renderRow("Model", data.sectionModels, "model")}
        {renderRow("Color", data.sectionColors, "color")}
        {renderRow("Handle", data.selectedHandle, "handle")}

        {/* Rând final cu buton + input */}
        <tr className="tableRow">
          <td colSpan={sectionCount + 1}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "30% 70%",
                gap: "10px",
                padding: "12px",
              }}
            >
              <button className="saveButton">Save</button>
              <input
                type="text"
                placeholder="Amount"
                style={{ width: "20%" }}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Order;

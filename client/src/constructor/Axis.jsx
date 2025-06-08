function Axis({ width, height, realWidth, realHeight,borderPx }) {
  
  return (
    <>
      <div
        className="AxisX"
        style={{
          width: `${(width-2*borderPx)/16}rem`,
          position: "absolute",
          bottom: `${-(30)/16}rem`,
          left:borderPx,
        }}
      >
        <span id="xAxisLabel" className="AxisLabel">{realWidth}</span>
      </div>
      <div
        className="AxisY"
        style={{
          height: `${(height-2*borderPx)/16}rem`,
          position: "absolute",
          left: `${(width + 70)/16}rem`,
          bottom:0
        }}
      >
        <span id="yAxisLabel" className="AxisLabel">{realHeight}</span>
      </div>
    </>
  );
}

export default Axis;

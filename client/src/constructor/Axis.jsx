function Axis({ realWidth, realHeight,borderPx,scaled }) {
  
  return (
    <>
      <div
        className="AxisX"
        style={{
          width: `${(scaled.scaledWidth)/15}rem`,
          position: "absolute",
          bottom: `${-30/16}rem`,
          left:0,
        }}
      >
        <span id="xAxisLabel" className="AxisLabel">{realWidth}</span>
      </div>
      <div
        className="AxisY"
        style={{
          height: `${(scaled.scaledHeight-2*borderPx)/16}rem`,
          position: "absolute",
          left: `${(scaled.scaledWidth*1.3)/16}rem`,
          bottom:0
        }}
      >
        <span id="yAxisLabel" className="AxisLabel">{realHeight}</span>
      </div>
    </>
  );
}

export default Axis;

function Axis({ realWidth, realHeight,borderPx,scaled }) {
  
  return (
    <>
      <div
        className="AxisX"
        style={{
          width: `100%`,
          position: "absolute",
          bottom: `-3rem`,
          left:0,
        }}
      >
        <span id="xAxisLabel" className="AxisLabel">{realWidth}</span>
      </div>
      <div
        className="AxisY"
        style={{
          height: `100%`,
          position: "absolute",
          right: `-3rem`,
          bottom:-borderPx
        }}
      >
        <span id="yAxisLabel" className="AxisLabel">{realHeight}</span>
      </div>
    </>
  );
}

export default Axis;

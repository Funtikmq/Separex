function Axis({ realWidth, realHeight, borderPx }) {
  return (
    <>
      <div className="AxisX">
        <span className="AxisLabel">{realWidth}</span>
      </div>
      <div className="AxisY">
        <span className="AxisLabel">{realHeight}</span>
      </div>
    </>
  );
}

export default Axis;

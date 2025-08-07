function Axis({ realWidth, realHeight, scaled, slidingMountType }) {
  let totalHeight = `${scaled.scaledHeight / 16}rem`;

  if (slidingMountType === "In wall") {
    totalHeight = `${scaled.scaledHeight / 16.2}rem`;
  } else {
    totalHeight = `${scaled.scaledHeight / 16}rem`;
  }

  return (
    <>
      <div className="axisX">
        <span className="axisLabel">{realWidth}</span>
      </div>
      <div
        className="axisY total"
        style={{ height: `${totalHeight}`, right: "-3rem" }}
      >
        <p>
          Wall
          <br />
          GAP
        </p>
        <span className="axisLabel">{realHeight + 10}</span>
      </div>
      <div className="axisY">
        <span className="axisLabel">{realHeight}</span>
      </div>
    </>
  );
}

export default Axis;

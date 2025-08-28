function Axis({ realWidth, realHeight, scaled, slidingMountType }) {
  let totalHeight = `${scaled.scaledHeight / 16}rem`;
  let totalWidth = `${scaled.scaledWidth / 16}rem`;

  if (slidingMountType === "In wall") {
    totalHeight = `${scaled.scaledHeight / 16.2}rem`;
    totalWidth = `${scaled.scaledWidth / 16.2}rem`;
  } else {
    totalHeight = `${scaled.scaledHeight / 16}rem`;
    totalWidth = `${scaled.scaledWidth / 16}rem`;
  }

  return (
    <>
      <div
        className="axisX total"
        style={{
          width: `${totalWidth}`,
          top: "-1.5rem",
          left: "0",
          zIndex: "2",
        }}
      >
        <p>
          Wall
          <br />
          GAP
        </p>
        <span className="axisLabel">{realWidth}</span>
      </div>
      <div className="axisX">
        <span className="axisLabel">{realWidth - 10}</span>
      </div>
      <div
        className="axisY total"
        style={{ height: `${totalHeight}`, right: "-4rem", bottom: "0" }}
      >
        <p>
          Wall
          <br />
          GAP
        </p>
        <span className="axisLabel">{realHeight}</span>
      </div>
      <div className="axisY">
        <span className="axisLabel">{realHeight - 10}</span>
      </div>
    </>
  );
}

export default Axis;

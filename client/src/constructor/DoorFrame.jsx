import TopBar from "./TopBar.jsx";
import Axis from "./Axis.jsx";
import SectionRenderer from "./SectionRender.jsx";

function DoorFrame({
  scaled,
  width,
  height,
  selectedCategory,
  slidingMountType,
  selectedType,
  sectionCount,
  selectedIndex,
  onClick
}) {
  const doorPadding = `${1 / 16}rem`;
  const isOnWall = slidingMountType === "On wall";

  // === Stiluri pentru ușă ===
  const doorStyle = {
    marginTop:
      selectedCategory === "Sliding Doors"
        ? `${isOnWall ? scaled.borderPx/14 : 0}rem`
        : "0px",

    height:
      selectedCategory === "Sliding Doors"
        ? `${isOnWall
            ? (scaled.scaledHeight - 3 * scaled.borderPx) / 16
            : scaled.scaledHeight / 16}rem`
        : `${scaled.scaledHeight / 16}rem`,

    width: `${scaled.scaledWidth / 16}rem`,
    position: "relative",
    zIndex: 1,
    border: `${scaled.borderPx}px solid #222`,
    backdropFilter: "blur(2px)",
    background: `linear-gradient(225deg, rgba(0, 0, 0, 0.4) 30%, rgba(255, 253, 253, 0.2) 100%)`,
    boxSizing: "border-box",
    transition: "0.3s"
  };

  // === Stiluri pentru containerul ușii ===
  const doorContainerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    padding:
      selectedCategory === "Swing Doors"
        ? `${doorPadding} ${doorPadding} 0`
        : "0",
    backgroundColor: "transparent",
    boxSizing: "border-box",
    borderTop:
      selectedCategory === "Swing Doors"
        ? `${scaled.borderPx}px solid #222`
        : undefined,
    borderLeft:
      selectedCategory === "Swing Doors"
        ? `${scaled.borderPx}px solid #333`
        : undefined,
    borderRight:
      selectedCategory === "Swing Doors"
        ? `${scaled.borderPx}px solid #111`
        : undefined,
    zIndex: 3,
    boxShadow: "2px 2px 5px 1px rgba(0, 0, 0)"
  };

  return (
    <div className="constructorContainer">
      <div className="doorConture">
        <div className="doorContainer" style={doorContainerStyle}>
          <TopBar
            category={selectedCategory}
            mountType={slidingMountType}
            scaledWidth={scaled.scaledWidth}
            selectedType={selectedType}
            borderPx={scaled.borderPx}
          />

          <div className="constructorDoor" style={doorStyle}>
            <SectionRenderer
              selectedType={selectedType}
              scaled={scaled}
              sectionCount={sectionCount}
              selectedIndex={selectedIndex}
              onClick={onClick}
            />
          </div>

          <Axis
            width={scaled.scaledWidth + (1 / 16) * 2}
            height={scaled.scaledHeight}
            realWidth={width}
            realHeight={height}
            borderPx = {scaled.borderPx}
          />
        </div>
      </div>
    </div>
  );
}

export default DoorFrame;

import { forwardRef } from "react";
import TopBar from "./TopBar.jsx";
import Axis from "./Axis.jsx";
import SectionRenderer from "./section/SectionRender.jsx";

const DoorFrame = forwardRef(({
  doorDimensions,
  scaled,
  selectedCategory,
  slidingMountType,
  selectedType,
  sectionCount,
  selectedIndex,
  sectionModels,
  sectionColors,
  selectionVisible,
  setSelectionVisible,
  selectedHandle,
  width,
  height,
  onClick,
  sectionDimensions,
  setSectionDimensions,
  sectionTypes,
  setSectionTypes,
}, ref) => {
  
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

    width: `${scaled.scaledWidth / 15}rem`,
    position: "relative",
    zIndex: 1,
    border: `${scaled.borderPx}px solid #222`,
    backdropFilter: "blur(2px)",
    background: `linear-gradient(225deg, rgba(103, 102, 102, 0.4) 30%, rgba(255, 253, 253, 0.2) 100%)`,
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

const doorContureStyle = {
  borderTop: `${scaled.borderPx / 8}rem solid #c3c2c2`,
  borderLeft: `${scaled.borderPx / 8}rem solid #c3c2c2`,
  borderRight: `${scaled.borderPx / 8}rem solid #c3c2c2`,
  position: "relative",
  zIndex: 2,
  boxSizing: "border-box"
};
 
const wallContourThickness = scaled.borderPx / 16;

const wallContureStyle = {
  position: "absolute",
  top: `-${wallContourThickness * 2}rem`,
  left: `-${wallContourThickness*2}rem`,
  width: `calc(100% + ${wallContourThickness * 4}rem)`,
  height: `calc(100% + ${wallContourThickness * 2}rem)`,
  pointerEvents: "none",
  borderTop: `${wallContourThickness/2}rem solid #fff`,
  borderLeft: `${wallContourThickness/2}rem solid #fff`,
  borderRight: `${wallContourThickness/2}rem solid #fff`,
  zIndex: 1,
  boxSizing: "border-box"
};

  return (
    <div className="constructorContainer">
      <div  className="doorConture" style={doorContureStyle}>
        <div style={wallContureStyle}></div>
        <div className="doorContainer" style={doorContainerStyle} ref={ref}>
          <TopBar
            category={selectedCategory}
            mountType={slidingMountType}
            scaledWidth={scaled.scaledWidth}
            selectedType={selectedType}
            borderPx={scaled.borderPx}
          />

          <div className="constructorDoor" style={doorStyle} ref={ref}>
            <SectionRenderer
              selectedCategory={selectedCategory}
              selectedType={selectedType}
              scaled={scaled}
              sectionCount={sectionCount}
              selectedIndex={selectedIndex}
              sectionModels={sectionModels}
              sectionColors={sectionColors}
              selectionVisible={selectionVisible}
              setSelectionVisible={setSelectionVisible}
              selectedHandle={selectedHandle}
              onClick={onClick}
              sectionDimensions={sectionDimensions}
              setSectionDimensions={setSectionDimensions}
              doorDimensions={doorDimensions}
              orientation={selectedCategory === "Fixed Wall" ? "horizontal" : "vertical"}
              sectionTypes={sectionTypes}
              setSectionTypes={setSectionTypes}
            />
            <Axis
              realWidth={width}
              realHeight={height}
              borderPx = {scaled.borderPx}
              scaled= {scaled}
            />
          </div>
        </div>
      </div>
    </div>
  );  
});

export default DoorFrame;

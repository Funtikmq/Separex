import { forwardRef } from "react";
import TopBar from "./TopBar.jsx";
import Axis from "./Axis.jsx";
import SectionRenderer from "./section/SectionRender.jsx";

const DoorFrame = forwardRef(
  (
    {
      doorDimensions,
      scaled,
      selectedCategory,
      slidingMountType,
      slidingType,
      selectedType,
      sectionCount,
      selectedIndex,
      sectionModels,
      sectionColors,
      profileColor,
      selectionVisible,
      setSelectionVisible,
      selectedHandle,
      setSelectedHandle,
      width,
      height,
      onClick,
      sectionDimensions,
      setSectionDimensions,
      sectionTypes,
      setSectionTypes,
      onLinePositionsChange,
      linePositions,
    },
    ref
  ) => {
    const isOnWall = slidingMountType === "In wall";

    // === Stiluri pentru ușă ===
    const doorStyle = {
      marginTop:
        selectedCategory === "Sliding Doors"
          ? `${isOnWall ? scaled.borderPx / 14 : 0}rem`
          : "0px",

      height:
        selectedCategory === "Sliding Doors"
          ? `${
              isOnWall
                ? (scaled.scaledHeight - 3 * scaled.borderPx) / 16
                : scaled.scaledHeight / 16
            }rem`
          : `${scaled.scaledHeight / 16}rem`,

      width: `${scaled.scaledWidth / 16}rem`,
      position: "relative",
      zIndex: 1,
      backdropFilter: "blur(2px)",
      background: `linear-gradient(225deg, rgba(103, 102, 102, 0.4) 30%, rgba(255, 253, 253, 0.2) 100%)`,
      boxSizing: "border-box",
      transition: "0.3s",
    };

    const doorContureStyle = {
      position: "relative",
      zIndex: 2,
      boxSizing: "border-box",
    };

    const wallContourThickness = scaled.borderPx / 16;

    const wallContureStyle = {
      position: "absolute",
      top: `-${wallContourThickness * 2}rem`,
      left: `-${wallContourThickness * 2}rem`,
      width: `calc(100% + ${wallContourThickness * 4}rem)`,
      height: `calc(100% + ${wallContourThickness * 2}rem)`,
      pointerEvents: "none",
      zIndex: 1,
      boxSizing: "border-box",
    };

    return (
      <div className="constructorContainer">
        <div className="doorConture" style={doorContureStyle}>
          <div style={wallContureStyle}></div>
          <TopBar
            category={selectedCategory}
            mountType={slidingMountType}
            scaledWidth={scaled.scaledWidth}
            selectedType={selectedType}
            borderPx={scaled.borderPx}
            profileColor={profileColor}
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
              profileColor={profileColor}
              selectionVisible={selectionVisible}
              setSelectionVisible={setSelectionVisible}
              selectedHandle={selectedHandle}
              setSelectedHandle={setSelectedHandle}
              onClick={onClick}
              sectionDimensions={sectionDimensions}
              setSectionDimensions={setSectionDimensions}
              doorDimensions={doorDimensions}
              sectionTypes={sectionTypes}
              setSectionTypes={setSectionTypes}
              slidingMountType={slidingMountType}
              slidingType={slidingType}
              onLinePositionsChange={onLinePositionsChange}
              linePositions={linePositions}
            />
            <Axis
              realWidth={width}
              realHeight={height}
              borderPx={scaled.borderPx}
              scaled={scaled}
              slidingMountType={slidingMountType}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default DoorFrame;

import { useState, useRef, useEffect } from "react";
import { useScaledDimensions } from "./useScaledDimensions";
import DoorFrame from "./DoorFrame";

function Constructor({
  doorDimensions,
  sectionCount,
  selectedCategory,
  slidingMountType,
  selectedIndex,
  setSelectedIndex,
  selectedType,
  sectionColors,
  sectionModels,
  selectedHandle,
  doorFrameRef,
  sectionDimensions
}) {
  const { height, width } = doorDimensions;
  const scaled = useScaledDimensions(height, width);

  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [selectionVisible, setSelectionVisible] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setContainerSize({ width: offsetWidth, height: offsetHeight });
    }
  }, [scaled]);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (doorFrameRef.current && !doorFrameRef.current.contains(event.target)) {
      setSelectionVisible(false); // Ascunde evidențierea, dar păstrează selecția
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [doorFrameRef]);


  const { width: containerWidth, height: containerHeight } = containerSize;
  const doorWidth = scaled.scaledWidth;
  const doorHeight = scaled.scaledHeight;

  const doorLeft = (containerWidth - doorWidth) / 2;
  const doorRight = doorLeft + doorWidth;
  const doorBottom = containerHeight;
  const doorTop = doorBottom - doorHeight;

  const wallPadding = scaled.borderPx *2;
  
  const wallClipPath =
  containerWidth && containerHeight
    ? `polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        ${(doorRight + wallPadding)/15.9}rem 100%,
        ${(doorRight + wallPadding)/15.9}rem ${doorTop -0.1 * containerHeight}px,
        ${(doorLeft - wallPadding)/16.15}rem ${doorTop  -0.1 * containerHeight}px,
        ${(doorLeft - wallPadding)/16.15}rem 100%,
        0% 100%
      )`
    : "none";

  return (
    <div className="constructor">
      <div className="constructorContent" ref={containerRef}>
        <div className="constructorFloor"></div>

        {wallClipPath !== "none" && (
          <div
            className="constructorWall"
            style={{
              clipPath: wallClipPath,
              backgroundColor: "#f4f4f6",
              backgroundSize:"cover",
              position: "absolute",
              width: "100%",
              height: "calc(100% - 8vh)",
              top: 0,
              left: 0,
              zIndex: 2,
              pointerEvents: "none",
              borderBottom: ".2vh solid #555",
            }}
            />
        )}

        <DoorFrame
          ref={doorFrameRef} 
          scaled={scaled}
          width={width}
          height={height}
          selectedCategory={selectedCategory}
          slidingMountType={slidingMountType}
          selectedType={selectedType}
          sectionCount={sectionCount}
          selectedIndex={selectedIndex}
          sectionModels={sectionModels}
          sectionColors={sectionColors}
          selectionVisible={selectionVisible}
          setSelectionVisible={setSelectionVisible}
          selectedHandle={selectedHandle}
          onClick={setSelectedIndex}
          sectionDimensions={sectionDimensions}
        />
      </div>

      <div className="constructorInfo">
        <h4 className="constructorInfoText">Category: {selectedCategory}</h4>
        <h4 className="constructorInfoText">Handles: </h4>
        <h4 className="constructorInfoText">Size: {width} x {height} </h4>
        <h4 className="constructorInfoText">Models: {sectionModels}</h4>
        <h4 className="constructorInfoText">Type: {selectedType}</h4>
        <h4 className="constructorInfoText">Colors: {sectionColors}</h4>
      </div>
    </div>
  );
}

export default Constructor;

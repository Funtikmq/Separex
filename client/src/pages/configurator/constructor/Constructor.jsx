import { useState, useRef, useEffect } from "react";
import { useScaledDimensions } from "./hooks/useScaledDimensions";
import DoorFrame from "./DoorFrame";
import ConstructorInfo from "./ConstructorInfo";

function Constructor({
  doorDimensions,
  sectionCount,
  selectedCategory,
  slidingMountType,
  slidingType,
  selectedIndex,
  setSelectedIndex,
  selectedType,
  sectionColors,
  profileColor,
  sectionModels,
  selectedHandle,
  setSelectedHandle,
  doorFrameRef,
  sectionDimensions,
  setSectionDimensions,
  sectionTypes,
  setSectionTypes,
}) {
  const { height, width } = doorDimensions;
  const scaled = useScaledDimensions(height, width);

  const doorDrawingRef = useRef();
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [selectionVisible, setSelectionVisible] = useState(false);

  // Pozitiile pentru modele
  const [linePositions, setLinePositions] = useState({});

  const handleLinePositionsUpdate = (sectionIndex, modelName, positions) => {
    setLinePositions((prev) => {
      const newPositions = { ...prev };

      // Setăm direct valorile pentru secțiunea și modelul specific
      newPositions[sectionIndex] = {
        modelName, // salvăm numele modelului
        positions, // salvăm pozițiile
      };
      return newPositions;
    });
  };

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setContainerSize({ width: offsetWidth, height: offsetHeight });
    }
  }, [scaled]);

  const setRefs = (el) => {
    containerRef.current = el;
    doorDrawingRef.current = el;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        doorFrameRef.current &&
        !doorFrameRef.current.contains(event.target)
      ) {
        setSelectionVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [doorFrameRef]);

  const { width: containerWidth, height: containerHeight } = containerSize;
  const doorWidth = scaled.scaledWidth;
  const doorHeight = scaled.scaledHeight;

  const doorLeft = (containerWidth - doorWidth) / 2;
  const doorRight = doorLeft + doorWidth;
  const doorBottom = containerHeight;
  const doorTop = doorBottom - doorHeight;

  const wallPadding = scaled.borderPx / 4;

  const wallClipPath =
    containerWidth && containerHeight
      ? `polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        ${(doorRight + wallPadding - 3) / 16}rem 100%,
        ${(doorRight + wallPadding - 3) / 16}rem ${
          (doorTop - 0.05 * containerHeight) / 16
        }rem,
        ${(doorLeft - wallPadding + 3) / 16}rem ${
          (doorTop - 0.05 * containerHeight) / 16
        }rem,
        ${(doorLeft - wallPadding + 3) / 16}rem 100%,
        0% 100%
      )`
      : "none";

  return (
    <div className="constructor">
      <div className="constructorContent" ref={setRefs}>
        <div className="constructorFloor"></div>

        {wallClipPath !== "none" && (
          <div
            style={{
              clipPath: wallClipPath,
              background: "#f4f4f6", //  linear-gradient(135deg, #f4f4f6, #b8dcf5ff)
              backgroundSize: "cover",
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
          doorDimensions={doorDimensions}
          scaled={scaled}
          width={width}
          height={height}
          selectedCategory={selectedCategory}
          slidingMountType={slidingMountType}
          slidingType={slidingType}
          selectedType={selectedType}
          sectionCount={sectionCount}
          selectedIndex={selectedIndex}
          sectionModels={sectionModels}
          sectionColors={sectionColors}
          profileColor={profileColor}
          selectionVisible={selectionVisible}
          setSelectionVisible={setSelectionVisible}
          selectedHandle={selectedHandle}
          setSelectedHandle={setSelectedHandle}
          onClick={setSelectedIndex}
          sectionDimensions={sectionDimensions}
          setSectionDimensions={setSectionDimensions}
          sectionTypes={sectionTypes}
          setSectionTypes={setSectionTypes}
          onLinePositionsChange={handleLinePositionsUpdate}
          linePositions={linePositions}
        />
      </div>

      <ConstructorInfo
        doorDimensions={doorDimensions}
        selectedCategory={selectedCategory}
        selectedType={selectedType}
        sectionCount={sectionCount}
        sectionModels={sectionModels}
        sectionColors={sectionColors}
        selectedHandle={selectedHandle}
        selectedIndex={selectedIndex}
        slidingMountType={slidingMountType}
        sectionDimensions={sectionDimensions}
        sectionTypes={sectionTypes}
        linePositions={linePositions}
        doorRef={doorDrawingRef}
      />
    </div>
  );
}

export default Constructor;

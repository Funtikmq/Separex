import { useState, useRef, useEffect } from "react";
import { useScaledDimensions } from "./useScaledDimensions";
import DoorFrame from "./DoorFrame";

function Constructor({
  doorDimensions,
  sectionCount,
  selectedCategory,
  slidingMountType,
  selectedType
}) {
  // === Extrage dimensiuni inițiale ===
  const { height, width } = doorDimensions;
  const [selectedIndex, setSelectedIndex] = useState(null);

  // === Calculează dimensiuni scalate ale ușii ===
  const scaled = useScaledDimensions(height, width);

  // === Ref și dimensiuni pentru container ===
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setContainerSize({ width: offsetWidth, height: offsetHeight });
    }
  }, [scaled]);

  // === Poziționare ușă în container ===
  const { width: containerWidth, height: containerHeight } = containerSize;

  const doorWidth = scaled.scaledWidth;
  const doorHeight = scaled.scaledHeight;

  const doorLeft = (containerWidth - doorWidth) / 2;
  const doorRight = doorLeft + doorWidth;
  const doorBottom = containerHeight;
  const doorTop = doorBottom - doorHeight;

  // === ClipPath pentru peretele decupat ===
  const wallClipPath =
    containerWidth && containerHeight
      ? `polygon(
          0% 0%,
          100% 0%,
          100% 100%,
          calc(${doorRight}px + 0.4vw) 100%,
          calc(${doorRight}px + 0.4vw) calc(${doorTop}px - 7vh),
          calc(${doorLeft}px - 0.4vw) calc(${doorTop}px - 7vh),
          calc(${doorLeft}px - 0.4vw) 100%,
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
              backgroundColor: "#ccc",
              position: "absolute",
              width: "100%",
              height: "calc(100% - 8vh)",
              top: 0,
              left: 0,
              zIndex: 2,
              pointerEvents: "none"
            }}
          />
        )}

        <DoorFrame
          scaled={scaled}
          width={width}
          height={height}
          selectedCategory={selectedCategory}
          slidingMountType={slidingMountType}
          selectedType={selectedType}
          sectionCount={sectionCount}
          selectedIndex={selectedIndex}
          onClick={setSelectedIndex}
        />
      </div>

      <div className="constructorInfo"></div>
    </div>
  );
}

export default Constructor;

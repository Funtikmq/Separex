import React from "react";
import Section from "../Section.jsx";
import {
  getSectionColor,
  getModelOverlay,
  getHandleOverlay,
} from "../utils/sectionRenderUtils.js";

export function DefaultSectionLayout({
  dimensions,
  scaled,
  sectionColors,
  sectionModels,
  isSelected,
  onClick,
  setSelectionVisible,
  sectionCount,
  isResizing,
  resizingIndex,
  handleSectionResizeStart,
  selectedCategory,
  selectedType,
  sectionDimensions,
  doorDimensions,
  selectedHandle,
  sectionTypes,
  slidingMountType,
  renderSectionTypeRadio = () => null,
}) {
  const SLIDING_DOOR_GAP =
    slidingMountType === "In wall" ? scaled.borderPx / 200 : 0;
  const isSlidingDoor = selectedCategory === "Sliding Doors";
  const isSwingDoor = selectedCategory === "Swing Doors";
  const isFixedWall = selectedCategory === "Fixed Wall";

  const widths = React.useMemo(() => {
    const totalGap = (sectionCount - 1) * SLIDING_DOOR_GAP;

    if (dimensions.widths && dimensions.widths.length === sectionCount) {
      const availableWidth = 100 - (isSlidingDoor ? totalGap : 0);
      return dimensions.widths.map((width) => (width * availableWidth) / 100);
    }

    // altfel, împărțim egal spațiul rămas
    const availableWidth = 100 - (isSlidingDoor ? totalGap : 0);
    const sectionWidth = availableWidth / sectionCount;
    return Array(sectionCount).fill(sectionWidth);
  }, [dimensions.widths, sectionCount, isSlidingDoor]);

  return (
    <div
      id="sections-container"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "visible",
        gap: isSlidingDoor ? `${SLIDING_DOOR_GAP}rem` : 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      {[...Array(sectionCount).keys()].map((i) => {
        const isMobile =
          isSwingDoor &&
          (sectionTypes[i] === "right" || sectionTypes[i] === "left");
        const isNextMobile =
          isSwingDoor &&
          i < sectionCount - 1 &&
          (sectionTypes[i + 1] === "right" || sectionTypes[i + 1] === "left");
        const isPrevMobile =
          isSwingDoor &&
          i > 0 &&
          (sectionTypes[i - 1] === "right" || sectionTypes[i - 1] === "left");

        const borderSize = scaled.borderPx / 16;
        const extraBorderSize = scaled.borderPx / 32;

        // Inițializăm margin și border
        let marginLeft = 0;
        let marginRight = 0;
        let borderTop = "none";
        let borderRight = "none";
        let borderLeft = "none";
        let borderBottom = "none";

        if (isMobile) {
          borderTop = `${extraBorderSize}rem solid #000`;

          if (sectionTypes[i] === "left") {
            marginLeft = "1px";
            borderLeft = `${extraBorderSize}rem solid #000`;
            borderRight =
              isNextMobile && sectionTypes[i + 1] === "right"
                ? "none"
                : `${extraBorderSize}rem solid #000`;
          } else if (sectionTypes[i] === "right") {
            marginRight = "1px";
            borderRight = `${extraBorderSize}rem solid #000`;
            borderLeft =
              isPrevMobile && sectionTypes[i - 1] === "left"
                ? "none"
                : `${extraBorderSize}rem solid #000`;
          }

          if (isNextMobile) {
            marginRight = "1px";
          }
          if (isPrevMobile) {
            marginLeft = "1px";
          }
        }

        if (isSwingDoor && sectionTypes[i] === "fixed") {
          borderTop = `${extraBorderSize}rem solid #000`;
          borderBottom = `${extraBorderSize}rem solid #000`;

          const prevIsFixed = i > 0 && sectionTypes[i - 1] === "fixed";
          const nextIsFixed =
            i < sectionCount - 1 && sectionTypes[i + 1] === "fixed";

          borderLeft = prevIsFixed
            ? "none"
            : `${extraBorderSize}rem solid #000`;
          borderRight = nextIsFixed
            ? "none"
            : `${extraBorderSize}rem solid #000`;

          marginLeft = prevIsFixed ? "0" : "1px";
          marginRight = nextIsFixed ? "0" : "1px";
        }

        // === Suprascriem dacă e Fixed Wall
        if (isFixedWall) {
          borderTop = `${borderSize}rem solid #000`;
          borderBottom = `${borderSize}rem solid #000`;

          if (i === 0) {
            borderLeft = `${borderSize}rem solid #000`;
            borderRight = `${borderSize}rem solid #000`;
          } else if (i > 0 && i < sectionCount) {
            borderLeft = "none";
            borderRight = `${borderSize}rem solid #000`;
          } else {
            borderLeft = "none";
            borderRight = "none";
          }
        }

        return (
          <div
            key={i}
            style={{
              flex: `0 0 ${widths[i]}%`,
              boxSizing: "border-box",
              minWidth: 0,
              position: "relative",
              padding: isMobile ? `${extraBorderSize / 3}rem` : 0,
              borderLeft,
              borderRight,
              borderTop,
              borderBottom,
              marginLeft: `${marginLeft}rem`,
              marginRight: `${marginRight}rem`,
            }}
          >
            <Section
              index={i}
              sectionCount={sectionCount}
              onClick={() => {
                onClick(i);
                setSelectionVisible(true);
              }}
              style={{
                height: "100%",
                border: !isFixedWall ? `${borderSize}rem solid #000` : "none",
                background: isSelected(i)
                  ? "rgba(105, 200, 255, 0.6)"
                  : getSectionColor(sectionColors, i)?.backgroundColor ||
                    "transparent",
                position: "relative",
                overflow: "visible",
                cursor: "pointer",
                ...(isSlidingDoor && {
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }),
              }}
              doorDimensions={doorDimensions}
              selectedType={selectedType}
              sectionDimensions={sectionDimensions}
            >
              {getModelOverlay(sectionModels[i], scaled)}
              {getHandleOverlay(selectedHandle, scaled, i, sectionTypes[i])}
              {renderSectionTypeRadio && renderSectionTypeRadio(i)}
              {!isSlidingDoor && i < sectionCount - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: -3,
                    width: 6,
                    height: "100%",
                    cursor: "col-resize",
                    backgroundColor:
                      isResizing && resizingIndex === i
                        ? "rgba(0,0,0,0.2)"
                        : "transparent",
                    zIndex: 10,
                  }}
                  onMouseDown={(e) => handleSectionResizeStart(e, i)}
                />
              )}
            </Section>
          </div>
        );
      })}
    </div>
  );
}

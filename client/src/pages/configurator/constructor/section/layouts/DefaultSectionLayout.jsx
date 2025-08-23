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
  profileColor,
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
  slidingType,
  onPositionChange,
  currentPositions,
  renderSectionTypeRadio = () => null,
}) {
  const SLIDING_DOOR_GAP =
    slidingMountType === "On wall" ? scaled.borderPx / 128 : 0;
  const isSlidingDoor = selectedCategory === "Sliding Doors";
  const isSwingDoor = selectedCategory === "Swing Doors";
  const isFixedWall = selectedCategory === "Fixed Wall";

  const widths = React.useMemo(() => {
    const totalGap = (sectionCount - 1) * SLIDING_DOOR_GAP;

    if (dimensions.widths && dimensions.widths.length === sectionCount) {
      const availableWidth = 100 - (isSlidingDoor ? totalGap : 0);
      return dimensions.widths.map((width) => (width * availableWidth) / 100);
    }

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

        let marginLeft = 0;
        let marginRight = 0;
        let borderTop = "none";
        let borderRight = "none";
        let borderLeft = "none";
        let borderBottom = "none";

        if (isMobile) {
          borderTop = `${extraBorderSize}rem solid ${profileColor}`;

          if (sectionTypes[i] === "left") {
            marginLeft = "1px";
            borderLeft = `${extraBorderSize}rem solid ${profileColor}`;
            borderRight =
              isNextMobile && sectionTypes[i + 1] === ""
                ? "none"
                : `${extraBorderSize}rem solid ${profileColor}`;
          } else if (sectionTypes[i] === "right") {
            marginRight = "1px";
            borderRight = `${extraBorderSize}rem solid ${profileColor}`;
            borderLeft =
              isPrevMobile && sectionTypes[i - 1] === "left"
                ? "none"
                : `${extraBorderSize}rem solid ${profileColor}`;
          }

          if (isNextMobile) {
            marginRight = "1px";
          }
          if (isPrevMobile) {
            marginLeft = "1px";
          }
        }

        if (isSwingDoor && sectionTypes[i] === "fixed") {
          borderTop = `${extraBorderSize}rem solid ${profileColor}`;
          borderBottom = `${extraBorderSize}rem solid ${profileColor}`;

          const prevIsFixed = i > 0 && sectionTypes[i - 1] === "fixed";
          const nextIsFixed =
            i < sectionCount - 1 && sectionTypes[i + 1] === "fixed";

          borderLeft = prevIsFixed
            ? "none"
            : `${extraBorderSize}rem solid ${profileColor}`;
          borderRight = nextIsFixed
            ? "none"
            : `${extraBorderSize}rem solid ${profileColor}`;

          marginLeft = prevIsFixed ? "0" : "1px";
          marginRight = nextIsFixed ? "0" : "1px";
        }

        // === Suprascriem dacă e Fixed Wall
        if (isFixedWall) {
          borderTop = `${borderSize}rem solid ${profileColor}`;
          borderBottom = `${borderSize}rem solid ${profileColor}`;

          if (i === 0) {
            borderLeft = `${borderSize}rem solid ${profileColor}`;
            borderRight = `${borderSize}rem solid ${profileColor}`;
          } else if (i > 0 && i < sectionCount) {
            borderLeft = "none";
            borderRight = `${borderSize}rem solid ${profileColor}`;
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
                border: !isFixedWall
                  ? `${borderSize}rem solid ${profileColor}`
                  : "none",
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
              {getModelOverlay(
                sectionModels[i],
                scaled,
                dimensions,
                (modelName, positions) =>
                  onPositionChange(modelName, positions),
                currentPositions?.[sectionModels[i]] || {}
              )}
              {getHandleOverlay(
                selectedHandle,
                scaled,
                i,
                sectionTypes[i],
                selectedCategory,
                sectionCount,
                slidingMountType,
                slidingType
              )}
              {renderSectionTypeRadio && renderSectionTypeRadio(i)}

              {isSwingDoor &&
                (sectionTypes[i] === "left" || sectionTypes[i] === "right") && (
                  <>
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        style={{
                          position: "absolute",
                          width: `${scaled.borderPx / 128}rem`,
                          height: `${scaled.borderPx / 4}rem`,
                          backgroundColor: `${profileColor}`,
                          top: `${20 + index * 30}%`,
                          [sectionTypes[i] === "left" ? "left" : "right"]: `${
                            -scaled.borderPx / 15
                          }rem`,
                          zIndex: 5,
                        }}
                      />
                    ))}
                  </>
                )}

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

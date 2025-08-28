import Section from "../Section";
import {
  getSectionColor,
  getModelOverlay,
  getHandleOverlay,
} from "../utils/sectionRenderUtils";

export function XPartElementA({
  dimensions,
  scaled,
  sectionColors,
  profileColor,
  sectionModels,
  isSelected,
  onClick,
  setSelectionVisible,
  sectionCount,
  resizingIndex,
  isResizing,
  handleSectionResizeStart,
  handleTopSectionResizeStart,
  selectedCategory,
  selectedType,
  sectionDimensions,
  doorDimensions,
  selectedHandle,
  sectionTypes,
  slidingMountType,
  slidingType,
  linePositions,
  setLinePositions,
  getLinePositionsForSection,
  setLinePositionsForSection,

  renderSectionTypeRadio = () => null,
}) {
  const isSlidingDoor = selectedCategory === "Sliding Doors";
  const isSwingDoor = selectedCategory === "Swing Doors";

  const borderSize = scaled.borderPx / 16;
  const extraBorderSize = scaled.borderPx / 32;

  const total = sectionCount;
  const rest = total - 1;
  const widths = dimensions.widths || Array(rest).fill(100 / rest);

  return (
    <div
      id="sections-container"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {/* Top section */}
      {[0].map((i) => {
        const isMobile =
          isSwingDoor &&
          (sectionTypes[i] === "right" || sectionTypes[i] === "left");

        // Inițializăm margin și border
        let marginLeft = 0;
        let marginRight = 0;
        let borderLeft = "none";
        let borderRight = "none";

        if (isMobile) {
          if (sectionTypes[i] === "left") {
            marginLeft = "1px";
            borderLeft = `${extraBorderSize}rem solid ${profileColor}`;
            borderRight = `${extraBorderSize}rem solid ${profileColor}`;
          } else if (sectionTypes[i] === "right") {
            marginRight = "1px";
            borderRight = `${extraBorderSize}rem solid ${profileColor}`;
            borderLeft = `${extraBorderSize}rem solid ${profileColor}`;
          }
        }

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "0%",
              left: 0,
              width: "100%",
              height: `${dimensions.topHeight}%`,
              boxSizing: "border-box",
              padding: isMobile ? `${extraBorderSize / 3}rem` : 0,
              borderLeft,
              borderRight,
              borderTop: isMobile
                ? `${extraBorderSize}rem solid ${profileColor}`
                : "none",
              borderBottom: "none",
              marginLeft: `${marginLeft}rem`,
              marginRight: `${marginRight}rem`,
            }}
          >
            <Section
              index={i}
              total={total}
              onClick={() => {
                onClick(i);
                setSelectionVisible(true);
              }}
              style={{
                width: "100%",
                height: "100%",
                border: `${borderSize}rem solid ${profileColor}`,
                borderBottom: `${borderSize}rem solid ${profileColor}`,
                background: isSelected(i)
                  ? "rgba(105, 200, 255, 0.6)"
                  : getSectionColor(sectionColors, i)?.backgroundColor ||
                    "transparent",
                cursor: "pointer",
                overflow: "visible",
                boxSizing: "border-box",
                ...(isSlidingDoor && {
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }),
              }}
              selectedType={selectedType}
              sectionDimensions={sectionDimensions}
              doorDimensions={doorDimensions}
            >
              {getModelOverlay(
                sectionModels[i],
                scaled,
                i,
                linePositions,
                setLinePositions,
                getLinePositionsForSection,
                setLinePositionsForSection,
                profileColor
              )}
              {getHandleOverlay(
                selectedHandle,
                scaled,
                i,
                sectionTypes[i],
                selectedCategory,
                sectionCount,
                slidingMountType,
                slidingType,
                profileColor
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
                          backgroundColor: profileColor,
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
            </Section>
          </div>
        );
      })}

      {/* Bottom sections */}
      {[...Array(rest).keys()].map((i) => {
        const sectionIndex = i + 1;
        const isMobile =
          isSwingDoor &&
          (sectionTypes[sectionIndex] === "right" ||
            sectionTypes[sectionIndex] === "left");
        const isNextMobile =
          sectionIndex < total - 1 &&
          (sectionTypes[sectionIndex + 1] === "right" ||
            sectionTypes[sectionIndex + 1] === "left");
        const isPrevMobile =
          sectionIndex > 1 &&
          (sectionTypes[sectionIndex - 1] === "right" ||
            sectionTypes[sectionIndex - 1] === "left");

        // Inițializăm margin și border
        let marginLeft = 0;
        let marginRight = 0;
        let borderLeft = "none";
        let borderRight = "none";

        if (isMobile) {
          if (sectionTypes[sectionIndex] === "left") {
            marginLeft = "1px";
            borderLeft = `${extraBorderSize}rem solid ${profileColor}`;
            borderRight =
              isNextMobile && sectionTypes[sectionIndex + 1] === "right"
                ? "none"
                : `${extraBorderSize}rem solid ${profileColor}`;
          } else if (sectionTypes[sectionIndex] === "right") {
            marginRight = "1px";
            borderRight = `${extraBorderSize}rem solid ${profileColor}`;
            borderLeft =
              isPrevMobile && sectionTypes[sectionIndex - 1] === "left"
                ? "none"
                : `${extraBorderSize}rem solid ${profileColor}`;
          }

          // Adăugăm margin între 2 secțiuni mobile consecutive
          if (isNextMobile) {
            marginRight = "1px";
          }
          if (isPrevMobile) {
            marginLeft = "1px";
          }
        }

        if (isSwingDoor && sectionTypes[sectionIndex] === "fixed") {
          const prevIsFixed =
            sectionIndex > 1 && sectionTypes[sectionIndex - 1] === "fixed";
          const nextIsFixed =
            sectionIndex < total - 1 &&
            sectionTypes[sectionIndex + 1] === "fixed";

          borderLeft = prevIsFixed
            ? "none"
            : `${extraBorderSize}rem solid ${profileColor}`;
          borderRight = nextIsFixed
            ? "none"
            : `${extraBorderSize}rem solid ${profileColor}`;

          marginLeft = prevIsFixed ? "0" : "1px";
          marginRight = nextIsFixed ? "0" : "1px";
        }

        return (
          <div
            key={sectionIndex}
            style={{
              position: "absolute",
              top: `${dimensions.topHeight}%`,
              left: `${widths.slice(0, i).reduce((a, b) => a + b, 0)}%`,
              width: `${widths[i]}%`,
              height: `${100 - dimensions.topHeight}%`,
              boxSizing: "border-box",
              padding: isMobile ? `${extraBorderSize / 3}rem` : 0,
              borderLeft,
              borderRight,
              borderTop: isMobile
                ? `${extraBorderSize}rem solid ${profileColor}`
                : "none",
              borderBottom: "none",
              marginLeft: `${marginLeft}rem`,
              marginRight: `${marginRight}rem`,
            }}
          >
            <Section
              index={sectionIndex}
              total={total}
              onClick={() => {
                onClick(sectionIndex);
                setSelectionVisible(true);
              }}
              style={{
                width: "100%",
                height: "100%",
                border: `${borderSize}rem solid ${profileColor}`,
                background: isSelected(sectionIndex)
                  ? "rgba(105, 200, 255, 0.6)"
                  : getSectionColor(sectionColors, sectionIndex)
                      ?.backgroundColor || "transparent",
                cursor: "pointer",
                overflow: "visible",
                boxSizing: "border-box",
                ...(isSlidingDoor && {
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }),
              }}
              selectedType={selectedType}
              sectionDimensions={sectionDimensions}
              doorDimensions={doorDimensions}
            >
              {getModelOverlay(
                sectionModels[sectionIndex],
                scaled,
                sectionIndex,
                linePositions,
                setLinePositions,
                getLinePositionsForSection,
                setLinePositionsForSection,
                profileColor
              )}
              {getHandleOverlay(
                selectedHandle,
                scaled,
                sectionIndex,
                sectionTypes[sectionIndex],
                selectedCategory,
                sectionCount,
                slidingMountType,
                slidingType,
                profileColor
              )}
              {renderSectionTypeRadio && renderSectionTypeRadio(sectionIndex)}

              {isSwingDoor &&
                (sectionTypes[sectionIndex] === "left" ||
                  sectionTypes[sectionIndex] === "right") && (
                  <>
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        style={{
                          position: "absolute",
                          width: `${scaled.borderPx / 128}rem`,
                          height: `${scaled.borderPx / 4}rem`,
                          backgroundColor: profileColor,
                          top: `${20 + index * 30}%`,
                          [sectionTypes[sectionIndex] === "left"
                            ? "left"
                            : "right"]: `${-scaled.borderPx / 15}rem`,
                          zIndex: 5,
                        }}
                      />
                    ))}
                  </>
                )}
              {/* Horizontal resize handle */}
              {!isSlidingDoor && i < rest - 1 && (
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

      {/* Top section resize handle */}
      {selectedCategory !== "Sliding Doors" && (
        <div
          style={{
            position: "absolute",
            top: `${dimensions.topHeight - 3}%`,
            left: 0,
            width: "100%",
            height: "6px",
            cursor: "row-resize",
            zIndex: 10,
          }}
          onMouseDown={handleTopSectionResizeStart}
        />
      )}
    </div>
  );
}

import Section from "../Section";
import {
  getSectionColor,
  getModelOverlay,
  getHandleOverlay,
} from "../utils/sectionRenderUtils";

export const TwoPartElementO = ({
  dimensions,
  scaled,
  sectionColors,
  profileColor,
  sectionModels,
  isSelected,
  onClick,
  setSelectionVisible,
  handleVerticalResizeStart,
  selectedCategory,
  selectedType,
  sectionDimensions,
  doorDimensions,
  selectedHandle,
  sectionTypes,
  onPositionChange,
  currentPositions,
  renderSectionTypeRadio = () => null,
}) => {
  const isSlidingDoor = selectedCategory === "Sliding Doors";
  const isSwingDoor = selectedCategory === "Swing Doors";

  const borderSize = scaled.borderPx / 16;
  const extraBorderSize = scaled.borderPx / 32;

  return (
    <div
      id="sections-container"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {[0, 1].map((i) => {
        const isMobile =
          isSwingDoor &&
          (sectionTypes[i] === "right" || sectionTypes[i] === "left");

        // Inițializăm margin și padding
        let padding = isMobile ? `${extraBorderSize / 3}rem` : 0;
        let borderLeft = "none";
        let borderRight = "none";
        let borderTop = "none";
        let borderBottom = "none";

        if (isMobile) {
          if (sectionTypes[i] === "left") {
            borderLeft = `${extraBorderSize}rem solid ${profileColor}`;
            borderRight =
              i === 0 && sectionTypes[1] === "right"
                ? "none"
                : `${extraBorderSize}rem solid ${profileColor}`;
          } else if (sectionTypes[i] === "right") {
            borderRight = `${extraBorderSize}rem solid ${profileColor}`;
            borderLeft =
              i === 1 && sectionTypes[0] === "left"
                ? "none"
                : `${extraBorderSize}rem solid ${profileColor}`;
          }
          borderTop = `${extraBorderSize}rem solid ${profileColor}`;
        }

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${i === 0 ? 0 : dimensions.height}%`,
              left: 0,
              width: "100%",
              height: `${
                i === 0 ? dimensions.height : dimensions.secondHeight
              }%`,
              boxSizing: "border-box",
              padding,
              borderLeft,
              borderRight,
              borderTop,
            }}
          >
            <Section
              index={i}
              total={2}
              onClick={() => {
                onClick(i);
                setSelectionVisible(true);
              }}
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
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
                dimensions,
                (modelName, positions) =>
                  onPositionChange(modelName, positions),
                currentPositions?.[sectionModels[i]] || {}
              )}
              {getHandleOverlay(selectedHandle, scaled, i, sectionTypes[i])}
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
                          backgroundColor: "#222",
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
      {selectedCategory !== "Sliding Doors" && (
        <div
          style={{
            position: "absolute",
            top: `${dimensions.height - 3}%`,
            left: 0,
            width: "100%",
            height: "6px",
            cursor: "row-resize",
            zIndex: 10,
          }}
          onMouseDown={handleVerticalResizeStart}
        />
      )}
    </div>
  );
};

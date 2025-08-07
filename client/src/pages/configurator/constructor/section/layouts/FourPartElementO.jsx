import Section from "../Section";
import {
  getSectionColor,
  getModelOverlay,
  getHandleOverlay,
} from "../utils/sectionRenderUtils";

export function FourPartElementO({
  dimensions,
  scaled,
  sectionColors,
  profileColor,
  sectionModels,
  isSelected,
  onClick,
  setSelectionVisible,
  handleVerticalResizeStart,
  handleHorizontalResizeStart,
  selectedType,
  selectedCategory,
  sectionDimensions,
  doorDimensions,
  selectedHandle,
  sectionTypes,
  renderSectionTypeRadio = () => null,
}) {
  const isSlidingDoor = selectedCategory === "Sliding Doors";
  const isSwingDoor = selectedCategory === "Swing Doors";

  const borderSize = scaled.borderPx / 16;
  const extraBorderSize = scaled.borderPx / 32;

  // Calculăm dimensiunile pentru fiecare secțiune
  const sections = [
    {
      // Top Left
      top: 0,
      left: 0,
      width: dimensions.width,
      height: dimensions.height,
    },
    {
      // Top Right
      top: 0,
      left: dimensions.width,
      width: 100 - dimensions.width,
      height: dimensions.height,
    },
    {
      // Bottom Left
      top: dimensions.height,
      left: 0,
      width: dimensions.width,
      height: 100 - dimensions.height,
    },
    {
      // Bottom Right
      top: dimensions.height,
      left: dimensions.width,
      width: 100 - dimensions.width,
      height: 100 - dimensions.height,
    },
  ];

  return (
    <div
      id="sections-container"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {sections.map((section, i) => {
        const isMobile =
          isSwingDoor &&
          (sectionTypes[i] === "right" || sectionTypes[i] === "left");

        // Inițializăm padding și border-uri extra
        let padding = isMobile ? `${extraBorderSize / 3}rem` : 0;
        let borderLeft = "none";
        let borderRight = "none";
        let borderTop = "none";

        if (isMobile) {
          if (sectionTypes[i] === "left") {
            borderLeft = `${extraBorderSize}rem solid ${profileColor}`;
            // Verificăm dacă următoarea secțiune este right pentru a elimina border dublu
            const nextSectionIsRight = i < 3 && sectionTypes[i + 1] === "right";
            borderRight = nextSectionIsRight
              ? "none"
              : `${extraBorderSize}rem solid ${profileColor}`;
          } else if (sectionTypes[i] === "right") {
            borderRight = `${extraBorderSize}rem solid ${profileColor}`;
            // Verificăm dacă secțiunea anterioară este left pentru a elimina border dublu
            const prevSectionIsLeft = i > 0 && sectionTypes[i - 1] === "left";
            borderLeft = prevSectionIsLeft
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
              top: `${section.top}%`,
              left: `${section.left}%`,
              width: `${section.width}%`,
              height: `${section.height}%`,
              boxSizing: "border-box",
              padding,
              borderLeft,
              borderRight,
              borderTop,
            }}
          >
            <Section
              index={i}
              total={4}
              onClick={() => {
                onClick(i);
                setSelectionVisible(true);
              }}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                border: `${borderSize}rem solid ${profileColor}`,
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
              {getModelOverlay(sectionModels[i], scaled, doorDimensions)}
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
        <>
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
          <div
            style={{
              position: "absolute",
              top: 0,
              left: `${dimensions.width - 3}%`,
              width: "6px",
              height: "100%",
              cursor: "col-resize",
              zIndex: 10,
            }}
            onMouseDown={handleHorizontalResizeStart}
          />
        </>
      )}
    </div>
  );
}

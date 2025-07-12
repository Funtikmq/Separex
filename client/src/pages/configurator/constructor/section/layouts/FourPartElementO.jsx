import Section from '../Section';
import { getSectionColor, getModelOverlay, getHandleOverlay } from '../utils/sectionRenderUtils';

export function FourPartElementO({ dimensions, 
                                   scaled, 
                                   sectionColors,
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
                                    renderSectionTypeRadio = () => null }) {
  // Calculăm dimensiunile pentru fiecare secțiune
  const sections = [
    { // Top Left
      top: 0,
      left: 0,
      width: dimensions.width,
      height: dimensions.height
    },
    { // Top Right
      top: 0,
      left: dimensions.width,
      width: 100 - dimensions.width,
      height: dimensions.height
    },
    { // Bottom Left
      top: dimensions.height,
      left: 0,
      width: dimensions.width,
      height: 100 - dimensions.height
    },
    { // Bottom Right
      top: dimensions.height,
      left: dimensions.width,
      width: 100 - dimensions.width,
      height: 100 - dimensions.height
    }
  ];

  return (
    <div id="sections-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {sections.map((section, i) => (
        <Section
          key={i}
          index={i}
          total={4}
          onClick={() => { onClick(i); setSelectionVisible(true); }}
          style={{
            position: "absolute",
            top: `${section.top}%`,
            left: `${section.left}%`,
            width: `${section.width}%`,
            height: `${section.height}%`,
            borderRight: i % 2 === 0 ? `${scaled.borderPx}px solid #222` : "0",
            borderBottom: i < 2 ? `${scaled.borderPx}px solid #222` : "0",
            background: isSelected(i)
              ? "rgba(105, 200, 255, 0.6)"
              : getSectionColor(sectionColors, i)?.backgroundColor || "transparent",
            cursor: "pointer",
            overflow: "visible"
          }}
          selectedType={selectedType}
          sectionDimensions={sectionDimensions}
          doorDimensions={doorDimensions}
        >
          {getModelOverlay(sectionModels[i], scaled)}
          {getHandleOverlay(selectedHandle, scaled, i,sectionTypes[i])}
          {renderSectionTypeRadio && renderSectionTypeRadio(i)}
        </Section>
      ))}

      {selectedCategory !== 'Sliding Doors' && (
        <>
          <div
            style={{
              position: 'absolute',
              top: `${dimensions.height - 3}%`,
              left: 0,
              width: '100%',
              height: '6px',
              cursor: 'row-resize',
              zIndex: 10,
            }}
            onMouseDown={handleVerticalResizeStart}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: `${dimensions.width - 3}%`,
              width: '6px',
              height: '100%',
              cursor: 'col-resize',
              zIndex: 10,
            }}
            onMouseDown={handleHorizontalResizeStart}
          />
        </>
      )}
    </div>
  );
}
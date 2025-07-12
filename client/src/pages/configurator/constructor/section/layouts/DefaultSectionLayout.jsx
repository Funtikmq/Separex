import React from "react";
import Section from "../Section.jsx";
import { getSectionColor, getModelOverlay,getHandleOverlay } from "../utils/sectionRenderUtils.js";

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
  renderSectionTypeRadio = () => null 
}) {
  const SLIDING_DOOR_GAP = scaled.borderPx/64; 
  const isSlidingDoor = selectedCategory === 'Sliding Doors';
  
  // Calculăm width-urile ținând cont de gap pentru sliding doors
  const widths = React.useMemo(() => {
    if (dimensions.widths && dimensions.widths.length === sectionCount) {
      if (isSlidingDoor) {
        const totalGap = SLIDING_DOOR_GAP * (sectionCount - 1);
        const availableWidth = 100 - totalGap;
        return dimensions.widths.map(width => 
          (width * availableWidth) / 100
        );
      }
      return dimensions.widths;
    }
    if (isSlidingDoor) {
      const totalGap = SLIDING_DOOR_GAP * (sectionCount - 1);
      const sectionWidth = (100 - totalGap) / sectionCount;
      return Array(sectionCount).fill(sectionWidth);
    }
    return Array(sectionCount).fill(100 / sectionCount);
  }, [dimensions.widths, sectionCount, isSlidingDoor]);

  return (
    <div 
      id="sections-container" 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        display: 'flex',
        overflow: 'visible',
        gap: isSlidingDoor ? `${SLIDING_DOOR_GAP}rem` : 0,
        padding: 0,
        boxSizing: 'border-box',
      }}
    >
      {[...Array(sectionCount).keys()].map((i) => (
        <Section
          key={i}
          index={i}
          total={sectionCount}
          onClick={() => { onClick(i); setSelectionVisible(true); }}
          style={{
            flex: `0 0 ${widths[i]}%`, 
            height: '100%',
            ...(isSlidingDoor ? 
              (sectionCount > 1 ? {
                ...(i === 0 && {
                  borderRight: `${scaled.borderPx/16}rem solid #222`,
                }),
                ...(i === sectionCount - 1 && {
                  borderLeft: `${scaled.borderPx/16}rem solid #222`,
                }),
                ...(i > 0 && i < sectionCount - 1 && {
                  borderLeft: `${scaled.borderPx/16}rem solid #222`,
                  borderRight: `${scaled.borderPx/16}rem solid #222`,
                }),
              } : {}) 
              : 
              (i < sectionCount - 1 ? { 
                borderRight: `${scaled.borderPx/16}rem solid #222`,
              } : {})
            ),
            background: isSelected(i)
              ? "rgba(105, 200, 255, 0.6)"
              : getSectionColor(sectionColors, i)?.backgroundColor || "transparent",
            position: 'relative',
            overflow: 'visible',
            cursor: 'pointer',
            ...(isSlidingDoor && {
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            })
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
                position: 'absolute',
                top: 0,
                right: -3,
                width: 6,
                height: '100%',
                cursor: 'col-resize',
                backgroundColor: isResizing && resizingIndex === i ? 'rgba(0,0,0,0.2)' : 'transparent',
                zIndex: 10,
              }}
              onMouseDown={(e) => handleSectionResizeStart(e, i)}
            />
          )}
        </Section>
      ))}
    </div>
  );
}
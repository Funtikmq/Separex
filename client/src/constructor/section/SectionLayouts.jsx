import React from "react";
import Section from "./Section.jsx";
import { getSectionColor, modelComponents,getHandleOverlay } from "./utils/sectionRenderUtils.js";


export function getModelOverlay(modelName, scaled) {
  if (!modelName || modelName === "Aero") return null;
  const Component = modelComponents[modelName];
  return Component ? <Component scaled={scaled} /> : null;
}

export function TwoPartElementO({ dimensions, 
                                  scaled,
                                  sectionColors, 
                                  sectionModels, 
                                  isSelected, 
                                  onClick, 
                                  setSelectionVisible,
                                  handleVerticalResizeStart, 
                                  selectedCategory,
                                  selectedType,
                                  selectedHandle,
                                  doorDimensions,
                                  sectionDimensions,
                                  renderSectionTypeRadio = () => null }) {
  return (
    <div id="sections-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {[0, 1].map((i) => (
        <Section
          key={i}
          index={i}
          total={2}
          onClick={() => { onClick(i); setSelectionVisible(true); }}
          style={{
            display: "flex",
            position: "absolute",
            top: `${i === 0 ? 0 : dimensions.height}%`,
            left: 0,
            width: "100%",
            height: `${i === 0 ? dimensions.height : dimensions.secondHeight}%`,
            borderBottom: i === 0 ? `${scaled.borderPx/16}rem solid #222` : "0",
            background: isSelected(i)
              ? "rgba(105, 200, 255, 0.6)"
              : getSectionColor(sectionColors, i)?.backgroundColor || "transparent",
            cursor: "pointer",
            overflow: "visible"
          }}
          selectedType={selectedType}
          doorDimensions={doorDimensions}
          sectionDimensions={sectionDimensions}
          selectedHandle={selectedHandle || 'HandleWithLock'}
          scaled={scaled}
        >
          {getModelOverlay(sectionModels[i], scaled)}
          {getHandleOverlay(selectedHandle, scaled, i)}
          {renderSectionTypeRadio && renderSectionTypeRadio(i)}
        </Section>
      ))}
      {selectedCategory !== 'Sliding Doors' && (
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
      )}
    </div>
  );
}

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
                                   selectedHandle,
                                   doorDimensions,
                                   sectionDimensions,
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
          doorDimensions={doorDimensions}
          sectionDimensions={sectionDimensions}
          selectedHandle={selectedHandle || 'HandleWithLock'}
          scaled={scaled}
        >
          {getModelOverlay(sectionModels[i], scaled)}
          {getHandleOverlay(selectedHandle, scaled, i)}
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

export function XPartElementA({ 
  dimensions, 
  scaled, 
  sectionColors, 
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
  selectedHandle,
  doorDimensions,
  sectionDimensions,
  renderSectionTypeRadio = () => null 
}) {
  const total = sectionCount;
  const rest = total - 1;
  const widths = dimensions.widths || Array(rest).fill(100 / rest);
  
  return (
    <div id="sections-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Top section remains the same */}
      <Section
        key={0}
        index={0}
        total={total}
        onClick={() => { onClick(0); setSelectionVisible(true); }}
        style={{
          position: "absolute",
          top: "0%",
          left: 0,
          width: "100%",
          height: `${dimensions.topHeight}%`,
          borderBottom: `${scaled.borderPx}px solid #222`,
          background: isSelected(0)
            ? "rgba(105, 200, 255, 0.6)"
            : getSectionColor(sectionColors, 0)?.backgroundColor || "transparent",
          cursor: "pointer",
          overflow: "visible"
        }}
        selectedType={selectedType}
        doorDimensions={doorDimensions}
        sectionDimensions={sectionDimensions}
        selectedHandle={selectedHandle || 'HandleWithLock'}
        scaled={scaled}
      >
        {getModelOverlay(sectionModels[0], scaled)}
        {getHandleOverlay(selectedHandle, scaled, 0)}
        {renderSectionTypeRadio && renderSectionTypeRadio(0)}
      </Section>

      {/* Bottom sections with both resize handlers */}
      {[...Array(rest).keys()].map((i) => (
        <Section
          key={i + 1}
          index={i + 1}
          total={total}
          onClick={() => { onClick(i + 1); setSelectionVisible(true); }}
          style={{
            position: "absolute",
            top: `${dimensions.topHeight}%`,
            left: `${widths.slice(0, i).reduce((a, b) => a + b, 0)}%`,
            width: `${widths[i]}%`,
            height: `${100 - dimensions.topHeight}%`,
            borderRight: i < rest - 1 ? `${scaled.borderPx}px solid #222` : "0",
            background: isSelected(i + 1)
              ? "rgba(105, 200, 255, 0.6)"
              : getSectionColor(sectionColors, i + 1)?.backgroundColor || "transparent",
            cursor: "pointer",
            overflow: "visible"
          }}
          selectedType={selectedType}
          doorDimensions={doorDimensions}
          sectionDimensions={sectionDimensions}
          selectedHandle={selectedHandle || 'HandleWithLock'}
          scaled={scaled}
        >
          {getModelOverlay(sectionModels[i + 1], scaled)}
          {renderSectionTypeRadio && renderSectionTypeRadio(i + 1)}
          
          {/* Horizontal resize handle */}
          {i < rest - 1 && selectedCategory !== 'Sliding Doors' && (
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

      {/* Top section resize handle */}
      {selectedCategory !== 'Sliding Doors' && (
        <div
          style={{
            position: 'absolute',
            top: `${dimensions.topHeight - 3}%`,
            left: 0,
            width: '100%',
            height: '6px',
            cursor: 'row-resize',
            zIndex: 10,
          }}
          onMouseDown={handleTopSectionResizeStart}
        />
      )}
    </div>
  );
}

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
  selectedHandle, 
  doorDimensions,
  sectionDimensions,
  renderSectionTypeRadio = () => null 
}) {
  // Ensure widths are properly initialized and sum to 100%
  const widths = React.useMemo(() => {
    if (dimensions.widths && dimensions.widths.length === sectionCount) {
      return dimensions.widths;
    }
    // Default to equal widths
    return Array(sectionCount).fill(100 / sectionCount);
  }, [dimensions.widths, sectionCount]);
  return (
    <div 
      id="sections-container" 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        display: 'flex',
        overflow: 'visible'
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
            borderRight: i < sectionCount - 1 ? `${scaled.borderPx}px solid #222` : "0",
            background: isSelected(i)
              ? "rgba(105, 200, 255, 0.6)"
              : getSectionColor(sectionColors, i)?.backgroundColor || "transparent",
            position: 'relative',
            overflow: 'visible',
            cursor: 'pointer',
          }}
          doorDimensions={doorDimensions}
          selectedType={selectedType}
          sectionDimensions={sectionDimensions}
          selectedHandle={selectedHandle || 'HandleWithLock'} 
          scaled={scaled}
        >
          {getModelOverlay(sectionModels[i], scaled)}
          {getHandleOverlay(selectedHandle, scaled, i)}
          {renderSectionTypeRadio && renderSectionTypeRadio(i)}
          {i < sectionCount - 1 && selectedCategory !== 'Sliding Doors' && (
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
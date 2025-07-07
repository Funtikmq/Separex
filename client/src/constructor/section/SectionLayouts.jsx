
import React from "react";
import Section from "./Section.jsx";
import { getSectionColor, modelComponents } from "./sectionRenderUtils.js";

export function getModelOverlay(modelName, scaled) {
  if (!modelName || modelName === "Aero") return null;
  const Component = modelComponents[modelName];
  return Component ? <Component scaled={scaled} /> : null;
}

export function TwoPartElementO({ dimensions, scaled, sectionColors, sectionModels, isSelected, onClick, setSelectionVisible, handleVerticalResizeStart, selectedCategory, renderSectionTypeRadio = () => null }) {
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
        >
          {getModelOverlay(sectionModels[i], scaled)}
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

export function FourPartElementO({ dimensions, scaled, sectionColors, sectionModels, isSelected, onClick, setSelectionVisible, handleVerticalResizeStart, handleHorizontalResizeStart, selectedCategory, renderSectionTypeRadio = () => null }) {
  return (
    <div id="sections-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {[...Array(4).keys()].map((i) => {
        const row = Math.floor(i / 2);
        const col = i % 2;
        return (
          <Section
            key={i}
            index={i}
            total={4}
            onClick={() => { onClick(i); setSelectionVisible(true); }}
            style={{
              position: "absolute",
              top: `${row === 0 ? 0 : dimensions.height}%`,
              left: `${col === 0 ? 0 : dimensions.width}%`,
              width: `${col === 0 ? dimensions.width : dimensions.secondWidth}%`,
              height: `${row === 0 ? dimensions.height : dimensions.secondHeight}%`,
              borderRight: col === 0 ? `${scaled.borderPx}px solid #222` : "0",
              borderBottom: row === 0 ? `${scaled.borderPx}px solid #222` : "0",
              background: isSelected(i)
                ? "rgba(105, 200, 255, 0.6)"
                : getSectionColor(sectionColors, i)?.backgroundColor || "transparent",
              cursor: "pointer",
              overflow: "visible"
            }}
          >
            {getModelOverlay(sectionModels[i], scaled)}
            {renderSectionTypeRadio && renderSectionTypeRadio(i)}
          </Section>
        );
      })}
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

export function XPartElementA({ dimensions, scaled, sectionColors, sectionModels, isSelected, onClick, setSelectionVisible, sectionCount, resizingIndex, isResizing, handleSectionResizeStart, handleTopSectionResizeStart, selectedCategory, renderSectionTypeRadio = () => null }) {
  const total = sectionCount;
  const rest = total - 1;
  const widths = dimensions.widths || Array(rest).fill(100 / rest);
  return (
    <div id="sections-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
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
      >
        {getModelOverlay(sectionModels[0], scaled)}
        {renderSectionTypeRadio && renderSectionTypeRadio(0)}
      </Section>
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
        >
          {getModelOverlay(sectionModels[i + 1], scaled)}
          {renderSectionTypeRadio && renderSectionTypeRadio(i + 1)}
        </Section>
      ))}
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
        overflow: 'hidden'
      }}
    >
      {[...Array(sectionCount).keys()].map((i) => (
        <Section
          key={i}
          index={i}
          total={sectionCount}
          onClick={() => { onClick(i); setSelectionVisible(true); }}
          style={{
            flex: `0 0 ${widths[i]}%`, // Use flex instead of width
            height: '100%',
            borderRight: i < sectionCount - 1 ? `${scaled.borderPx}px solid #222` : "0",
            background: isSelected(i)
              ? "rgba(105, 200, 255, 0.6)"
              : getSectionColor(sectionColors, i)?.backgroundColor || "transparent",
            position: 'relative',
            overflow: 'visible',
            cursor: 'pointer',
          }}
        >
          {getModelOverlay(sectionModels[i], scaled)}
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
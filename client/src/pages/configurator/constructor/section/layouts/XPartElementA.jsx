import Section from '../Section';
import { getSectionColor, getModelOverlay, getHandleOverlay } from '../utils/sectionRenderUtils';

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
  sectionDimensions,
  doorDimensions,
  selectedHandle,
  sectionTypes,
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
        sectionDimensions={sectionDimensions}
        doorDimensions={doorDimensions}
      >
        {getModelOverlay(sectionModels[0], scaled)}
        {getHandleOverlay(selectedHandle, scaled, 0, sectionTypes[0])}
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
          sectionDimensions={sectionDimensions}
          doorDimensions={doorDimensions}
        >
          {getModelOverlay(sectionModels[i + 1], scaled)}
          {getHandleOverlay(selectedHandle, scaled, i+1,sectionTypes[i+1])}
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
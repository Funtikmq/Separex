import Section from '../Section';
import { getSectionColor, getModelOverlay, getHandleOverlay } from '../utils/sectionRenderUtils';

export const TwoPartElementO = ({
  dimensions,
  scaled,
  sectionColors,
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
  renderSectionTypeRadio = () => null
}) => {
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
          sectionDimensions={sectionDimensions}
          doorDimensions={doorDimensions}
        >
          {getModelOverlay(sectionModels[i], scaled)}
          {getHandleOverlay(selectedHandle, scaled, i, sectionTypes[i])}
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
};
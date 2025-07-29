import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSectionDimensions } from "./hooks/useSectionDimensions";
import { useResizeLogic } from "./hooks/useResizeLogic";
import { useMouseHandlers } from "./hooks/useMouseHandlers";
import { useSectionTypeManagement } from "./hooks/useSectionTypeManagement";
import { getLayoutComponent } from "./utils/layoutSelector";
import {
  SECTION_CATEGORIES,
  SECTION_STATES,
} from "./constants/sectionConstants";

function SectionRenderer({
  selectedCategory,
  selectedType,
  scaled,
  sectionCount,
  selectedIndex,
  sectionModels,
  sectionColors,
  selectionVisible,
  setSelectionVisible,
  onClick,
  sectionDimensions,
  setSectionDimensions,
  doorDimensions,
  sectionTypes,
  setSectionTypes,
  selectedHandle,
  slidingMountType,
}) {
  // useSectionDimensions hook
  const { dimensions, updateDimensions } = useSectionDimensions({
    selectedType,
    sectionCount,
    doorDimensions,
    sectionDimensions,
  });
  // useResizeLogic hook
  const { handleResize } = useResizeLogic({
    selectedCategory,
    doorDimensions,
    selectedType,
    setSectionDimensions,
    updateDimensions,
  });

  const { isResizing, handleResizeStart, handleMouseMove, handleMouseUp } =
    useMouseHandlers(handleResize);

  const { handleSectionTypeChange } = useSectionTypeManagement(setSectionTypes);

  const layoutProps = React.useMemo(
    () => ({
      dimensions,
      scaled,
      sectionColors,
      sectionModels,
      isSelected: (i) => selectedIndex === i && selectionVisible,
      onClick,
      setSelectionVisible,
      handleVerticalResizeStart: (e) =>
        handleResizeStart(e, "vertical", selectedCategory, dimensions),
      handleHorizontalResizeStart: (e) =>
        handleResizeStart(e, "horizontal", selectedCategory, dimensions),
      handleTopSectionResizeStart: (e) =>
        handleResizeStart(e, "top", selectedCategory, dimensions),
      handleSectionResizeStart: (e, index) =>
        handleResizeStart(e, index, selectedCategory, dimensions),
      selectedCategory,
      selectedType,
      sectionDimensions,
      doorDimensions,
      selectedHandle,
      sectionTypes,
      sectionCount,
      slidingMountType,
      isResizing,
      resizingIndex: null,
      renderSectionTypeRadio: (idx) => {
        if (
          !selectionVisible ||
          selectedIndex !== idx ||
          ![
            SECTION_CATEGORIES.SLIDING_DOORS,
            SECTION_CATEGORIES.SWING_DOORS,
          ].includes(selectedCategory)
        )
          return null;

        return (
          <div className="sectionTypeInput">
            {Object.entries(SECTION_STATES).map(([key, value]) => (
              <label key={key} style={{ marginRight: key !== "RIGHT" ? 8 : 0 }}>
                <input
                  type="radio"
                  name={`section-type-${idx}`}
                  value={value}
                  checked={sectionTypes[idx] === value}
                  onChange={() => handleSectionTypeChange(idx, value)}
                />
                {key === "FIXED" ? "Fixed" : `To ${key.toLowerCase()}`}
              </label>
            ))}
          </div>
        );
      },
    }),
    [
      dimensions,
      scaled,
      sectionColors,
      sectionModels,
      selectedIndex,
      selectionVisible,
      onClick,
      selectedCategory,
      selectedType,
      sectionTypes,
      handleResizeStart,
      handleSectionTypeChange,
      sectionDimensions,
      doorDimensions,
      selectedHandle,
      sectionCount,
      isResizing,
    ]
  );

  // Mouse event effects
  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const LayoutComponent = getLayoutComponent(selectedType);
  return <LayoutComponent {...layoutProps} />;
}

SectionRenderer.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  selectedType: PropTypes.string.isRequired,
  scaled: PropTypes.bool,
  sectionCount: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number,
  sectionModels: PropTypes.array,
  sectionColors: PropTypes.array,
  selectionVisible: PropTypes.bool,
  setSelectionVisible: PropTypes.func,
  onClick: PropTypes.func,
  sectionDimensions: PropTypes.array,
  setSectionDimensions: PropTypes.func,
  doorDimensions: PropTypes.object,
  sectionTypes: PropTypes.array,
  setSectionTypes: PropTypes.func,
  selectedHandle: PropTypes.string,
};

export default memo(SectionRenderer);

import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSectionDimensions } from "./hooks/useSectionDimensions";
import { useResizeLogic } from "./hooks/useResizeLogic";
import { useMouseHandlers } from "./hooks/useMouseHandlers";
import { useSectionTypeManagement } from "./hooks/useSectionTypeManagement";
import { getLayoutComponent } from "./utils/layoutSelector";
import { SECTION_CATEGORIES } from "./constants/sectionConstants";

function SectionRenderer({
  selectedCategory,
  selectedType,
  scaled,
  sectionCount,
  selectedIndex,
  sectionModels,
  sectionColors,
  profileColor,
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
  slidingType,
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

  const { handleSectionTypeChange } = useSectionTypeManagement(
    setSectionTypes,
    selectedCategory,
    sectionCount,
    slidingType,
    slidingMountType
  );

  const layoutProps = React.useMemo(
    () => ({
      dimensions,
      scaled,
      sectionColors,
      profileColor,
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
      slidingMountType,
      slidingType,
      resizingIndex: null,
      renderSectionTypeRadio: (idx) => {
        if (
          !selectionVisible ||
          selectedIndex !== idx ||
          ![
            SECTION_CATEGORIES.SLIDING_DOORS,
            SECTION_CATEGORIES.SWING_DOORS,
          ].includes(selectedCategory) ||
          (selectedCategory === SECTION_CATEGORIES.SLIDING_DOORS &&
            slidingMountType === "On wall")
        )
          return null;

        // For cascade sliding doors, only show options for first and last sections
        if (
          selectedCategory === SECTION_CATEGORIES.SLIDING_DOORS &&
          slidingType === "cascade"
        ) {
          if (idx !== 0 && idx !== sectionCount - 1) return null;
        }

        const options = [];

        if (selectedCategory === SECTION_CATEGORIES.SLIDING_DOORS) {
          options.push(
            { value: "fixed", label: "Fixed" },
            { value: "mobile", label: "Mobile" }
          );
        } else if (selectedCategory === SECTION_CATEGORIES.SWING_DOORS) {
          options.push(
            { value: "fixed", label: "Fixed" },
            { value: "left", label: "To left" },
            { value: "right", label: "To right" }
          );
        }

        return (
          <div className="sectionTypeInput">
            {options.map((option) => (
              <label
                key={option.value}
                style={{ marginRight: option.value !== "right" ? 8 : 0 }}
              >
                <input
                  type="radio"
                  name={`section-type-${idx}`}
                  value={option.value}
                  checked={sectionTypes[idx] === option.value}
                  onChange={() => handleSectionTypeChange(idx, option.value)}
                />
                {option.label}
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
      profileColor,
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
  profileColor: PropTypes.string,
  selectionVisible: PropTypes.bool,
  setSelectionVisible: PropTypes.func,
  onClick: PropTypes.func,
  sectionDimensions: PropTypes.array,
  setSectionDimensions: PropTypes.func,
  doorDimensions: PropTypes.object,
  sectionTypes: PropTypes.array,
  setSectionTypes: PropTypes.func,
  selectedHandle: PropTypes.string,
  slidingType: PropTypes.string,
  slidingMountType: PropTypes.string,
};

export default memo(SectionRenderer);

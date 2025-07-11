import React, { memo, useMemo, useState,useCallback } from 'react';
import { useSectionDimensions } from './hooks/useSectionDimensions';
import { useResizeLogic } from './hooks/useResizeLogic';
import { SECTION_TYPES } from './constants/sectionConstants';
import * as layouts from './SectionLayouts';
import PropTypes from 'prop-types';

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
}) {

  const [isResizing, setIsResizing] = useState(false);
  const [resizingIndex, setResizingIndex] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startDimensions, setStartDimensions] = useState(null);

  const {
    dimensions,
    updateDimensions,
  } = useSectionDimensions({
    selectedType,
    sectionCount,
    doorDimensions,
    sectionDimensions
  });

  const { handleResize } = useResizeLogic({
    selectedCategory,
    doorDimensions,
    selectedType,
    setSectionDimensions,
    updateDimensions
  });

  const handleResizeStart = useCallback((e, type) => {
    if (selectedCategory === 'Sliding Doors') return;
    e.preventDefault();
    setIsResizing(true);
    setResizingIndex(type);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setStartDimensions({...dimensions});
  }, [selectedCategory, dimensions]);

  const handleSectionTypeChange = (idx, type) => {
    if (typeof setSectionTypes === 'function') {
      setSectionTypes(prev => {
        const newTypes = [...prev];
        newTypes[idx] = type;
        return newTypes;
      });
    }
  };

  const handleMouseMove = useCallback((e) => {
    if (isResizing && startDimensions) {
      handleResize(e, resizingIndex, startX, startY, startDimensions);
    }
  }, [isResizing, resizingIndex, startX, startY, startDimensions, handleResize]);

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      setResizingIndex(null);
      setStartDimensions(null);
    }
  }, [isResizing]);

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const layoutProps = useMemo(() => ({
    dimensions,
    scaled,
    sectionColors,
    sectionModels,
    isSelected: (i) => selectedIndex === i && selectionVisible,
    onClick,
    setSelectionVisible,
    handleVerticalResizeStart: (e) => handleResizeStart(e, 'vertical'),
    handleHorizontalResizeStart: (e) => handleResizeStart(e, 'horizontal'),
    handleTopSectionResizeStart: (e) => handleResizeStart(e, 'top'),
    handleSectionResizeStart: (e, index) => handleResizeStart(e, index),
    selectedCategory,
    renderSectionTypeRadio: (idx) => {
      if (
        !selectionVisible ||
        selectedIndex !== idx ||
        !["Sliding Doors", "Swing Doors"].includes(selectedCategory)
      ) return null;
      
      return (
        <div className="sectionTypeInput">
          <label style={{ marginRight: 8 }}>
            <input
              type="radio"
              name={`section-type-${idx}`}
              value="fixed"
              checked={sectionTypes[idx] === "fixed"}
              onChange={() => handleSectionTypeChange(idx, "fixed")}
            />
            Fixed
          </label>
          <label>
            <input
              type="radio"
              name={`section-type-${idx}`}
              value="left"
              checked={sectionTypes[idx] === "left"}
              onChange={() => handleSectionTypeChange(idx, "left")}
            />
            To Left
          </label>
          <label>
            <input
              type="radio"
              name={`section-type-${idx}`}
              value="right"
              checked={sectionTypes[idx] === "right"}
              onChange={() => handleSectionTypeChange(idx, "right")}
            />
            To Right
          </label>
        </div>
      );
    }
  }), [
    dimensions,
    scaled,
    sectionColors,
    sectionModels,
    selectedIndex,
    selectionVisible,
    onClick,
    selectedCategory,
    sectionTypes,
    handleResizeStart
  ]);

  const renderLayout = () => {
    switch(selectedType) {
      case SECTION_TYPES.TWO_PART:
        return <layouts.TwoPartElementO {...layoutProps} selectedType={selectedType} sectionDimensions={sectionDimensions} doorDimensions={doorDimensions} selectedHandle={selectedHandle} sectionTypes={sectionTypes} />;
      case SECTION_TYPES.FOUR_PART:
        return <layouts.FourPartElementO {...layoutProps} selectedType={selectedType} sectionDimensions={sectionDimensions} doorDimensions={doorDimensions} selectedHandle={selectedHandle} sectionTypes={sectionTypes} />;
      case (selectedType.match(/^\d+-Part Element A$/) || {}).input:
        return <layouts.XPartElementA {...layoutProps} sectionCount={sectionCount} selectedType={selectedType} sectionDimensions={sectionDimensions} doorDimensions={doorDimensions} selectedHandle={selectedHandle} sectionTypes={sectionTypes}/>;
      default:
        return <layouts.DefaultSectionLayout {...layoutProps} sectionCount={sectionCount} selectedType={selectedType} sectionDimensions={sectionDimensions} doorDimensions={doorDimensions} selectedHandle={selectedHandle} sectionTypes={sectionTypes}/>;
    }
  };

  return renderLayout();
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
  setSectionTypes: PropTypes.func
};

export default memo(SectionRenderer);
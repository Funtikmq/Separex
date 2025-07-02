import { useState, useEffect, useCallback } from 'react';
import { TwoPartElementO, FourPartElementO, XPartElementA, DefaultSectionLayout } from "./SectionLayouts";

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
  sectionDimensions
}) {
  const getDimensionsFromInput = () => {
    if (sectionCount === 1) {
      return { widths: [100] };
    }
    if (selectedType === "2-Part Element O") {
      return {
        height: Number(sectionDimensions[0]) || 50,
        secondHeight: Number(sectionDimensions[1]) || 50
      };
    }
    if (selectedType === "4-Part Element O") {
      return {
        height: Number(sectionDimensions[0]) || 50,
        secondHeight: Number(sectionDimensions[1]) || 50,
        width: Number(sectionDimensions[2]) || 50,
        secondWidth: Number(sectionDimensions[3]) || 50
      };
    }
    if (/^\d+-Part Element A$/.test(selectedType)) {
      const total = parseInt(selectedType.match(/^(\d+)-Part/)[1], 10);
      const rest = total - 1;
      return {
        topHeight: Number(sectionDimensions[0]) || 30,
        widths: sectionDimensions.slice(1, total).map(v => Number(v) || 0)
      };
    }
    return { widths: (sectionDimensions || []).map(v => Number(v) || 0) };
  };

  const [dimensions, setDimensions] = useState(getDimensionsFromInput);
  const [isResizing, setIsResizing] = useState(false);
  const [resizingIndex, setResizingIndex] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startDimensions, setStartDimensions] = useState(null);

  const isSelected = (i) => selectedIndex === i && selectionVisible;

  const handleVerticalResizeStart = (e) => {
    if (selectedCategory === 'Sliding Doors') return;
    e.preventDefault();
    setIsResizing(true);
    setResizingIndex('vertical');
    setStartY(e.clientY);
    setStartDimensions({ ...dimensions });
  };

  const handleHorizontalResizeStart = (e) => {
    if (selectedCategory === 'Sliding Doors') return;
    e.preventDefault();
    setIsResizing(true);
    setResizingIndex('horizontal');
    setStartX(e.clientX);
    setStartDimensions({ ...dimensions });
  };

  const handleTopSectionResizeStart = (e) => {
    if (selectedCategory === 'Sliding Doors') return;
    e.preventDefault();
    setIsResizing(true);
    setResizingIndex('top');
    setStartY(e.clientY);
    setStartDimensions({ ...dimensions });
  };

  const handleSectionResizeStart = (e, index) => {
    if (selectedCategory === 'Sliding Doors') return;
    e.preventDefault();
    setIsResizing(true);
    setResizingIndex(index);
    setStartX(e.clientX);
    setStartDimensions({ ...dimensions });
  };

  const handleResize = useCallback((e) => {
    if (selectedCategory === 'Sliding Doors') return;
    if (!isResizing) return;
    const container = document.getElementById('sections-container');
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    switch (resizingIndex) {
      case 'vertical': {
        const deltaY = e.clientY - startY;
        const deltaYPercentage = (deltaY / containerRect.height) * 100;
        if (selectedType.includes("Part Element O")) {
          const newHeight = startDimensions.height + deltaYPercentage;
          if (newHeight >= 30 && newHeight <= 70) {
            setDimensions(prev => ({
              ...prev,
              height: newHeight,
              secondHeight: 100 - newHeight
            }));
          }
        }
        break;
      }
      case 'horizontal': {
        if (selectedType === "4-Part Element O") {
          const deltaX = e.clientX - startX;
          const deltaXPercentage = (deltaX / containerRect.width) * 100;
          const newWidth = startDimensions.width + deltaXPercentage;
          if (newWidth >= 30 && newWidth <= 70) {
            setDimensions(prev => ({
              ...prev,
              width: newWidth,
              secondWidth: 100 - newWidth
            }));
          }
        }
        break;
      }
      case 'top': {
        const deltaTopY = e.clientY - startY;
        const deltaTopPercentage = (deltaTopY / containerRect.height) * 100;
        const newTopHeight = startDimensions.topHeight + deltaTopPercentage;
        if (newTopHeight >= 20 && newTopHeight <= 40) {
          setDimensions(prev => ({
            ...prev,
            topHeight: newTopHeight
          }));
        }
        break;
      }
      default: {
        if (typeof resizingIndex === 'number' && startDimensions.widths) {
          const deltaX = e.clientX - startX;
          const deltaXPercentage = (deltaX / containerRect.width) * 100;
          const newWidths = [...startDimensions.widths];
          const minWidth = 15;
          if (resizingIndex < newWidths.length - 1) {
            const newWidth1 = startDimensions.widths[resizingIndex] + deltaXPercentage;
            const newWidth2 = startDimensions.widths[resizingIndex + 1] - deltaXPercentage;
            if (newWidth1 >= minWidth && newWidth2 >= minWidth) {
              newWidths[resizingIndex] = newWidth1;
              newWidths[resizingIndex + 1] = newWidth2;
              setDimensions(prev => ({
                ...prev,
                widths: newWidths
              }));
            }
          }
        }
        break;
      }
    }
  }, [isResizing, resizingIndex, startX, startY, startDimensions, selectedType, selectedCategory]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
    setResizingIndex(null);
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, handleResize, handleResizeEnd]);

  useEffect(() => {
    setDimensions(getDimensionsFromInput());
  }, [selectedType, sectionCount, selectedCategory, sectionDimensions]);

  // Selectează layout-ul potrivit
  if (selectedType === "2-Part Element O") {
    return (
      <TwoPartElementO
        dimensions={dimensions}
        scaled={scaled}
        sectionColors={sectionColors}
        sectionModels={sectionModels}
        isSelected={isSelected}
        onClick={onClick}
        setSelectionVisible={setSelectionVisible}
        handleVerticalResizeStart={handleVerticalResizeStart}
        selectedCategory={selectedCategory}
      />
    );
  }
  if (selectedType === "4-Part Element O") {
    return (
      <FourPartElementO
        dimensions={dimensions}
        scaled={scaled}
        sectionColors={sectionColors}
        sectionModels={sectionModels}
        isSelected={isSelected}
        onClick={onClick}
        setSelectionVisible={setSelectionVisible}
        handleVerticalResizeStart={handleVerticalResizeStart}
        handleHorizontalResizeStart={handleHorizontalResizeStart}
        selectedCategory={selectedCategory}
      />
    );
  }
  if (/^\d+-Part Element A$/.test(selectedType)) {
    return (
      <XPartElementA
        dimensions={dimensions}
        scaled={scaled}
        sectionColors={sectionColors}
        sectionModels={sectionModels}
        isSelected={isSelected}
        onClick={onClick}
        setSelectionVisible={setSelectionVisible}
        sectionCount={sectionCount}
        resizingIndex={resizingIndex}
        isResizing={isResizing}
        handleSectionResizeStart={handleSectionResizeStart}
        handleTopSectionResizeStart={handleTopSectionResizeStart}
        selectedCategory={selectedCategory}
      />
    );
  }
  // Default layout
  return (
    <DefaultSectionLayout
      dimensions={dimensions}
      scaled={scaled}
      sectionColors={sectionColors}
      sectionModels={sectionModels}
      isSelected={isSelected}
      onClick={onClick}
      setSelectionVisible={setSelectionVisible}
      sectionCount={sectionCount}
      isResizing={isResizing}
      resizingIndex={resizingIndex}
      handleSectionResizeStart={handleSectionResizeStart}
      selectedCategory={selectedCategory}
    />
  );
}

export default SectionRenderer;
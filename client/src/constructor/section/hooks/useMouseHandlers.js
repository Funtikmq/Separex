import { useState, useCallback, useEffect } from 'react';
import { SECTION_CATEGORIES } from '../constants/sectionConstants';

export const useMouseHandlers = (handleResize) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizingIndex, setResizingIndex] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startDimensions, setStartDimensions] = useState(null);

  const handleResizeStart = useCallback((e, type, selectedCategory, dimensions) => {
    if (selectedCategory === SECTION_CATEGORIES.SLIDING_DOORS) return;
    e.preventDefault();
    setIsResizing(true);
    setResizingIndex(type);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setStartDimensions({...dimensions});
  }, []);

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

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return {
    isResizing,
    handleResizeStart,
    handleMouseMove,
    handleMouseUp
  };
};
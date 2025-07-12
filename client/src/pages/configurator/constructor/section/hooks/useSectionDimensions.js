import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  calculateDefaultDimensions, 
  calculateDimensionsFromInput, 
  validateDimensions 
} from '../utils/dimensionCalculations';

export const useSectionDimensions = ({
  selectedType,
  sectionCount,
  doorDimensions,
  sectionDimensions
}) => {
  const prevSelectedType = useRef(null);
  const [dimensions, setDimensions] = useState(() => 
    calculateDimensionsFromInput({
      doorDimensions,
      sectionDimensions,
      selectedType,
      sectionCount
    })
  );

  const updateDimensions = useCallback((newDims) => {
    const validatedDims = validateDimensions(newDims, () => 
      calculateDefaultDimensions(selectedType, sectionCount)
    );
    setDimensions(validatedDims);
  }, [selectedType, sectionCount]);

  useEffect(() => {
    const newDimensions = calculateDimensionsFromInput({
      doorDimensions,
      sectionDimensions,
      selectedType,
      sectionCount
    });
    updateDimensions(newDimensions);
  }, [sectionDimensions, doorDimensions, selectedType, sectionCount, updateDimensions]);

  useEffect(() => {
    if (selectedType !== prevSelectedType.current) {
      const newDimensions = calculateDimensionsFromInput({
        doorDimensions,
        sectionDimensions,
        selectedType,
        sectionCount
      });
      updateDimensions(newDimensions);
      prevSelectedType.current = selectedType;
    }
  }, [selectedType, doorDimensions, sectionDimensions, sectionCount, updateDimensions]);

  return {
    dimensions,
    updateDimensions,
    setDimensions
  };
};
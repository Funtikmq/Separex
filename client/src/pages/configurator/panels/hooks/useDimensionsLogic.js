import { useState, useCallback } from 'react';

const useDimensionLogic = (
  initialDimensions,
  dimensionLimits,
  onDimensionsChange
) => {
  // State pentru valorile raw din input
  const [rawInput, setRawInput] = useState({
    height: initialDimensions.height.toString(),
    width: initialDimensions.width.toString(),
  });

  // Handler pentru schimbarea valorii input-ului
  const handleChange = useCallback((field, value) => {
    setRawInput(prev => ({ ...prev, [field]: value }));
  }, []);

  // Handler pentru confirmarea valorii (la blur sau enter)
  const handleInputConfirm = useCallback((field) => {
    const num = parseInt(rawInput[field], 10);
    if (!isNaN(num)) {
      const isHeight = field === "height";
      const min = isHeight ? dimensionLimits.MIN_HEIGHT : dimensionLimits.MIN_WIDTH;
      const max = isHeight ? dimensionLimits.MAX_HEIGHT : dimensionLimits.MAX_WIDTH;

      let finalValue;
      if (num < min) {
        finalValue = min;
      } else if (num > max) {
        finalValue = max;
      } else {
        finalValue = num;
      }

      setRawInput(prev => ({ ...prev, [field]: finalValue.toString() }));
      onDimensionsChange(prev => ({ ...prev, [field]: finalValue }));
    }
  }, [rawInput, dimensionLimits, onDimensionsChange]);

  // Handler pentru butoanele +/-
  const handleStep = useCallback((field, direction) => {
    const current = parseInt(rawInput[field], 10) || 0;
    const step = direction === "up" ? 10 : -10;
    const newValue = current + step;

    const isHeight = field === "height";
    const min = isHeight ? dimensionLimits.MIN_HEIGHT : dimensionLimits.MIN_WIDTH;
    const max = isHeight ? dimensionLimits.MAX_HEIGHT : dimensionLimits.MAX_WIDTH;

    let finalValue;
    if (newValue < min) {
      finalValue = min;
    } else if (newValue > max) {
      finalValue = max;
    } else {
      finalValue = newValue;
    }

    setRawInput(prev => ({ ...prev, [field]: finalValue.toString() }));
    onDimensionsChange(prev => ({ ...prev, [field]: finalValue }));
  }, [rawInput, dimensionLimits, onDimensionsChange]);

  return {
    rawInput,
    handleChange,
    handleInputConfirm,
    handleStep
  };
};

export default useDimensionLogic;
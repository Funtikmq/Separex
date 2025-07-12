import { useState, useEffect, useCallback } from 'react';

const useSectionLogic = (
  doorDimensions,
  sectionDimensions,
  setSectionDimensions,
  sectionCount,
  selectedType
) => {
  // Funcția pentru calcularea dimensiunilor sigure ale secțiunilor
  const calculateSafeSectionDimensions = useCallback(() => {
    if (selectedType.includes("Part Element O")) {
      return [
        (sectionDimensions && sectionDimensions[0] !== undefined) ? sectionDimensions[0].toString() : "",
        (sectionDimensions && sectionDimensions[1] !== undefined) ? sectionDimensions[1].toString() : "",
        (sectionDimensions && sectionDimensions[2] !== undefined) ? sectionDimensions[2].toString() : "",
        (sectionDimensions && sectionDimensions[3] !== undefined) ? sectionDimensions[3].toString() : ""
      ];
    }
    return Array.from({ length: sectionCount }, (_, i) => 
      sectionDimensions?.[i]?.toString() || ""
    );
  }, [sectionDimensions, sectionCount, selectedType]);

  const [safeSectionDimensions, setSafeSectionDimensions] = useState(
    calculateSafeSectionDimensions()
  );

  useEffect(() => {
    setSafeSectionDimensions(sectionDimensions.map(d => d.toString()));
  }, [sectionDimensions]);

  useEffect(() => {
    setSafeSectionDimensions(calculateSafeSectionDimensions());
  }, [doorDimensions, sectionCount, selectedType, sectionDimensions, calculateSafeSectionDimensions]);

  const handleSectionChange = useCallback((index, val) => {
    const newSections = [...safeSectionDimensions];
    newSections[index] = val;
    setSafeSectionDimensions(newSections);
  }, [safeSectionDimensions]);

  const updateSections = useCallback((newSections) => {
    setSafeSectionDimensions(newSections);
    setSectionDimensions(newSections.map(v => parseFloat(v) || 0));
  }, [setSectionDimensions]);

  const handleTwoPartElementO = useCallback((index, numValue) => {
    const totalHeight = doorDimensions.height;
    const minSectionSize = Math.floor(totalHeight / 100 * 5);
    let finalValue = numValue;
    
    if (finalValue < minSectionSize) finalValue = minSectionSize;
    if (finalValue > totalHeight - minSectionSize) finalValue = totalHeight - minSectionSize;
    
    const newSections = [...safeSectionDimensions];
    if (index === 0) {
      newSections[0] = finalValue.toString();
      newSections[1] = (totalHeight - finalValue).toString();
    } else {
      newSections[1] = finalValue.toString();
      newSections[0] = (totalHeight - finalValue).toString();
    }
    
    updateSections(newSections);
  }, [doorDimensions.height, safeSectionDimensions, updateSections]);

  const handleFourPartElementO = useCallback((index, numValue) => {
    const totalWidth = doorDimensions.width;
    const totalHeight = doorDimensions.height;
    const minSectionSizeWidth = Math.floor(totalWidth / 100 * 5);
    const minSectionSizeHeight = Math.floor(totalHeight / 100 * 5);
    const newSections = [...safeSectionDimensions];
    let finalValue = numValue;

    if (index === 2) { // Lățime (stânga)
      if (finalValue < minSectionSizeWidth) finalValue = minSectionSizeWidth;
      if (finalValue > totalWidth - minSectionSizeWidth) finalValue = totalWidth - minSectionSizeWidth;
      newSections[2] = finalValue.toString();
      newSections[3] = (totalWidth - finalValue).toString();
    }
    if (index === 0) { // Înălțime (sus)
      if (finalValue < minSectionSizeHeight) finalValue = minSectionSizeHeight;
      if (finalValue > totalHeight - minSectionSizeHeight) finalValue = totalHeight - minSectionSizeHeight;
      newSections[0] = finalValue.toString();
      newSections[1] = (totalHeight - finalValue).toString();
    }

    updateSections(newSections);
  }, [doorDimensions.width, doorDimensions.height, safeSectionDimensions, updateSections]);

  const handlePartElementA = useCallback((index, numValue) => {
    const totalWidth = doorDimensions.width;
    const totalHeight = doorDimensions.height;
    const minSectionSize = Math.floor(totalWidth / 100 * 5);
    const newSections = [...safeSectionDimensions];

    if (index === 0) {
      // Top Section - independent
      let finalValue = numValue;
      const minH = Math.floor(totalHeight / 100 * 5);
      if (finalValue < minH) finalValue = minH;
      if (finalValue > totalHeight - minH) finalValue = totalHeight - minH;
      newSections[0] = finalValue.toString();
    } else {
      // Secțiuni laterale
      let finalValue = numValue;
      // Limitează la minim și maxim, la fel ca la O
      if (finalValue < minSectionSize) finalValue = minSectionSize;
      if (finalValue > totalWidth - minSectionSize) finalValue = totalWidth - minSectionSize;

      if (index < newSections.length - 1) {
        newSections[index] = finalValue.toString();
        const rest = totalWidth - newSections.slice(1, -1).reduce((sum, v, i) => 
          i !== index - 1 ? sum + parseFloat(v) : sum, 0) - finalValue;
        newSections[index + 1] = Math.max(minSectionSize, rest).toString();
      } else {
        newSections[index] = finalValue.toString();
        const rest = totalWidth - newSections.slice(1, -1).reduce((sum, v, i) => 
          i !== index - 1 ? sum + parseFloat(v) : sum, 0) - finalValue;
        newSections[index - 1] = Math.max(minSectionSize, rest).toString();
      }
    }

    updateSections(newSections);
  }, [doorDimensions.width, doorDimensions.height, safeSectionDimensions, updateSections]);

  const handleDefaultWidthSplit = useCallback((index, numValue) => {
    const totalDimension = doorDimensions.width;
    const minSectionSize = Math.floor(totalDimension / 100 * 5);
    const newSections = [...safeSectionDimensions];
    let finalValue = numValue;

    // Limitează la minim și maxim, la fel ca la O și XPart A
    if (finalValue < minSectionSize) finalValue = minSectionSize;
    if (finalValue > totalDimension - minSectionSize) finalValue = totalDimension - minSectionSize;

    if (index < newSections.length - 1) {
      newSections[index] = finalValue.toString();
      const rest = totalDimension - newSections.reduce((sum, v, i) => 
        i !== index && i !== index + 1 ? sum + parseFloat(v) : sum, 0) - finalValue;
      newSections[index + 1] = Math.max(minSectionSize, rest).toString();
    } else {
      newSections[index] = finalValue.toString();
      const rest = totalDimension - newSections.reduce((sum, v, i) => 
        i !== index && i !== index - 1 ? sum + parseFloat(v) : sum, 0) - finalValue;
      newSections[index - 1] = Math.max(minSectionSize, rest).toString();
    }

    updateSections(newSections);
  }, [doorDimensions.width, safeSectionDimensions, updateSections]);

  const handleSectionConfirm = useCallback((index) => {
    const numValue = parseFloat(safeSectionDimensions[index]) || 0;
    
    if (selectedType === "4-Part Element O") {
      handleFourPartElementO(index, numValue);
    }
    else if (selectedType === "2-Part Element O") {
      handleTwoPartElementO(index, numValue);
    }
    else if (selectedType.includes("Part Element A")) {
      handlePartElementA(index, numValue);
    }
    else {
      handleDefaultWidthSplit(index, numValue);
    }
  }, [
    safeSectionDimensions, 
    selectedType, 
    handleFourPartElementO, 
    handleTwoPartElementO, 
    handlePartElementA, 
    handleDefaultWidthSplit
  ]);

  return {
    safeSectionDimensions,
    handleSectionChange,
    handleSectionConfirm
  };
};

export default useSectionLogic;
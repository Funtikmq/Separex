export const calculateDefaultDimensions = (selectedType, sectionCount) => {
  switch (selectedType) {
    case "2-Part Element O":
      return { height: 50, secondHeight: 50 };
    case "4-Part Element O":
      return {
        height: 50,
        secondHeight: 50,
        width: 50,
        secondWidth: 50
      };
    case (selectedType.match(/^\d+-Part Element A$/) || {}).input:
      return {
        topHeight: 30,
        widths: Array(sectionCount - 1).fill(100 / (sectionCount - 1))
      };
    default:
      return { widths: Array(sectionCount).fill(100 / sectionCount) };
  }
};

export const calculateDimensionsFromInput = ({
  doorDimensions,
  sectionDimensions,
  selectedType,
  sectionCount
}) => {
  if (!doorDimensions || !sectionDimensions) {
    return calculateDefaultDimensions(selectedType, sectionCount);
  }

  let dimensions;

  switch (selectedType) {
    case "2-Part Element O": {
      const totalHeight = doorDimensions.height;
      const h1 = sectionDimensions[0] || totalHeight / 2;
      const h2 = sectionDimensions[1] || totalHeight - h1;
      
      dimensions = {
        height: (h1 / totalHeight) * 100,
        secondHeight: (h2 / totalHeight) * 100
      };
      break;
    }
    
    case "4-Part Element O": {
      const totalHeight = doorDimensions.height;
      const totalWidth = doorDimensions.width;
      const h1 = sectionDimensions[0] || totalHeight / 2;
      const h2 = sectionDimensions[1] || totalHeight - h1;
      const w1 = sectionDimensions[2] || totalWidth / 2;
      const w2 = sectionDimensions[3] || totalWidth - w1;
      
      dimensions = {
        height: (h1 / totalHeight) * 100,
        secondHeight: (h2 / totalHeight) * 100,
        width: (w1 / totalWidth) * 100,
        secondWidth: (w2 / totalWidth) * 100
      };
      break;
    }
    
    case (selectedType.match(/^\d+-Part Element A$/) || {}).input: {
      const totalHeight = doorDimensions.height;
      const totalWidth = doorDimensions.width;
      const topH = sectionDimensions[0] || totalHeight * 0.3;
      
      dimensions = {
        topHeight: (topH / totalHeight) * 100,
        widths: sectionDimensions
          .slice(1)
          .map(w => w ? (w / totalWidth) * 100 : 100 / (sectionCount - 1))
      };
      break;
    }
    
    default: {
      const totalWidth = doorDimensions.width;
      dimensions = {
        widths: sectionDimensions.map(w => 
          w ? (w / totalWidth) * 100 : 100 / sectionCount
        )
      };
    }
  }

  return dimensions;
};

export const validateDimensions = (dims, getDefaultDimensions) => {
  if (!dims) return getDefaultDimensions();
  
  const validatedDims = { ...dims };
  
  if (validatedDims.widths) {
    const sum = validatedDims.widths.reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 100) > 0.01) {
      validatedDims.widths = validatedDims.widths.map(w => (w / sum) * 100);
    }
  }
  
  if (validatedDims.height && validatedDims.secondHeight) {
    const sum = validatedDims.height + validatedDims.secondHeight;
    if (Math.abs(sum - 100) > 0.01) {
      const factor = 100 / sum;
      validatedDims.height *= factor;
      validatedDims.secondHeight *= factor;
    }
  }
  
  return validatedDims;
};
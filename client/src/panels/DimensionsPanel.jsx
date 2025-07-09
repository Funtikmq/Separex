import { useState, useEffect } from "react";
import { DIMENSION_LIMITS } from "../constants/constants";

function DimensionsPanel({
  doorDimensions,
  setDoorDimensions,
  sectionDimensions,
  setSectionDimensions,
  sectionCount,
  selectedCategory,
  selectedType
}) {
  const { MIN_HEIGHT, MAX_HEIGHT, MIN_WIDTH, MAX_WIDTH } = DIMENSION_LIMITS;

  const [rawInput, setRawInput] = useState({
    height: doorDimensions.height.toString(),
    width: doorDimensions.width.toString(),
  });

  const calculateSafeSectionDimensions = () => {
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
  };

  const [safeSectionDimensions, setSafeSectionDimensions] = useState(
    calculateSafeSectionDimensions()
  );

useEffect(() => {
    setSafeSectionDimensions(sectionDimensions.map(d => d.toString()));
    },[sectionDimensions]);

  useEffect(() => {
    setSafeSectionDimensions(calculateSafeSectionDimensions());
  }, [doorDimensions, sectionCount, selectedType, sectionDimensions]);


  const handleChange = (field, val) => {
    setRawInput(prev => ({ ...prev, [field]: val }));
  };

  const handleInputConfirm = (field) => {
    const num = parseInt(rawInput[field], 10);
    if (!isNaN(num)) {
      let finalValue;
      const isHeight = field === "height";
      const min = isHeight ? MIN_HEIGHT : MIN_WIDTH;
      const max = isHeight ? MAX_HEIGHT : MAX_WIDTH;

      if (num < min) {
        finalValue = min;
      } else if (num > max) {
        finalValue = max;
      } else {
        finalValue = num;
      }

      setRawInput(prev => ({ ...prev, [field]: finalValue.toString() }));
      setDoorDimensions(prev => ({ ...prev, [field]: finalValue }));
    }
};

const handleStep = (field, direction) => {
    const current = parseInt(rawInput[field], 10) || 0;
    const step = direction === "up" ? 10 : -10;
    const newValue = current + step;

    const isHeight = field === "height";
    const min = isHeight ? MIN_HEIGHT : MIN_WIDTH;
    const max = isHeight ? MAX_HEIGHT : MAX_WIDTH;

    let finalValue;
    if (newValue < min) {
      finalValue = min;
    } else if (newValue > max) {
      finalValue = max;
    } else {
      finalValue = newValue;
    }

    setRawInput(prev => ({ ...prev, [field]: finalValue.toString() }));
    setDoorDimensions(prev => ({ ...prev, [field]: finalValue }));
};

  const handleSectionChange = (index, val) => {
    const newSections = [...safeSectionDimensions];
    newSections[index] = val;
    setSafeSectionDimensions(newSections);
  };

  const handleSectionConfirm = (index, dimensionType) => {
    const numValue = parseFloat(safeSectionDimensions[index]) || 0;
    
    if (selectedType === "4-Part Element O") {
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
      setSafeSectionDimensions(newSections);
      setSectionDimensions(newSections.map(v => parseFloat(v) || 0));
    }
    else if (selectedType === "2-Part Element O") {
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
      setSafeSectionDimensions(newSections);
      setSectionDimensions(newSections.map(v => parseFloat(v) || 0));
    }
    else if (selectedType.includes("Part Element A")) {
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
        // Secțiuni laterale: influențează secțiunea următoare (sau precedentă dacă e ultima)
        let finalValue = numValue;
        if (finalValue < minSectionSize) finalValue = minSectionSize;
        const values = newSections.map(v => parseFloat(v) || 0);
        if (index < newSections.length - 1) {
          // Ajustează următoarea secțiune
          newSections[index] = finalValue.toString();
          const rest = totalWidth - newSections.slice(1, -1).reduce((sum, v, i) => i !== index - 1 ? sum + parseFloat(v) : sum, 0) - finalValue;
          newSections[index + 1] = Math.max(minSectionSize, rest).toString();
        } else {
          // Ultima secțiune: ajustează precedentul
          newSections[index] = finalValue.toString();
          const rest = totalWidth - newSections.slice(1, -1).reduce((sum, v, i) => i !== index - 1 ? sum + parseFloat(v) : sum, 0) - finalValue;
          newSections[index - 1] = Math.max(minSectionSize, rest).toString();
        }
      }
      setSafeSectionDimensions(newSections);
      setSectionDimensions(newSections.map(v => parseFloat(v) || 0));
    }
    else {
      // Default: width split
      const totalDimension = doorDimensions.width;
      const minSectionSize = Math.floor(totalDimension / 100 * 5);
      const newSections = [...safeSectionDimensions];
      let finalValue = numValue;
      if (finalValue < minSectionSize) finalValue = minSectionSize;
      if (index < newSections.length - 1) {
        newSections[index] = finalValue.toString();
        // Ajustează următoarea secțiune
        const rest = totalDimension - newSections.reduce((sum, v, i) => i !== index && i !== index + 1 ? sum + parseFloat(v) : sum, 0) - finalValue;
        newSections[index + 1] = Math.max(minSectionSize, rest).toString();
      } else {
        // Ultimul input: ajustează precedentul
        newSections[index] = finalValue.toString();
        const rest = totalDimension - newSections.reduce((sum, v, i) => i !== index && i !== index - 1 ? sum + parseFloat(v) : sum, 0) - finalValue;
        newSections[index - 1] = Math.max(minSectionSize, rest).toString();
      }
      setSafeSectionDimensions(newSections);
      setSectionDimensions(newSections.map(v => parseFloat(v) || 0));
    }
  };

  const renderSectionInputs = () => {
    if (selectedType === "2-Part Element O") {
      return (
        <>
          <div className="inputGroup">
            <h2>Top Section (mm)</h2>
            <div className="inputWithButtons">
              <input
                type="number"
                value={safeSectionDimensions[0]}
                onChange={(e) => handleSectionChange(0, e.target.value)}
                onBlur={() => handleSectionConfirm(0)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSectionConfirm(0);
                  }
                }}
              />
            </div>
          </div>
          <div className="inputGroup">
            <h2>Bottom Section (mm)</h2>
            <div className="inputWithButtons">
              <input
                type="number"
                value={safeSectionDimensions[1]}
                readOnly
                disabled
              />
            </div>
          </div>
        </>
      );
    } else if (selectedType === "4-Part Element O") {
      return (
        <>
          <div className="inputGroup">
            <h2>Left Width (mm)</h2>
            <div className="inputWithButtons">
              <input
                type="number"
                value={safeSectionDimensions[2] || ""}
                onChange={(e) => handleSectionChange(2, e.target.value)}
                onBlur={() => handleSectionConfirm(2)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSectionConfirm(2);
                  }
                }}
              />
            </div>
          </div>
          <div className="inputGroup">
            <h2>Top Height (mm)</h2>
            <div className="inputWithButtons">
              <input
                type="number"
                value={safeSectionDimensions[0] || ""}
                onChange={(e) => handleSectionChange(0, e.target.value)}
                onBlur={() => handleSectionConfirm(0)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSectionConfirm(0);
                  }
                }}
              />
            </div>
          </div>
        </>
      );
    } else if (selectedType.includes("Part Element A")) {
      return (
        <>
          {/* Top Section - independent */}
          <div className="inputGroup">
            <h2>Top Section (mm)</h2>
            <div className="inputWithButtons">
              <input
                type="number"
                value={safeSectionDimensions[0]}
                onChange={(e) => handleSectionChange(0, e.target.value)}
                onBlur={() => handleSectionConfirm(0)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSectionConfirm(0);
                  }
                }}
              />
            </div>
          </div>
          {/* Restul secțiunilor numerotate de la 1 la N */}
          {Array.from({ length: sectionCount - 1 }).map((_, idx) => (
            <div className="inputGroup" key={`section-${idx + 1}`}>
              <h2>Section {idx + 1} (mm)</h2>
              <div className="inputWithButtons">
                <input
                  type="number"
                  value={safeSectionDimensions[idx + 1] || ""}
                  onChange={(e) => handleSectionChange(idx + 1, e.target.value)}
                  onBlur={() => handleSectionConfirm(idx + 1)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSectionConfirm(idx + 1);
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </>
      );
    } else {
      return (
        <>
          {Array.from({ length: sectionCount }).map((_, idx) => (
            <div className="inputGroup" key={`section-${idx}`}>
              <h2>Section {idx + 1} (mm)</h2>
              <div className="inputWithButtons">
                <input
                  type="number"
                  value={safeSectionDimensions[idx] || ""}
                  onChange={(e) => handleSectionChange(idx, e.target.value)}
                  onBlur={() => handleSectionConfirm(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSectionConfirm(idx);
                    }
                  }}
                  readOnly={selectedCategory === "Sliding Doors"}
                />
              </div>
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <div className="navigationPanel">
      <form className="dimensionsForm">
        <div className="inputGroup">
          <h2>Height</h2>
          <div className="inputWithButtons">
            <button type="button" onClick={() => handleStep("height", "down")}>
              −
            </button>
            <input
              type="number"
              placeholder="Height"
              value={rawInput.height}
              onChange={(e) => handleChange("height", e.target.value)}
              onBlur={() => handleInputConfirm("height")}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleInputConfirm("height");
                }
              }}
            />
            <button type="button" onClick={() => handleStep("height", "up")}>
              +
            </button>
          </div>
        </div>

        <div className="inputGroup">
          <h2>Width</h2>
          <div className="inputWithButtons">
            <button type="button" onClick={() => handleStep("width", "down")}>
              −
            </button>
            <input
              type="number"
              placeholder="Width"
              value={rawInput.width}
              onChange={(e) => handleChange("width", e.target.value)}
              onBlur={() => handleInputConfirm("width")}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleInputConfirm("width");
                }
              }}
            />
            <button type="button" onClick={() => handleStep("width", "up")}>
              +
            </button>
          </div>
        </div>

        <div className="sectionDimensions">{renderSectionInputs()}</div>
      </form>
    </div>
  );
}

export default DimensionsPanel;
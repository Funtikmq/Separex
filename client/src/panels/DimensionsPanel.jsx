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
    if (selectedType === "4-Part Element O") {

      return [
        (sectionDimensions && sectionDimensions[0] !== undefined) ? sectionDimensions[0].toString() : "",
        (sectionDimensions && sectionDimensions[1] !== undefined) ? sectionDimensions[1].toString() : ""
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
    setSafeSectionDimensions(calculateSafeSectionDimensions());
  }, [doorDimensions, sectionCount, selectedType, sectionDimensions]);

  const handleChange = (field, val) => {
    setRawInput(prev => ({ ...prev, [field]: val }));
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      const clamped = Math.min(
        Math.max(num, field === "height" ? MIN_HEIGHT : MIN_WIDTH),
        field === "height" ? MAX_HEIGHT : MAX_WIDTH
      );
      setDoorDimensions(prev => ({ ...prev, [field]: clamped }));
    }
  };

  const handleStep = (field, direction) => {
    const current = parseInt(rawInput[field], 10) || 0;
    const step = direction === "up" ? 10 : -10;
    const newValue = current + step;
    handleChange(field, newValue.toString());
  };

  const handleSectionChange = (index, val) => {
    const numValue = parseFloat(val) || 0;
    let newSections;
    if (selectedType === "4-Part Element O") {

      newSections = [
        index === 0 ? val : (safeSectionDimensions[0] || ""),
        index === 1 ? val : (safeSectionDimensions[1] || "")
      ];
      setSectionDimensions(newSections.map(v => v === "" ? 0 : parseFloat(v)));
      setSafeSectionDimensions(newSections);
      return;
    }
  
    newSections = [...safeSectionDimensions];
    newSections[index] = val;
    setSectionDimensions(newSections.map(v => v === "" ? 0 : parseFloat(v)));
    setSafeSectionDimensions(newSections);
  };
  const renderSectionInputs = () => {
    if (selectedType === "4-Part Element O") {
      return (
        <>
          <div className="inputGroup">
            <h2>1/2 Sections (mm)</h2>
            <div className="inputWithButtons">
              <input
                type="number"
                value={safeSectionDimensions[0]}
                onChange={(e) => handleSectionChange(0, e.target.value)}
                min={0}
              />
            </div>
          </div>
          <div className="inputGroup">
            <h2>3/4 Sections (mm)</h2>
            <div className="inputWithButtons">
              <input
                type="number"
                value={safeSectionDimensions[1]}
                onChange={(e) => handleSectionChange(1, e.target.value)}
                min={0}
              />
            </div>
          </div>
        </>
      );
    }
    else {
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
                readOnly={selectedCategory === "Sliding Doors"}
                min={0}
              />
            </div>
          </div>
        ))}
      </>
    );
  };
  }
    
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
              min={MIN_HEIGHT}
              max={MAX_HEIGHT}
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
              min={MIN_WIDTH}
              max={MAX_WIDTH}
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
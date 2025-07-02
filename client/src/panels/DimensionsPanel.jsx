import { useState } from "react"
import { DIMENSION_LIMITS } from "../constants/constants"

function DimensionsPanel({
  doorDimensions,
  setDoorDimensions,
  sectionDimensions,
  setSectionDimensions,
  orientation,
  sectionCount
}) {
  const {
    MIN_HEIGHT,
    MAX_HEIGHT,
    MIN_WIDTH,
    MAX_WIDTH
  } = DIMENSION_LIMITS;

  const [rawInput, setRawInput] = useState({
    height: doorDimensions.height.toString(),
    width: doorDimensions.width.toString(),
  });

  const handleChange = (field, val) => {
    setRawInput((prev) => ({ ...prev, [field]: val }));
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      const clamped = Math.min(
        Math.max(num, field === "height" ? MIN_HEIGHT : MIN_WIDTH),
        field === "height" ? MAX_HEIGHT : MAX_WIDTH
      );
      setDoorDimensions((prev) => ({ ...prev, [field]: clamped }));
    }
  };

  const handleStep = (field, direction) => {
    const current = parseInt(rawInput[field], 10) || 0;
    const step = direction === "up" ? 10 : -10;
    const newValue = current + step;
    handleChange(field, newValue.toString());
  };

  const safeSectionDimensions = Array.isArray(sectionDimensions) ? sectionDimensions : [];

  const handleSectionChange = (index, val) => {
    let num = parseFloat(val);
    if (isNaN(num) || num < 0) num = 0;
    if (num > 100) num = 100;
    let newSections = [...safeSectionDimensions];
    // Editezi doar primele N-1 inputuri
    newSections[index] = num;
    // Suma celorlalte
    const sum = newSections.slice(0, sectionCount - 1).reduce((a, b) => a + (parseFloat(b) || 0), 0);
    // Ultimul input se completează automat
    newSections[sectionCount - 1] = Math.max(0, 100 - sum);
    // Dacă suma depășește 100, ajustează inputul curent
    if (sum > 100) {
      newSections[index] = Math.max(0, 100 - newSections.slice(0, sectionCount - 1).filter((_, i) => i !== index).reduce((a, b) => a + (parseFloat(b) || 0), 0));
      newSections[sectionCount - 1] = 0;
    }
    setSectionDimensions(newSections);
  };

  return (
    <div className="navigationPanel">
      <form className="dimensionsForm">
        <div className="inputGroup">
          {/*Dimensiunile usii*/}
          <h2>Height</h2>
          <div className="inputWithButtons">
            <button type="button" onClick={() => handleStep("height", "down")}>−</button>
            <input
              type="number"
              placeholder="Height"
              value={rawInput.height}
              onChange={(e) => handleChange("height", e.target.value)}
            />
            <button type="button" onClick={() => handleStep("height", "up")}>+</button>
          </div>
        </div>

        <div className="inputGroup">
          <h2>Width</h2>
          <div className="inputWithButtons">
            <button type="button" onClick={() => handleStep("width", "down")}>−</button>
            <input
              type="number"
              placeholder="Width"
              value={rawInput.width}
              onChange={(e) => handleChange("width", e.target.value)}
            />
            <button type="button" onClick={() => handleStep("width", "up")}>+</button>
          </div>
        </div>
        {/*Dimensiunile sectiunilor*/}
        <div className="sectionDimensions">
          {Array.from({ length: sectionCount }).map((_, idx) => (
            <div className="inputGroup" key={idx}>
              <h2>Section {idx + 1}</h2>
              <div className="inputWithButtons">
                <input
                  type="number"
                  placeholder={orientation === "vertical" ? "Width" : "Heigth"}
                  value={safeSectionDimensions[idx] === undefined ? "" : safeSectionDimensions[idx]}
                  onChange={e => idx < sectionCount - 1 ? handleSectionChange(idx, e.target.value) : undefined}
                  readOnly={sectionCount === 1 || idx === sectionCount - 1}
                />
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default DimensionsPanel;
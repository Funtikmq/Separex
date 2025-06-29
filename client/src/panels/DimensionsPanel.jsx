import { useState } from "react"
import { DIMENSION_LIMITS } from "../constants/constants"

function DimensionsPanel({doorDimensions,setDoorDimensions}) {

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
      const clamped = Math.min(Math.max(num, field === "height" ? MIN_HEIGHT : MIN_WIDTH), field === "height" ? MAX_HEIGHT : MAX_WIDTH);
      setDoorDimensions((prev) => ({ ...prev, [field]: clamped }));
    }
  };

  const handleStep = (field,direction) => {
      const current = parseInt(rawInput[field],10) || 0;
      const step = direction === "up" ? 10 : -10;
      const newValue = current + step;
      handleChange(field,newValue.toString());
  };

  return (
  <div className="navigationPanel">
    <form className="dimensionsForm">
      <div className="inputGroup">
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
    </form>
  </div>
);
}

export default DimensionsPanel;
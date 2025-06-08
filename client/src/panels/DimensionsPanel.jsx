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

  return (
    <div className="navigationPanel">
      <h2>Enter Dimensions</h2>
      <input
        type="number"
        placeholder="Height"
        value={rawInput.height}
        onChange={(e) => handleChange("height", e.target.value)}
      />
      <input
        type="number"
        placeholder="Width"
        value={rawInput.width}
        onChange={(e) => handleChange("width", e.target.value)}
      />
    </div>
  );
}

export default DimensionsPanel;
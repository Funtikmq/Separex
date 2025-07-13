import { DIMENSION_LIMITS } from "../constants/constants";
import InputWithButtons from "./InputWithButtons";
import SectionInputs from "./SectionInputs";
import useDimensionLogic from "./hooks/useDimensionsLogic";
import useSectionLogic from "./hooks/useSectionLogic";

function DimensionsPanel({
  doorDimensions,
  setDoorDimensions,
  sectionDimensions,
  setSectionDimensions,
  sectionCount,
  selectedCategory,
  selectedType,
}) {
  const { rawInput, handleChange, handleInputConfirm, handleStep } =
    useDimensionLogic(doorDimensions, DIMENSION_LIMITS, setDoorDimensions);

  const { safeSectionDimensions, handleSectionChange, handleSectionConfirm } =
    useSectionLogic(
      doorDimensions,
      sectionDimensions,
      setSectionDimensions,
      sectionCount,
      selectedType
    );

  return (
    <div className="navigationPanel">
      <form className="dimensionsForm">
        <div className="inputGroup">
          <h2>Height</h2>
          <InputWithButtons
            value={rawInput.height}
            onChange={(val) => handleChange("height", val)}
            onBlur={() => handleInputConfirm("height")}
            onStep={(direction) => handleStep("height", direction)}
            placeholder="Height"
          />
        </div>

        <div className="inputGroup">
          <h2>Width</h2>
          <InputWithButtons
            value={rawInput.width}
            onChange={(val) => handleChange("width", val)}
            onBlur={() => handleInputConfirm("width")}
            onStep={(direction) => handleStep("width", direction)}
            placeholder="Width"
          />
        </div>

        <SectionInputs
          selectedType={selectedType}
          selectedCategory={selectedCategory}
          safeSectionDimensions={safeSectionDimensions}
          handleSectionChange={handleSectionChange}
          handleSectionConfirm={handleSectionConfirm}
          sectionCount={sectionCount}
        />
      </form>
    </div>
  );
}

export default DimensionsPanel;

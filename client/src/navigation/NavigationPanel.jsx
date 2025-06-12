import CategoryPanel from "../panels/CategoryPanel.jsx";
import TypePanel from "../panels/TypePanel.jsx";
import DimensionsPanel from "../panels/DimensionsPanel.jsx";
import ModelPanel from "../panels/ModelsPanel.jsx";
import HandlePanel from "../panels/HandlesPanel.jsx";
import ColorPanel from "../panels/ColorsPanel.jsx";

function NavigationPanel({
  activeItem,
  selectedCategory,
  setSelectedCategory,
  doorDimensions,
  setDoorDimensions,
  setSectionCount,
  slidingMountType,
  setSlidingMountType,
  setSelectedType
}) {
  if (!activeItem) return null;
  switch (activeItem) {
    case "Category":
      return <CategoryPanel setSelectedCategory={setSelectedCategory} />;
    case "Type":
      return (
        <TypePanel
          selectedCategory={selectedCategory}
          slidingMountType={slidingMountType}
          setSlidingMountType={setSlidingMountType}
          setSectionCount={setSectionCount}
          setSelectedType={setSelectedType}
        />
      );
    case "Dimensions":
      return (
        <DimensionsPanel
          doorDimensions={doorDimensions}
          setDoorDimensions={setDoorDimensions}
        />
      );
    case "Model":
      return <ModelPanel />;
    case "Handle":
      return <HandlePanel selectedCategory={selectedCategory} />;
    case "Color":
      return <ColorPanel />;

    default:
      return null;
  }
}

export default NavigationPanel;
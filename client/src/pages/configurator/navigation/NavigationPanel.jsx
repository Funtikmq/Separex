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
  sectionCount,
  slidingMountType,
  setSlidingMountType,
  setSelectedType,
  selectedType,
  sectionModels,
  setSectionModels,
  sectionColors,
  setSectionColors,
  selectedHandle,
  setSelectedHandle,
  selectedIndex,
  sectionDimensions,
  setSectionDimensions,
  sectionTypes,
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
          sectionCount={sectionCount}
          sectionDimensions={sectionDimensions}
          setSectionDimensions={setSectionDimensions}
          selectedCategory={selectedCategory}
          selectedType={selectedType}
        />
      );
    case "Model":
      return (
        <ModelPanel
          setSectionModels={setSectionModels}
          sectionModels={sectionModels}
          selectedIndex={selectedIndex}
        />
      );
    case "Handle":
      return (
        <HandlePanel
          selectedCategory={selectedCategory}
          selectedHandle={selectedHandle}
          setSelectedHandle={setSelectedHandle}
          selectedIndex={selectedIndex}
          sectionTypes={sectionTypes}
        />
      );

    case "Color":
      return (
        <ColorPanel
          sectionColors={sectionColors}
          setSectionColors={setSectionColors}
          selectedIndex={selectedIndex}
        />
      );

    default:
      return null;
  }
}

export default NavigationPanel;

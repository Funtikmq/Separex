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
  slidingType,
  setSlidingType,
  setSlidingMountType,
  setSelectedType,
  selectedType,
  sectionModels,
  setSectionModels,
  sectionColors,
  setProfileColor,
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
      return (
        <CategoryPanel
          setSelectedCategory={setSelectedCategory}
          activeItem={activeItem}
        />
      );
    case "Type":
      return (
        <TypePanel
          selectedCategory={selectedCategory}
          slidingMountType={slidingMountType}
          setSlidingMountType={setSlidingMountType}
          slidingType={slidingType}
          setSlidingType={setSlidingType}
          setSectionCount={setSectionCount}
          setSelectedType={setSelectedType}
          activeItem={activeItem}
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
    case "Models":
      return (
        <ModelPanel
          setSectionModels={setSectionModels}
          sectionModels={sectionModels}
          selectedIndex={selectedIndex}
          activeItem={activeItem}
        />
      );
    case "Handles":
      return (
        <HandlePanel
          selectedCategory={selectedCategory}
          selectedHandle={selectedHandle}
          setSelectedHandle={setSelectedHandle}
          selectedIndex={selectedIndex}
          sectionTypes={sectionTypes}
          activeItem={activeItem}
        />
      );

    case "Colors":
      return (
        <ColorPanel
          sectionColors={sectionColors}
          setSectionColors={setSectionColors}
          setProfileColor={setProfileColor}
          selectedIndex={selectedIndex}
        />
      );

    default:
      return null;
  }
}

export default NavigationPanel;

import { useState, useEffect, useRef } from "react";
import NavigationItem from "./NavigationItem";
import NavigationPanel from "./NavigationPanel";
import categoryIcon from "@assets/itemIcons/brochure.png";
import typeIcon from "@assets/itemIcons/sliding-door.png";
import dimensionsIcon from "@assets/itemIcons/dimensions.png";
import modelIcon from "@assets/itemIcons/model.png";
import colorIcon from "@assets/itemIcons/art.png";
import handlesIcon from "@assets/itemIcons/handles.png";

function NavigationBar({
  doorDimensions,
  setDoorDimensions,
  setSectionCount,
  sectionCount,
  slidingMountType,
  setSlidingMountType,
  slidingType,
  setSlidingType,
  selectedCategory,
  selectedIndex,
  setSelectedCategory,
  setSelectedType,
  selectedType,
  setSectionModels,
  sectionModels,
  setSectionColors,
  sectionColors,
  setProfileColor,
  selectedHandle,
  setSelectedHandle,
  doorFrameRef,
  sectionDimensions,
  setSectionDimensions,
  sectionTypes,
}) {
  const [activeItem, setActiveItem] = useState(null);
  const wrapperRef = useRef(null);

  const items = [
    "Category",
    "Type",
    "Dimensions",
    "Models",
    "Handles",
    "Colors",
  ];
  const itemImg = [
    categoryIcon,
    typeIcon,
    dimensionsIcon,
    modelIcon,
    handlesIcon,
    colorIcon,
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      const clickedInsidePanel =
        wrapperRef.current && wrapperRef.current.contains(event.target);
      const clickedInsideDoorFrame =
        doorFrameRef.current && doorFrameRef.current.contains(event.target);

      if (!clickedInsidePanel && !clickedInsideDoorFrame) {
        setActiveItem(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [doorFrameRef]);

  return (
    <div ref={wrapperRef} style={{ display: "flex" }}>
      <nav>
        <ul className="navigationBar">
          {items.map((item, index) => (
            <NavigationItem
              key={item}
              isActive={activeItem === item}
              onClick={() => setActiveItem(item)}
              img={itemImg[index]}
            >
              {item}
            </NavigationItem>
          ))}
        </ul>
      </nav>
      <NavigationPanel
        activeItem={activeItem}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        doorDimensions={doorDimensions}
        setDoorDimensions={setDoorDimensions}
        setSectionCount={setSectionCount}
        sectionCount={sectionCount}
        slidingMountType={slidingMountType}
        setSlidingMountType={setSlidingMountType}
        slidingType={slidingType}
        setSlidingType={setSlidingType}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
        setSectionModels={setSectionModels}
        sectionModels={sectionModels}
        setSectionColors={setSectionColors}
        sectionColors={sectionColors}
        setProfileColor={setProfileColor}
        selectedHandle={selectedHandle}
        setSelectedHandle={setSelectedHandle}
        selectedIndex={selectedIndex}
        sectionDimensions={sectionDimensions}
        setSectionDimensions={setSectionDimensions}
        sectionTypes={sectionTypes}
      />
    </div>
  );
}

export default NavigationBar;

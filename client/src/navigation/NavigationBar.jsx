import { useState, useEffect, useRef } from 'react';
import NavigationItem from './NavigationItem';
import NavigationPanel from './NavigationPanel';
import Category from '../assets/itemIcons/brochure.png';
import Type from '../assets/itemIcons/sliding-door.png';
import Dimensions from '../assets/itemIcons/dimensions.png';
import Model from '../assets/itemIcons/model.png';
import Color from '../assets/itemIcons/art.png';
import Handles from '../assets/itemIcons/handles.png';

function NavigationBar({
    doorDimensions,
    setDoorDimensions,
    setSectionCount,
    slidingMountType,
    setSlidingMountType,
    selectedCategory,
    selectedIndex,
    setSelectedCategory,
    setSelectedType,
    setSectionModels,
    sectionModels,
    setSectionColors,
    sectionColors,
    selectedHandle,
    setSelectedHandle,
    doorFrameRef 
}) {
    const [activeItem, setActiveItem] = useState(null);
    const wrapperRef = useRef(null);

    const items = ["Category", "Type", "Dimensions", "Model", "Handle", "Color"];
    const itemImg = [Category, Type, Dimensions, Model, Handles, Color];

    useEffect(() => {
        setSelectedType("1-Part Element");
        setSectionCount(1);
    }, [selectedCategory]);

    useEffect(() => {
    function handleClickOutside(event) {
        const clickedInsidePanel = wrapperRef.current && wrapperRef.current.contains(event.target);
        const clickedInsideDoorFrame = doorFrameRef.current && doorFrameRef.current.contains(event.target);

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
                slidingMountType={slidingMountType}
                setSlidingMountType={setSlidingMountType}
                setSelectedType={setSelectedType}
                setSectionModels={setSectionModels}
                sectionModels={sectionModels}
                setSectionColors={setSectionColors}
                sectionColors={sectionColors}
                selectedHandle={selectedHandle}
                setSelectedHandle={setSelectedHandle}
                selectedIndex={selectedIndex}
            />
        </div>
    );
}

export default NavigationBar;

import { useState, useEffect, useRef } from 'react';
import NavigationItem from './NavigationItem';
import NavigationPanel from './NavigationPanel';
import Category from '../assets/brochure.png'
import Type from '../assets/sliding-door.png'
import Dimensions from '../assets/dimensions.png'
import Model from '../assets/model.png';
import Color from '../assets/art.png';
import Handles from '../assets/handles.png'


function NavigationBar({doorDimensions,
                        setDoorDimensions,
                        setSectionCount,
                        slidingMountType,
                        setSlidingMountType,
                        selectedCategory,
                        setSelectedCategory,
                        setSelectedType
                    }) {

    useEffect(() => {setSelectedType("1-Part Element");setSectionCount(1);}, [selectedCategory]);

    const [activeItem, setActiveItem] = useState(null);

    const wrapperRef = useRef(null);

     const items = ["Category", "Type", "Dimensions", "Model","Handle" ,"Color"];

     const itemImg = [Category, Type, Dimensions, Model,Handles,Color];

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setActiveItem(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={wrapperRef} style={{ display: "flex" }}>
            <nav>
                <ul className="navigationBar">
                    {items.map((item,index) => (
                        <NavigationItem
                            key={item}
                            isActive={activeItem === item}
                            onClick={() => {
                                setActiveItem(item);
                            }}
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
                setSectionCount = {setSectionCount}
                slidingMountType={slidingMountType}
                setSlidingMountType={setSlidingMountType}
                setSelectedType={setSelectedType}
            />
        </div>
    );
}

export default NavigationBar;

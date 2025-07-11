import { useState, useEffect } from 'react';

export const useDoorsLogic = () => {
  // Initial state declarations
  const [doorDimensions, setDoorDimensions] = useState({ height: 1900, width: 850 });
  const [sectionCount, setSectionCount] = useState(1);
  const [slidingMountType, setSlidingMountType] = useState("In wall");
  const [selectedCategory, setSelectedCategory] = useState("Swing Doors");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [sectionModels, setSectionModels] = useState([]);
  const [sectionColors, setSectionColors] = useState([]);
  const [selectedHandle, setSelectedHandle] = useState(() => Array(1).fill("HandleWithLock")); 
  const [sectionDimensions, setSectionDimensions] = useState([850]);
  const [sectionTypes, setSectionTypes] = useState(() => {
    const initialTypes = Array(sectionCount).fill("fixed");
    initialTypes[0] = "right";
    return initialTypes;
  });

  // Handle configuration validation
  const validateHandleConfiguration = (category, mountType, handles) => {
    if (category === "Sliding Doors" && mountType === "On wall" && handles.some(h => h !== null)) {
      console.warn("Sliding doors with On wall mounting should not have handles by default");
      return Array(handles.length).fill(null);
    }
    return handles;
  };

  // Category change effect - resets mount type for Sliding Doors
  useEffect(() => {
    if (selectedCategory === "Sliding Doors") {
      setSlidingMountType("In wall");
      setSectionCount(1);
      setSelectedType("1-Part Element");
      setSelectedHandle(Array(1).fill("PullHandle160"));
    }
  }, [selectedCategory]);

  // Mount type management effect
  useEffect(() => {
    if (selectedCategory === "Sliding Doors") {
      if (slidingMountType === "In wall") {
        setSectionCount(1);
        setSelectedType("1-Part Element");
        setSelectedHandle(Array(1).fill("PullHandle160"));
      } else if (slidingMountType === "On wall") {
        setSectionCount(2);
        setSelectedType("2-Part Element");
        setSelectedHandle(Array(2).fill(null));
      }
    }
  }, [slidingMountType, selectedCategory]);

  // Category and handle management effect
  useEffect(() => {
    const handlesByCategory = {
      "Swing Doors": "HandleWithLock",
      "Sliding Doors": "PullHandle160",
      "Fixed Walls": null
    };

    let newHandles;
    if (selectedCategory === "Sliding Doors") {
      if (slidingMountType === "On wall") {
        newHandles = Array(sectionCount).fill(null);
      } else {
        newHandles = Array(sectionCount).fill(handlesByCategory[selectedCategory]);
      }
    } else {
      newHandles = Array(sectionCount).fill(handlesByCategory[selectedCategory]);
    }

    setSelectedHandle(validateHandleConfiguration(selectedCategory, slidingMountType, newHandles));

    if (selectedCategory === "Fixed Walls") {
      setSectionTypes(Array(sectionCount).fill("fixed"));
    }
  }, [selectedCategory, sectionCount, slidingMountType]);

  // Section types management effect
  useEffect(() => {
    setSectionTypes(prevTypes => {
      const newTypes = Array(sectionCount).fill("fixed");
      
      if (selectedCategory !== "Fixed Walls") {
        if (selectedCategory === "Sliding Doors") {
          if (selectedType === "1-Part Element") {
            newTypes[0] = "right";
          }
          else if (selectedType === "2-Part Element") {
            newTypes[0] = "left";
            newTypes[1] = "right";
          }
        } else if (selectedType === "2-Part Element O" && sectionCount > 1) {
          newTypes.fill("fixed");
          newTypes[1] = "right";
        } 
        else if (selectedType === "4-Part Element O" && sectionCount > 2) {
          newTypes.fill("fixed");
          newTypes[2] = "right";
        }
        else if (selectedType.includes("Element A") && sectionCount > 1) {
          newTypes.fill("fixed");
          newTypes[1] = "right";
        }
        else {
          newTypes.fill("fixed");
          newTypes[0] = "right";
        }
      }

      return newTypes;
    });
  }, [sectionCount, selectedType, selectedCategory, slidingMountType]);

  // Dimensions and models management effect
  useEffect(() => {
    const count = Math.max(sectionCount, 1);
    setSectionModels(Array(count).fill("Aero"));
    setSectionColors(Array(count).fill("Clear"));

    const dimensions = {
      "2-Part Element O": [
        doorDimensions.height * 0.3,
        doorDimensions.height * 0.7
      ],
      "4-Part Element O": [
        doorDimensions.height * 0.3,
        doorDimensions.height * 0.7,
        doorDimensions.width * 0.5,
        doorDimensions.width * 0.5
      ]
    };

    function splitNatural(total, parts) {
      const base = Math.floor(total / parts);
      const remainder = total - base * parts;
      return Array(parts).fill(base).map((v, i) => i < remainder ? v + 1 : v);
    }

    setSectionDimensions(
      dimensions[selectedType] || 
      (/^\d+-Part Element A$/.test(selectedType) 
        ? [
            sectionDimensions[0] ?? Math.round(doorDimensions.height*0.3),
            ...splitNatural(doorDimensions.width, count - 1)
          ]
        : splitNatural(doorDimensions.width, count))
    );
  }, [sectionCount, selectedType, doorDimensions, selectedCategory]);

  return {
    doorDimensions,
    setDoorDimensions,
    sectionCount,
    setSectionCount,
    slidingMountType,
    setSlidingMountType,
    selectedCategory,
    setSelectedCategory,
    selectedIndex,
    setSelectedIndex,
    selectedType,
    setSelectedType,
    sectionModels,
    setSectionModels,
    sectionColors,
    setSectionColors,
    selectedHandle,
    setSelectedHandle,
    sectionDimensions,
    setSectionDimensions,
    sectionTypes,
    setSectionTypes
  };
};
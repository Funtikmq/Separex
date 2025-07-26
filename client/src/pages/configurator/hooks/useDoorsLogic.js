import { useState, useEffect } from "react";
import { useScaledDimensions } from "../constructor/hooks/useScaledDimensions";

export const useDoorsLogic = () => {
  const [doorDimensions, setDoorDimensions] = useState({
    height: 1900,
    width: 850,
  });
  const { height, width } = doorDimensions;
  const scaled = useScaledDimensions(height, width);
  const [sectionCount, setSectionCount] = useState(1);
  const [slidingMountType, setSlidingMountType] = useState("In wall");
  const [selectedCategory, setSelectedCategory] = useState("Swing Doors");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedType, setSelectedType] = useState("3-Part Element");
  const [sectionModels, setSectionModels] = useState([]);
  const [sectionColors, setSectionColors] = useState([]);
  const [selectedHandle, setSelectedHandle] = useState(() =>
    Array(1).fill("Handle With Lock")
  );
  const [sectionDimensions, setSectionDimensions] = useState([850]);
  const [sectionTypes, setSectionTypes] = useState(() => {
    const initialTypes = Array(sectionCount).fill("fixed");
    initialTypes[0] = "right";
    return initialTypes;
  });

  const validateHandleConfiguration = (category, mountType, handles) => {
    if (
      category === "Sliding Doors" &&
      mountType === "On wall" &&
      handles.some((h) => h !== null)
    ) {
      return Array(handles.length).fill(null);
    }
    return handles;
  };

  useEffect(() => {
    setSelectedType("1-Part Element");
    setSectionCount(1);
    if (selectedCategory === "Sliding Doors") {
      setSlidingMountType("In wall");
      setSelectedHandle(Array(1).fill("Pull Handle 160"));
    } else if (selectedCategory === "Swing Doors") {
      setSelectedHandle(Array(1).fill("Handle With Lock"));
    } else if (selectedCategory === "Fixed Walls") {
      setSelectedHandle(Array(1).fill(null));
    } else {
      setSelectedHandle(Array(1).fill(null));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory === "Sliding Doors") {
      if (slidingMountType === "In wall") {
        setSectionCount(1);
        setSelectedType("1-Part Element");
        setSelectedHandle(Array(1).fill("Pull Handle 160"));
      } else if (slidingMountType === "On wall") {
        setSectionCount(2);
        setSelectedType("2-Part Element");
        setSelectedHandle(Array(2).fill(null));
      }
    }
  }, [slidingMountType, selectedCategory]);

  useEffect(() => {
    setSelectedHandle((prevHandles) => {
      if (!prevHandles || prevHandles.length === 0) return prevHandles;

      const newHandles = prevHandles.map((handle, idx) => {
        return sectionTypes[idx] === "fixed" ? null : handle;
      });

      const isChanged = newHandles.some((h, i) => h !== prevHandles[i]);
      return isChanged ? newHandles : prevHandles;
    });
  }, [sectionTypes]);

  useEffect(() => {
    const handlesByCategory = {
      "Swing Doors": "Handle With Lock",
      "Sliding Doors": "Pull Handle 160",
      "Fixed Walls": null,
    };

    const getHandlesByType = (type, count, handle) => {
      const handles = Array(count).fill(null);

      if (type && /^\d+-Part Element$/.test(type)) {
        handles[0] = handle;
        if (selectedCategory === "Sliding Doors") {
          if (selectedType === "2-Part Element") {
            handles[0] = handle;
            handles[1] = handle;
          } else {
            handles[0] = handle;
          }
        }
      } else if (type === "2-Part Element O" && count > 1) {
        handles[1] = handle;
      } else if (type === "4-Part Element O" && count > 2) {
        handles[2] = handle;
      } else if (type && /^\d+-Part Element A$/.test(type) && count > 1) {
        handles[1] = handle;
      }

      return handles;
    };

    let newHandles;

    if (selectedCategory === "Fixed Walls") {
      newHandles = Array(sectionCount).fill(null);
    } else {
      const defaultHandle = handlesByCategory[selectedCategory];
      newHandles = getHandlesByType(selectedType, sectionCount, defaultHandle);
    }

    setSelectedHandle(
      validateHandleConfiguration(
        selectedCategory,
        slidingMountType,
        newHandles
      )
    );

    if (selectedCategory === "Fixed Walls") {
      setSectionTypes(Array(sectionCount).fill("fixed"));
    }
  }, [selectedCategory, sectionCount, slidingMountType, selectedType]);

  useEffect(() => {
    setSectionTypes((prevTypes) => {
      const newTypes = Array(sectionCount).fill("fixed");

      if (selectedCategory !== "Fixed Walls") {
        if (selectedCategory === "Sliding Doors") {
          if (selectedType === "1-Part Element") {
            newTypes[0] = "right";
          } else if (selectedType === "2-Part Element") {
            newTypes[0] = "left";
            newTypes[1] = "right";
          }
        } else if (selectedType === "2-Part Element O" && sectionCount > 1) {
          newTypes.fill("fixed");
          newTypes[1] = "right";
        } else if (selectedType === "4-Part Element O" && sectionCount > 2) {
          newTypes.fill("fixed");
          newTypes[2] = "right";
        } else if (
          selectedType &&
          selectedType.includes("Element A") &&
          sectionCount > 1
        ) {
          newTypes.fill("fixed");
          newTypes[1] = "right";
        } else {
          newTypes.fill("fixed");
          newTypes[0] = "right";
        }
      }

      return newTypes;
    });
  }, [sectionCount, selectedType, selectedCategory, slidingMountType]);

  useEffect(() => {
    const count = Math.max(sectionCount, 1);

    const dimensions = {
      "2-Part Element O": [
        doorDimensions.height * 0.3,
        doorDimensions.height * 0.7,
      ],
      "4-Part Element O": [
        doorDimensions.height * 0.3,
        doorDimensions.height * 0.7,
        doorDimensions.width * 0.5,
        doorDimensions.width * 0.5,
      ],
    };

    function splitNatural(total, parts) {
      const base = Math.floor(total / parts);
      const remainder = total - base * parts;
      return Array(parts)
        .fill(base)
        .map((v, i) => (i < remainder ? v + 1 : v));
    }

    setSectionDimensions(
      selectedType && dimensions[selectedType]
        ? dimensions[selectedType]
        : selectedType && /^\d+-Part Element A$/.test(selectedType)
        ? [
            sectionDimensions[0] ?? Math.round(doorDimensions.height * 0.3),
            ...splitNatural(doorDimensions.width, count - 1),
          ]
        : splitNatural(doorDimensions.width, count)
    );
  }, [sectionCount, selectedType, doorDimensions, selectedCategory]);

  return {
    doorDimensions,
    setDoorDimensions,
    scaled,
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
    setSectionTypes,
  };
};

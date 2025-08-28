import { useState, useEffect } from "react";
import { useScaledDimensions } from "../constructor/hooks/useScaledDimensions";

export const useDoorsLogic = () => {
  const [doorDimensions, setDoorDimensions] = useState({
    height: 2000,
    width: 1000,
  });
  const { height, width } = doorDimensions;
  const scaled = useScaledDimensions(height, width);
  const [sectionCount, setSectionCount] = useState(1);
  const [slidingMountType, setSlidingMountType] = useState("On wall");
  const [slidingType, setSlidingType] = useState("classic");
  const [selectedCategory, setSelectedCategory] = useState("Swing Doors");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedType, setSelectedType] = useState("3-Part Element");
  const [sectionModels, setSectionModels] = useState(Array(1).fill("Aero"));
  const [sectionColors, setSectionColors] = useState(Array(1).fill("Clear"));
  const [profileColor, setProfileColor] = useState("#333");
  const [selectedHandle, setSelectedHandle] = useState(() =>
    Array(1).fill("Handle With Lock")
  );
  const [sectionDimensions, setSectionDimensions] = useState([850]);
  const [sectionTypes, setSectionTypes] = useState(() => {
    const initialTypes = Array(sectionCount).fill("fixed");
    initialTypes[0] = "right";
    return initialTypes;
  });
  const [linePositions, setLinePositions] = useState({});

  // Funcție pentru a obține pozițiile pentru o secțiune specifică
  const getLinePositionsForSection = (sectionIndex) => {
    return linePositions[sectionIndex] || {};
  };

  // Funcție pentru a seta pozițiile pentru o secțiune specifică
  const setLinePositionsForSection = (sectionIndex, newPositions) => {
    setLinePositions((prev) => ({
      ...prev,
      [sectionIndex]: {
        ...prev[sectionIndex],
        ...newPositions,
      },
    }));
  };

  const [previousSectionModels, setPreviousSectionModels] = useState([]);

  useEffect(() => {
    if (previousSectionModels.length > 0) {
      setLinePositions((prev) => {
        const newLinePositions = { ...prev };

        sectionModels.forEach((currentModel, index) => {
          const previousModel = previousSectionModels[index];

          if (previousModel && previousModel !== currentModel) {
            // Modelul s-a schimbat pentru această secțiune, resetăm pozițiile
            newLinePositions[index] = {};
          }
        });

        return newLinePositions;
      });
    }

    // Actualizăm modelul anterior
    setPreviousSectionModels(sectionModels);
  }, [sectionModels]);

  const validateHandleConfiguration = (category, mountType, handles) => {
    if (
      category === "Sliding Doors" &&
      mountType === "In wall" &&
      handles.some((h) => h !== null)
    ) {
      return Array(handles.length).fill(null);
    }
    return handles;
  };

  useEffect(() => {
    setDoorDimensions((prev) => ({
      ...prev,
      height: selectedCategory === "Sliding Doors" ? 2500 : 2000,
    }));
  }, [selectedCategory]);

  useEffect(() => {
    setSectionModels(Array(sectionCount).fill("Aero"));
    setSectionColors(Array(sectionCount).fill("Clear"));
    setSelectedIndex(0);
  }, [sectionCount]);

  useEffect(() => {
    setSelectedType("1-Part Element");
    setSectionCount(1);
    if (selectedCategory === "Sliding Doors") {
      setSlidingMountType("On wall");
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
      if (slidingMountType === "On wall") {
        setSectionCount(1);
        setSelectedType("1-Part Element");
        setSelectedHandle(Array(1).fill("Pull Handle 160"));
      } else if (slidingMountType === "In wall") {
        setSectionCount(2);
        setSelectedType("2-Part Element");
        setSelectedHandle(Array(2).fill(null));
        setSectionTypes(Array(2).fill("fixed"));
      }
    }
  }, [slidingMountType, selectedCategory]);

  useEffect(() => {
    setSelectedHandle(() => {
      const defaultHandle =
        selectedCategory === "Swing Doors"
          ? "Handle With Lock"
          : selectedCategory === "Sliding Doors"
          ? "Pull Handle 160"
          : null;

      // Logica speciala doar pentru cascade + In wall
      if (
        selectedCategory === "Sliding Doors" &&
        slidingType === "cascade" &&
        slidingMountType === "In wall"
      ) {
        const handles = Array(sectionCount).fill(null);
        if (sectionTypes[0] === "mobile") {
          handles[0] = defaultHandle;
        } else {
          handles[sectionCount - 1] = defaultHandle;
        }
        return handles;
      }

      // Default: fiecare sectiune mobila are maner
      return sectionTypes.map((type) =>
        type === "fixed" ? null : defaultHandle
      );
    });
  }, [
    sectionTypes,
    selectedCategory,
    slidingType,
    slidingMountType,
    sectionCount,
  ]);

  useEffect(() => {
    if (selectedCategory === "Sliding Doors") {
      if (slidingMountType === "On wall") {
        setSelectedType("1-Part Element");
      } else if (slidingMountType === "In wall") {
        if (slidingType === "classic") {
          setSelectedType("3-Part Element");
          setSectionCount(3);
        } else if (slidingType === "cascade") {
          setSelectedType("2-Part Element");
          setSectionCount(2);
        }
      }
    }
  }, [slidingType, selectedCategory, slidingMountType]);

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
    setSectionTypes(() => {
      const newTypes = Array(sectionCount);

      if (selectedCategory === "Fixed Walls") {
        // Toate secțiunile sunt fixed
        return newTypes.fill("fixed");
      }

      if (selectedCategory === "Sliding Doors") {
        if (slidingMountType === "On wall") {
          return newTypes.fill("mobile");
        } else if (slidingMountType === "In wall") {
          if (slidingType === "classic") {
            newTypes.fill("fixed");
            newTypes[0] = "mobile";
            return newTypes;
          } else if (slidingType === "cascade") {
            newTypes.fill("mobile");
            newTypes[sectionCount - 1] = "fixed";
            return newTypes;
          }
        }
      }

      if (selectedCategory === "Swing Doors") {
        if (selectedType === "1-Part Element") {
          newTypes[0] = "right";
        } else if (selectedType === "2-Part Element" && sectionCount === 2) {
          newTypes[0] = "left";
          newTypes[1] = "right";
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
        return newTypes;
      }

      // Default: toate fixed
      return newTypes.fill("fixed");
    });
  }, [sectionCount, selectedType, selectedCategory, slidingMountType]);

  useEffect(() => {
    const count = Math.max(sectionCount, 1);
    const h = doorDimensions.height;
    const w = doorDimensions.width;

    const dimensions = {
      "2-Part Element O": [h * 0.2, h * 0.8],
      "4-Part Element O": [h * 0.2, h * 0.8, w * 0.5, w * 0.5],
    };

    function splitNatural(total, parts) {
      const base = Math.floor(total / parts);
      const remainder = total - base * parts;
      return Array(parts)
        .fill(base)
        .map((v, i) => (i < remainder ? v + 1 : v));
    }

    // Verifică dacă este tipul "N-Part Element A" cu N între 3 și 8
    const match = selectedType?.match(/^(\d+)-Part Element A$/);
    if (match) {
      const partCount = parseInt(match[1], 10);
      if (partCount >= 3 && partCount <= 8 && count >= 2) {
        const topHeight = Math.round(h * 0.2);
        const bottomTotal = h - topHeight;
        const bottomHeights = splitNatural(bottomTotal, count - 1);
        setSectionDimensions([topHeight, ...bottomHeights]);
        return;
      }
    }

    setSectionDimensions(
      selectedType && dimensions[selectedType]
        ? dimensions[selectedType]
        : splitNatural(w, count)
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
    slidingType,
    setSlidingType,
    selectedCategory,
    setSelectedCategory,
    selectedIndex,
    setSelectedIndex,
    selectedType,
    setSelectedType,
    sectionModels,
    setSectionModels,
    sectionColors,
    profileColor,
    setProfileColor,
    setSectionColors,
    selectedHandle,
    setSelectedHandle,
    sectionDimensions,
    setSectionDimensions,
    sectionTypes,
    setSectionTypes,
    linePositions,
    setLinePositions,
    getLinePositionsForSection,
    setLinePositionsForSection,
  };
};

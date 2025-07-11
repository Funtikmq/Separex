import Header from "./Header.jsx"
import Constructor from "./constructor/Constructor.jsx";
import NavigationBar from "./navigation/NavigationBar.jsx"
import { useState, useEffect, useRef } from 'react';

function App() {
  const [doorDimensions, setDoorDimensions] = useState({ height: 1900, width: 850 });
  const [sectionCount, setSectionCount] = useState(1);
  const [slidingMountType, setSlidingMountType] = useState("In wall");
  const [selectedCategory, setSelectedCategory] = useState("Fixed Wall");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [sectionModels, setSectionModels] = useState([]);
  const [sectionColors, setSectionColors] = useState([]);
  const [selectedHandle, setSelectedHandle] = useState([]); 
  const [sectionDimensions, setSectionDimensions] = useState([850]);
  const [sectionTypes, setSectionTypes] = useState(() => Array(sectionCount).fill("fixed"));

  const doorFrameRef = useRef(null);

  // Primul useEffect pentru sectionTypes
  useEffect(() => {
    setSectionTypes(Array(sectionCount).fill("fixed"));
  }, [sectionCount, selectedType, selectedCategory]);

  
  useEffect(() => {
    const count = Math.max(sectionCount, 1);
    setSectionModels(Array(count).fill("Aero"));
    setSectionColors(Array(count).fill("Clear"));
    setSelectedHandle(Array(count).fill("")); 

    const dimensions = {
      "2-Part Element O": [
        doorDimensions.height / 2,
        doorDimensions.height / 2
      ],
      "4-Part Element O": [
        doorDimensions.height / 2,
        doorDimensions.height / 2,
        doorDimensions.width / 2,
        doorDimensions.width / 2
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
            sectionDimensions[0] ?? Math.round(doorDimensions.height/2),
            ...splitNatural(doorDimensions.width, count - 1)
          ]
        : splitNatural(doorDimensions.width, count))
    );
    
  }, [sectionCount, selectedType, doorDimensions, selectedCategory]);

  return (
    <>
      <Header/>
      <main className="mainLayout">
        <NavigationBar 
          doorDimensions={doorDimensions} 
          setDoorDimensions={setDoorDimensions}
          setSectionCount={setSectionCount}
          sectionCount={sectionCount}
          slidingMountType={slidingMountType}
          setSlidingMountType={setSlidingMountType}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedIndex={selectedIndex}
          setSelectedType={setSelectedType}
          selectedType={selectedType}
          setSectionModels={setSectionModels}
          sectionModels={sectionModels}
          setSectionColors={setSectionColors}
          sectionColors={sectionColors}
          selectedHandle={selectedHandle}
          setSelectedHandle={setSelectedHandle}
          doorFrameRef={doorFrameRef}
          sectionDimensions={sectionDimensions}
          setSectionDimensions={setSectionDimensions}
          sectionTypes={sectionTypes}
        />

        <Constructor 
          doorDimensions={doorDimensions} 
          sectionCount={sectionCount}
          selectedCategory={selectedCategory}
          slidingMountType={slidingMountType}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          selectedType={selectedType}
          sectionModels={sectionModels}
          sectionColors={sectionColors}
          sectionDimensions={sectionDimensions}
          setSectionDimensions={setSectionDimensions}
          selectedHandle={selectedHandle}
          doorFrameRef={doorFrameRef}
          sectionTypes={sectionTypes}
          setSectionTypes={setSectionTypes}
        />
      </main>
    </>
  );
}

export default App;
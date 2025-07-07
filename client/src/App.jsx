import Header from "./Header.jsx"
import Constructor from "./constructor/Constructor.jsx";
import NavigationBar from "./navigation/NavigationBar.jsx"
import { useState,useEffect,useRef} from 'react';



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

  // Reset sectionTypes to all "fixed" when sectionCount, selectedType, or selectedCategory changes
  useEffect(() => {
    setSectionTypes(Array(sectionCount).fill("fixed"));
  }, [sectionCount, selectedType, selectedCategory]);

  useEffect(() => {
    const count = Math.max(sectionCount, 1);
    setSectionModels(Array(count).fill("Aero"));
    setSectionColors(Array(count).fill("Clear"));
    setSelectedHandle(Array(count).fill(""));
    if (selectedType === "2-Part Element O") {
      setSectionDimensions(Array(count).fill(doorDimensions.height / count));
    }
    else if(selectedType === "4-Part Element O") {
      setSectionDimensions([doorDimensions.height / 2, doorDimensions.height / 2]);
    }
    else if (/^\d+-Part Element A$/.test(selectedType)) {
      setSectionDimensions(prev => {
      const firstElement = prev[0] ?? height / 2;
      const restElements = Array(count - 1).fill(doorDimensions.width / (count - 1));
      return [firstElement, ...restElements];
    });
    }
    else {
      setSectionDimensions(Array(count).fill(doorDimensions.width/count));
    }
  }, [sectionCount]);

  return (
  <>
  <Header/>
  <main className="mainLayout">
    <NavigationBar doorDimensions={doorDimensions} 
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
                    />

    <Constructor doorDimensions={doorDimensions} 
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

export default App

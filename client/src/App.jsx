import Header from "./Header.jsx"
import Constructor from "./constructor/Constructor.jsx";
import NavigationBar from "./navigation/NavigationBar.jsx"
import { useState,useEffect,useRef} from 'react';



function App() {

  const [doorDimensions,setDoorDimensions] = useState({ height: "1800" , width: "850"}); 
  const [sectionCount,setSectionCount] = useState(1);
  const [slidingMountType, setSlidingMountType] = useState("In wall");
  const [selectedCategory, setSelectedCategory] = useState("Fixed Wall");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [sectionModels,setSectionModels] = useState([]);
  const [sectionColors,setSectionColors] = useState([]);
  const [selectedHandle,setSelectedHandle] = useState([]);
  const [sectionDimensions, setSectionDimensions] = useState([100]);

  const doorFrameRef = useRef(null)

  const getOrientation = () => {
    if (selectedType === "2-Part Element O" || selectedType === "4-Part Element O") {
      return "vertical";
    }
    if (/^\d+-Part Element A$/.test(selectedType)) {
      return "horizontal";
    }
    return "vertical";
  };
  const orientation = getOrientation();

  useEffect(() => {
    const count = Math.max(sectionCount, 1);
    setSectionModels(Array(count).fill("Aero"));
    setSectionColors(Array(count).fill("Clear"));
    setSelectedHandle(Array(count).fill(""));
    setSectionDimensions(Array(count).fill(50));
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
                    setSectionModels={setSectionModels}
                    sectionModels={sectionModels}
                    setSectionColors={setSectionColors}
                    sectionColors={sectionColors}
                    selectedHandle={selectedHandle}
                    setSelectedHandle={setSelectedHandle}
                    doorFrameRef={doorFrameRef}
                    sectionDimensions={sectionDimensions}
                    setSectionDimensions={setSectionDimensions}
                    orientation={orientation}
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
                 selectedHandle={selectedHandle}
                 doorFrameRef={doorFrameRef}
                 />
  </main>
  </>
  );
  
}

export default App

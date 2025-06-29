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

  const doorFrameRef = useRef(null)

  useEffect(() => {
  setSectionModels(Array(sectionCount).fill("Aero"));
}, [sectionCount]);

  useEffect(() => {
  setSectionColors(Array(sectionCount).fill("Clear"));
}, [sectionCount]);
  
  useEffect(() => {
  setSelectedHandle(Array(sectionCount).fill(""));
}, [sectionCount]);

  return (
  <>
  <Header/>
  <main className="mainLayout">
    <NavigationBar doorDimensions={doorDimensions} 
                    setDoorDimensions={setDoorDimensions}
                    setSectionCount={setSectionCount}
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
                 selectedHandle={selectedHandle}
                 doorFrameRef={doorFrameRef}
                 />
  </main>
  </>
  );
  
}

export default App

import Header from "./Header.jsx"
import Constructor from "./constructor/Constructor.jsx";
import NavigationBar from "./navigation/NavigationBar.jsx"
import { useState} from 'react';


function App() {

  const [doorDimensions,setDoorDimensions] = useState({ height: "1800" , width: "1000"}); 
  const [sectionCount,setSectionCount] = useState(1);
  const [slidingMountType, setSlidingMountType] = useState("On wall");
  const [selectedCategory, setSelectedCategory] = useState("Fixed Wall");
  const [selectedType, setSelectedType] = useState("");
  
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
                    setSelectedType={setSelectedType}
                    />

    <Constructor doorDimensions={doorDimensions} 
                 sectionCount={sectionCount}
                 selectedCategory={selectedCategory}
                 slidingMountType={slidingMountType}
                 selectedType={selectedType}
                 />
  </main>
  </>
  );
  
}

export default App

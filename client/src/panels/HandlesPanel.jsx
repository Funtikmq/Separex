import Card from "./Card.jsx";
import {HANDLES} from "../constants/constants.js"

function HandlePanel({
  selectedCategory, 
  selectedHandle, 
  setSelectedHandle, 
  selectedIndex,
  sectionTypes 
}) {
  const handleSelectHandle = (handle) => {
    if (selectedIndex === null) return;
    
    // Don't allow handle selection for fixed sections
    if (sectionTypes[selectedIndex] === 'fixed') {
      return;
    }

    const newHandles = [...(selectedHandle || [])];
    newHandles[selectedIndex] = handle;
    setSelectedHandle(newHandles);
  };

  // Don't show handles panel for fixed sections
  if (sectionTypes[selectedIndex] === 'fixed') {
    return (
      <div className="navigationPanel">
        <div>
          <h2>
            No handles for fixed
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="navigationPanel">
      <ul className="navigationPanelList">
        {(HANDLES[selectedCategory] || []).map((handle, index) => (
          <li className="panelItem" key={index}>
            <Card 
              title={handle} 
              onClick={() => handleSelectHandle(handle)}
              isSelected={selectedHandle?.[selectedIndex] === handle}
              disabled={sectionTypes[selectedIndex] === 'fixed'}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HandlePanel;
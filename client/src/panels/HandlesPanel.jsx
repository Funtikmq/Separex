import Card from "./Card.jsx";
import {HANDLES} from "../constants/constants.js"

function HandlePanel({selectedCategory, selectedHandle, setSelectedHandle, selectedIndex}) {
  const handleSelectHandle = (handle) => {
    if (selectedIndex === null) return;
    const newHandles = [...selectedHandle];
    newHandles[selectedIndex] = handle;
    setSelectedHandle(newHandles);
  };

  return (
    <div className="navigationPanel">
      <ul className="navigationPanelList">
        {(HANDLES[selectedCategory] || []).map((handle, index) => (
          <li className="panelItem" key={index}>
            <Card 
              title={handle} 
              onClick={() => handleSelectHandle(handle)}
              isSelected={selectedHandle[selectedIndex] === handle}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HandlePanel;
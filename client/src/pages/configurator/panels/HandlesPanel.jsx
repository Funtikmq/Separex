import Card from "./Card.jsx";
import { HANDLES } from "../constants/constants.js";
import { ICON_HANDLES } from "./utils/panelImages.js";

function HandlePanel({
  selectedCategory,
  selectedHandle,
  setSelectedHandle,
  selectedIndex,
  sectionTypes,
  activeItem,
}) {
  const handleSelectHandle = (handle) => {
    if (selectedIndex === null) return;

    const newHandles = [...(selectedHandle || [])];
    newHandles[selectedIndex] = handle;
    setSelectedHandle(newHandles);
  };

  if (selectedCategory === "Fixed Wall") {
    return (
      <div className="navigationPanel">
        <div className="navigationPanelNoItem">
          <h2 className="handlePanelText">No Handles for Fixed Walls</h2>
          <h2 className="handlePanelText">Change the Category</h2>
        </div>
      </div>
    );
  }

  // Fixed Sections
  if (sectionTypes[selectedIndex] === "fixed") {
    return (
      <div className="navigationPanel">
        <div className="navigationPanelNoItem">
          <h2 className="handlePanelText">No Handles for Fixed Sections</h2>
          <h2 className="handlePanelText">
            Select Opening Direction for the Section
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="navigationPanel">
      <ul className="navigationPanelList">
        {(HANDLES[selectedCategory] || []).map((handle, index) => {
          const image = ICON_HANDLES[handle];
          return (
            <li className="panelItem" key={index}>
              <Card
                title={handle}
                image={image}
                activeItem={activeItem}
                onClick={() => handleSelectHandle(handle)}
                isSelected={selectedHandle?.[selectedIndex] === handle}
                disabled={sectionTypes[selectedIndex] === "fixed"}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HandlePanel;

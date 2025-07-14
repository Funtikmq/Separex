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

    // Don't allow handle selection for fixed sections
    if (sectionTypes[selectedIndex] === "fixed") {
      return;
    }

    const newHandles = [...(selectedHandle || [])];
    newHandles[selectedIndex] = handle;
    setSelectedHandle(newHandles);
  };

  // Don't show handles panel for fixed sections
  if (sectionTypes[selectedIndex] === "fixed") {
    return (
      <div className="navigationPanel">
        <div>
          <h2>Select the Direction</h2>
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

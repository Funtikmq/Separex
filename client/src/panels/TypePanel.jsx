import Card from "./Card.jsx";
import { TYPES } from "../constants/constants.js";

function TypePanel({
  selectedCategory,
  slidingMountType,
  setSlidingMountType,
  setSectionCount,
  setSelectedType
}) {

  let filteredTypes = TYPES[selectedCategory] || [];

  if (selectedCategory === "Sliding Doors" && slidingMountType === "In wall") {
    filteredTypes = filteredTypes.filter(
      (type) => type.startsWith("1-Part") || type.startsWith("2-Part")
    );
  }
  else if (selectedCategory === "Sliding Doors" && slidingMountType === "On wall") {
    filteredTypes = filteredTypes.filter(
  (type) => 
    type.startsWith("2-Part") || 
    type.startsWith("3-Part") || 
    type.startsWith("4-Part")
);
  }

  return (
    <div className="navigationPanel">
      {selectedCategory === "Sliding Doors" && (
        <div className="mountTypeToggle">
          <button
            className="toggleButton"
            onClick={() =>
              setSlidingMountType((prev) =>
                prev === "In wall" ? "On wall" : "In wall"
              )
            }
          >
            {slidingMountType}
          </button>
        </div>
      )}
      <ul className="navigationPanelList">
        {filteredTypes.map((type, index) => {
          const match = type.match(/^(\d+)-Part/);
          const parts = match ? parseInt(match[1], 10) : 1;
          return (
            <li
              className="panelItem"
              key={index}
            >
              <Card title={type} onClick={() => {
                setSectionCount(parts);
                setSelectedType(type);
              }}/>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TypePanel;

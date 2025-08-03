import Card from "./Card.jsx";
import { TYPES } from "../constants/constants.js";
import { ICON_TYPES } from "./utils/panelImages.js";

const toKey = (str) => str.toUpperCase();

function TypePanel({
  selectedCategory,
  slidingMountType,
  setSlidingMountType,
  setSectionCount,
  setSelectedType,
  activeItem,
}) {
  let filteredTypes = TYPES[selectedCategory] || [];

  if (selectedCategory === "Sliding Doors" && slidingMountType === "On wall") {
    filteredTypes = filteredTypes.filter(
      (type) => type.startsWith("1-Part") || type.startsWith("2-Part")
    );
  } else if (
    selectedCategory === "Sliding Doors" &&
    slidingMountType === "In wall"
  ) {
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
                prev === "On wall" ? "In wall" : "On wall"
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

          let typeKey = toKey(type);

          if (
            selectedCategory === "Sliding Doors" &&
            toKey(type) === "2-PART ELEMENT"
          ) {
            typeKey =
              slidingMountType === "In wall" //
                ? "2-PART ELEMENT IN"
                : "2-PART ELEMENT ON";
          }

          const image = ICON_TYPES[selectedCategory]?.[typeKey];

          return (
            <li className="panelItem" key={index}>
              <Card
                title={type}
                image={image}
                activeItem={activeItem}
                onClick={() => {
                  setSectionCount(parts);
                  setSelectedType(type);
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TypePanel;

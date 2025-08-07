import Card from "./Card.jsx";
import { TYPES } from "../constants/constants.js";
import { ICON_TYPES } from "./utils/panelImages.js";

const toKey = (str) => str.toUpperCase();

function TypePanel({
  selectedCategory,
  slidingMountType,
  setSlidingMountType,
  slidingType,
  setSlidingType,
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
    if (slidingType === "classic") {
      filteredTypes = filteredTypes.filter(
        (type) => type.startsWith("3-Part") || type.startsWith("4-Part")
      );
    } else {
      filteredTypes = filteredTypes.filter(
        (type) =>
          type.startsWith("2-Part") ||
          type.startsWith("3-Part") ||
          type.startsWith("4-Part")
      );
    }
  }

  return (
    <div className="navigationPanel">
      {selectedCategory === "Sliding Doors" && (
        <div className="navigationPanelSelector">
          <p className="navigationPanelText">Mounting Type</p>
          <div>
            <button onClick={() => setSlidingMountType("On wall")}>
              On Wall
            </button>
            <button
              onClick={() => {
                setSlidingMountType("In wall"), setSlidingType("classic");
              }}
            >
              Clasic
            </button>
            <button
              onClick={() => {
                setSlidingMountType("In wall"), setSlidingType("cascade");
              }}
            >
              Cascade
            </button>
          </div>
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

import Card from "./Card.jsx";
import { COLORS } from "../constants/constants.js";
import { ICON_COLORS } from "./utils/panelImages.js";

function ColorPanel({ sectionColors, setSectionColors, selectedIndex }) {
  const handleSelectedColor = (color) => {
    if (selectedIndex === null) return;
    const newColors = [...sectionColors];
    newColors[selectedIndex] = color;
    setSectionColors(newColors);
  };

  return (
    <div className="navigationPanel">
      <ul className="navigationPanelList">
        {COLORS.map((color, index) => {
          const image = ICON_COLORS[color];
          return (
            <li className="panelItem" key={index}>
              <Card
                title={color}
                image={image}
                onClick={() => handleSelectedColor(color)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ColorPanel;

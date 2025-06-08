import Card from "./Card.jsx";
import {COLORS} from "../constants/constants.js"


function ColorPanel() {
  return (
    <div className="navigationPanel">
      <ul className="navigationPanelList">
        {COLORS.map((color, index) => (
          <li className="panelItem" key={index}>
            <Card title={color} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ColorPanel;
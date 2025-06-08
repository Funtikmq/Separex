import Card from "./Card.jsx";
import {HANDLES} from "../constants/constants.js"

function HandlePanel({selectedCategory}) {
  return (
    <div className="navigationPanel">
      <ul className="navigationPanelList">
        {(HANDLES[selectedCategory] || []).map((handle, index) => (
          <li className="panelItem" key={index}>
            <Card title={handle} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HandlePanel;
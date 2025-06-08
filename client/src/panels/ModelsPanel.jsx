import Card from "./Card.jsx";
import {MODELS} from "../constants/constants.js"

function ModelPanel() {
  return (
    <div className="navigationPanel">
      <ul className="navigationPanelList">
        {MODELS.map((model, index) => (
          <li className="panelItem" key={index}>
            <Card title={model} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModelPanel;
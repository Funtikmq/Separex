import Card from "./Card.jsx";
import {MODELS} from "../constants/constants.js"

function ModelPanel({setSectionModels,sectionModels,selectedIndex}) {

const handleSelectModel = (model) => {
  if (selectedIndex === null) return;
  const newModels = [...sectionModels];
  newModels[selectedIndex] = model;
  setSectionModels(newModels);
};

  return (
    <div className="navigationPanel">
      <ul className="navigationPanelList">
        {MODELS.map((model, index) => (
          <li className="panelItem" key={index}>
            <Card title={model} 
            onClick={() => handleSelectModel(model)}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModelPanel;
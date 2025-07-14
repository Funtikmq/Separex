import Card from "./Card.jsx";
import { MODELS } from "../constants/constants.js";
import { ICON_MODELS } from "./utils/panelImages.js";

function ModelPanel({
  setSectionModels,
  sectionModels,
  selectedIndex,
  activeItem,
}) {
  const handleSelectModel = (model) => {
    if (selectedIndex === null) return;
    const newModels = [...sectionModels];
    newModels[selectedIndex] = model;
    setSectionModels(newModels);
  };

  return (
    <div className="navigationPanel">
      <ul className="navigationPanelList">
        {MODELS.map((model, index) => {
          const image = ICON_MODELS[model];
          return (
            <li className="panelItem" key={index}>
              <Card
                title={model}
                image={image}
                activeItem={activeItem}
                onClick={() => handleSelectModel(model)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ModelPanel;

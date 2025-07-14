import { ICON_CATEGORYS } from "./utils/panelImages.js";
import Card from "./Card.jsx";

const categoryList = Object.keys(ICON_CATEGORYS);

function CategoryPanel({ setSelectedCategory, activeItem }) {
  return (
    <div className="navigationPanel">
      <ul className="navigationPanelList">
        {categoryList.map((category) => (
          <li
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="panelItem"
          >
            <Card
              title={category}
              image={ICON_CATEGORYS[category]}
              activeItem={activeItem}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryPanel;

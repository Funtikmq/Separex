import Card from "./Card.jsx"
import SlidingDoors from '../assets/navPanels/slidingDoor.png';
import FixedWalls from '../assets/navPanels/fixedWall.png';

function CategoryPanel ({setSelectedCategory}){

    const categoryImg = [SlidingDoors,FixedWalls]

    return(
        <div className="navigationPanel">
            <ul className="navigationPanelList">
                {["Swing Doors","Sliding Doors","Fixed Wall"].map((index) =>(
                    <li key={index} onClick={() => setSelectedCategory(index)} className="panelItem">
                        <Card title={index} img={categoryImg[index]}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryPanel;

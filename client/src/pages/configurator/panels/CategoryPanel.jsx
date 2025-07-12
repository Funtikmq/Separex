import Card from "./Card.jsx"

function CategoryPanel ({setSelectedCategory}){


    return(
        <div className="navigationPanel">
            <ul className="navigationPanelList">
                {["Swing Doors","Sliding Doors","Fixed Wall"].map((index) =>(
                    <li key={index} onClick={() => setSelectedCategory(index)} className="panelItem">
                        <Card title={index}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryPanel;

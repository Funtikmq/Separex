function Card({title}) {
    return (
        <div className="Card">
            <img className="cardImage" src="https://placehold.co/150x150" alt="" />
            <h2 className="cardTitle">{title}</h2>
        </div>
    );
}

export default Card;
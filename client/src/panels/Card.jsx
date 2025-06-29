function Card({title, onClick,img}) {
    return (
        <div className="Card" onClick={onClick}>
            <img className="cardImage" src={img}/>
            <h2 className="cardTitle">{title}</h2>
        </div>
    );
}

export default Card;
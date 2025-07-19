function Card({ title, image, onClick, disabled, isSelected }) {
  return (
    <div
      className="cardContainer"
      onClick={disabled ? null : onClick}
      title={disabled ? "Not available for fixed sections" : title}
    >
      <div
        className={`card ${disabled ? "disabled" : ""} ${
          isSelected ? "selected" : ""
        }`}
      >
        <img src={image} alt={title} className="cardImage" />
      </div>
      <div className="cardComponents">
        <h2 className={`cardTitle ${disabled ? "text-disabled" : ""}`}>
          {title}
        </h2>
      </div>
    </div>
  );
}

export default Card;

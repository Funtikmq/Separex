function Card({ title, image, onClick, disabled, isSelected }) {
  return (
    <div
      className="CardContainer"
      onClick={disabled ? null : onClick}
      title={disabled ? "Not available for fixed sections" : title}
    >
      <div className={`Card ${disabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}>
        <img src={image} alt={title} className="cardImage" />
      </div>
      <h2 className={`cardTitle ${disabled ? 'text-disabled' : ''}`}>
        {title}
      </h2>
    </div>
  );
}

export default Card;
function Card({title, onClick,disabled, isSelected}) {
    return (
        <div 
            className={`Card ${disabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`} 
            onClick={disabled ? null : onClick}
            title={disabled ? "Not available for fixed sections" : title}
        >
            <h2 className={`cardTitle ${disabled ? 'text-disabled' : ''}`}>
                {title}
            </h2>
        </div>
    );
}

export default Card;
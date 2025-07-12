const InputWithButtons = ({ 
  value, 
  onChange, 
  onBlur, 
  onStep,
  placeholder = "",
  readOnly = false, 
  disabled = false 
}) => {
  return (
    <div className="inputWithButtons">
      {onStep && (
        <button 
          type="button" 
          onClick={() => onStep("down")}
          disabled={disabled}
        >
          −
        </button>
      )}
      
      <input
        type="number"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onBlur?.();
          }
        }}
        readOnly={readOnly}
        disabled={disabled}
      />

      {onStep && (
        <button 
          type="button" 
          onClick={() => onStep("up")}
          disabled={disabled}
        >
          +
        </button>
      )}
    </div>
  );
};

export default InputWithButtons;
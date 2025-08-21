import React from "react";

const DraggableLine = ({
  id,
  position,
  orientation = "vertical",
  onPositionChange,
  scaled, // proprietățile de scalare
  constraints = { min: 0, max: 100 },
  thickness = 16,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [startPos, setStartPos] = React.useState(0);

  // Handler pentru începerea dragului
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos(orientation === "vertical" ? e.clientX : e.clientY);
    e.stopPropagation(); // Previne propagarea evenimentului
  };

  // Handler pentru mișcare
  const handleMouseMove = React.useCallback(
    (e) => {
      if (!isDragging) return;

      const currentPos = orientation === "vertical" ? e.clientX : e.clientY;
      const containerElement = document.getElementById("sections-container");
      const containerSize =
        orientation === "vertical"
          ? containerElement.offsetWidth
          : containerElement.offsetHeight;

      const delta = ((currentPos - startPos) / containerSize) * 100;
      const newPosition = Math.max(
        constraints.min,
        Math.min(constraints.max, position + delta)
      );

      onPositionChange(id, newPosition);
      setStartPos(currentPos);
    },
    [
      isDragging,
      orientation,
      position,
      constraints,
      onPositionChange,
      startPos,
      id,
    ]
  );

  // Handler pentru terminarea dragului
  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  // Event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      style={{
        position: "absolute",
        ...(orientation === "vertical"
          ? {
              top: 0,
              left: `${position}%`,
              transform: "translateX(-50%)",
              width: `${scaled.borderPx / thickness}rem`,
              height: "100%",
            }
          : {
              left: 0,
              top: `${position}%`,
              transform: "translateY(-50%)",
              height: `${scaled.borderPx / thickness}rem`,
              width: "100%",
            }),
        backgroundColor: "#333",
        cursor: orientation === "vertical" ? "ew-resize" : "ns-resize",
        zIndex: isDragging ? 1000 : 1,
      }}
      onMouseDown={handleMouseDown}
    >
      {isDragging && (
        <div
          style={{
            position: "absolute",
            [orientation === "vertical" ? "left" : "top"]: "50%",
            transform:
              orientation === "vertical"
                ? "translateX(-50%)"
                : "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "white",
            padding: "2px 6px",
            borderRadius: "3px",
            fontSize: "12px",
            whiteSpace: "nowrap",
          }}
        >
          {Math.round(position)}%
        </div>
      )}
    </div>
  );
};

export default DraggableLine;

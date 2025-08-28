import React from "react";

const DraggableLine = ({
  sectionIndex,
  id,
  position,
  setLinePositions,
  orientation = "vertical",
  scaled,
  constraints = { min: 0, max: 100 },
  thickness = 16,
  profileColor,
  doorDimensions,
  sectionDimensions,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [startPos, setStartPos] = React.useState(0);
  const [startPositionValue, setStartPositionValue] = React.useState(0);
  const [visualPosition, setVisualPosition] = React.useState(position);

  // Sincronizăm visualPosition cu position din props
  React.useEffect(() => {
    setVisualPosition(position);
  }, [position]);

  // Handler pentru începerea dragului
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos(orientation === "vertical" ? e.clientX : e.clientY);
    setStartPositionValue(visualPosition);
    e.stopPropagation();
  };

  // Handler pentru mișcare
  const handleMouseMove = React.useCallback(
    (e) => {
      if (!isDragging) return;

      const currentPos = orientation === "vertical" ? e.clientX : e.clientY;
      const containerElement = document.getElementById("sections-container");

      if (!containerElement) return;

      const containerSize =
        orientation === "vertical"
          ? containerElement.offsetWidth
          : containerElement.offsetHeight;

      // Calculăm delta față de poziția inițială de drag
      const delta = ((currentPos - startPos) / containerSize) * 100;

      // Calculăm noua poziție vizuală (pentru animație smooth)
      const newVisualPosition = Math.max(
        constraints.min,
        Math.min(constraints.max, startPositionValue + delta)
      );

      // Actualizăm poziția vizuală imediat (fără re-render)
      setVisualPosition(newVisualPosition);
    },
    [isDragging, orientation, constraints, startPos, startPositionValue]
  );

  // Handler pentru terminarea dragului - actualizăm state-ul global
  const handleMouseUp = React.useCallback(() => {
    if (isDragging) {
      setIsDragging(false);

      setLinePositions(sectionIndex, {
        [id]: visualPosition,
      });
    }
  }, [visualPosition, id, setLinePositions, isDragging, sectionIndex]);

  // Event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      style={{
        position: "absolute",
        ...(orientation === "vertical"
          ? {
              top: 0,
              left: `${visualPosition}%`,
              transform: "translateX(-50%)",
              width: `${scaled.borderPx / thickness}rem`,
              height: "100%",
              transition: isDragging ? "none" : "left 0.2s ease",
            }
          : {
              left: 0,
              top: `${visualPosition}%`,
              transform: "translateY(-50%)",
              height: `${scaled.borderPx / thickness}rem`,
              width: "100%",
              transition: isDragging ? "none" : "top 0.2s ease",
            }),
        backgroundColor: profileColor,
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
          {Math.round(visualPosition)}%
        </div>
      )}
    </div>
  );
};

export default DraggableLine;

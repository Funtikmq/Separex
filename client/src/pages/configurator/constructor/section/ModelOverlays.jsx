import React from "react";
import DraggableLine from "./DraggableLine.jsx";

export const Line = ({ scaled, onPositionChange, positions }) => {
  const defaultPositions = {
    line1: 10,
  };

  const [localPositions, setLocalPositions] = React.useState(
    positions?.Line || defaultPositions
  );

  React.useEffect(() => {
    onPositionChange("Line", localPositions);
  }, []);

  const handlePositionChange = (lineId, newPosition) => {
    const newPositions = {
      ...localPositions,
      [lineId]: newPosition,
    };
    setLocalPositions(newPositions);
    onPositionChange("Line", newPositions);
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        id="line1"
        position={localPositions.line1}
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
    </div>
  );
};

export const DoubleLine = ({ scaled, onPositionChange, positions }) => {
  const defaultPositions = {
    line1: 10,
    line2: 20,
  };

  const [localPositions, setLocalPositions] = React.useState(
    positions?.DoubleLine || defaultPositions
  );

  React.useEffect(() => {
    onPositionChange("DoubleLine", localPositions);
  }, []);

  const handlePositionChange = (lineId, newPosition) => {
    const newPositions = {
      ...localPositions,
      [lineId]: newPosition,
    };
    setLocalPositions(newPositions);
    onPositionChange("DoubleLine", newPositions);
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        id="line1"
        position={localPositions.line1}
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: localPositions.line2 - 5 }}
      />
      <DraggableLine
        id="line2"
        position={localPositions.line2}
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: localPositions.line1 + 5, max: 100 }}
      />
    </div>
  );
};

export const TripleLine = ({ scaled, onPositionChange, positions }) => {
  const defaultPositions = {
    line1: 10,
    line2: 20,
    line3: 30,
  };

  const [localPositions, setLocalPositions] = React.useState(
    positions?.TripleLine || defaultPositions
  );

  React.useEffect(() => {
    onPositionChange("TripleLine", localPositions);
  }, []);

  const handlePositionChange = (lineId, newPosition) => {
    const newPositions = {
      ...localPositions,
      [lineId]: newPosition,
    };
    setLocalPositions(newPositions);
    onPositionChange("TripleLine", newPositions);
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        id="line1"
        position={localPositions.line1}
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: localPositions.line2 - 5 }}
      />
      <DraggableLine
        id="line2"
        position={localPositions.line2}
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{
          min: localPositions.line1 + 5,
          max: localPositions.line3 - 5,
        }}
      />
      <DraggableLine
        id="line3"
        position={localPositions.line3}
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: localPositions.line2 + 5, max: 100 }}
      />
    </div>
  );
};

export const Simetry = ({ scaled, onPositionChange, positions }) => {
  const defaultPositions = {
    horizontal1: 50,
  };

  const [localPositions, setLocalPositions] = React.useState(
    positions?.Simetry || defaultPositions
  );

  React.useEffect(() => {
    onPositionChange("Simetry", localPositions);
  }, []);

  const handlePositionChange = (lineId, newPosition) => {
    const newPositions = {
      ...localPositions,
      [lineId]: newPosition,
    };
    setLocalPositions(newPositions);
    onPositionChange("Simetry", newPositions);
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        id="horizontal1"
        position={localPositions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
    </div>
  );
};

export const Trio = ({ scaled, onPositionChange, positions }) => {
  const defaultPositions = {
    horizontal1: 33,
    horizontal2: 66,
  };

  const [localPositions, setLocalPositions] = React.useState(
    positions?.Trio || defaultPositions
  );

  React.useEffect(() => {
    onPositionChange("Trio", localPositions);
  }, []);

  const handlePositionChange = (lineId, newPosition) => {
    const newPositions = {
      ...localPositions,
      [lineId]: newPosition,
    };
    setLocalPositions(newPositions);
    onPositionChange("Trio", newPositions);
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        id="horizontal1"
        position={localPositions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: localPositions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={localPositions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: localPositions.horizontal1 + 5, max: 100 }}
      />
    </div>
  );
};

export const Quatro = ({ scaled, onPositionChange, positions }) => {
  const defaultPositions = {
    horizontal1: 25,
    horizontal2: 50,
    horizontal3: 75,
  };

  const [localPositions, setLocalPositions] = React.useState(
    positions?.Quatro || defaultPositions
  );

  React.useEffect(() => {
    onPositionChange("Quatro", localPositions);
  }, []);

  const handlePositionChange = (lineId, newPosition) => {
    const newPositions = {
      ...localPositions,
      [lineId]: newPosition,
    };
    setLocalPositions(newPositions);
    onPositionChange("Quatro", newPositions);
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        id="horizontal1"
        position={localPositions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: localPositions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={localPositions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{
          min: localPositions.horizontal1 + 5,
          max: localPositions.horizontal3 - 5,
        }}
      />
      <DraggableLine
        id="horizontal3"
        position={localPositions.horizontal3}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: localPositions.horizontal2 + 5, max: 100 }}
      />
    </div>
  );
};

export const Five = ({ scaled, onPositionChange, positions }) => {
  const defaultPositions = {
    horizontal1: 20,
    horizontal2: 40,
    horizontal3: 60,
    horizontal4: 80,
  };

  const [localPositions, setLocalPositions] = React.useState(
    positions?.Five || defaultPositions
  );

  React.useEffect(() => {
    onPositionChange("Five", localPositions);
  }, []);

  const handlePositionChange = (lineId, newPosition) => {
    const newPositions = {
      ...localPositions,
      [lineId]: newPosition,
    };
    setLocalPositions(newPositions);
    onPositionChange("Five", newPositions);
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        id="horizontal1"
        position={localPositions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: localPositions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={localPositions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{
          min: localPositions.horizontal1 + 5,
          max: localPositions.horizontal3 - 5,
        }}
      />
      <DraggableLine
        id="horizontal3"
        position={localPositions.horizontal3}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{
          min: localPositions.horizontal2 + 5,
          max: localPositions.horizontal4 - 5,
        }}
      />
      <DraggableLine
        id="horizontal4"
        position={localPositions.horizontal4}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: localPositions.horizontal3 + 5, max: 100 }}
      />
    </div>
  );
};

export const Trend = ({
  scaled,
  onPositionChange,
  positions,
  doorDimensions,
}) => {
  const defaultPositions = {
    horizontal1: 70,
    horizontal2: 85,
  };

  const [localPositions, setLocalPositions] = React.useState(
    positions?.Trend || defaultPositions
  );

  React.useEffect(() => {
    onPositionChange("Trend", localPositions);
  }, []);

  const handlePositionChange = (lineId, newPosition) => {
    const newPositions = {
      ...localPositions,
      [lineId]: newPosition,
    };
    setLocalPositions(newPositions);
    onPositionChange("Trend", newPositions);
  };

  if (doorDimensions.height < 1200) {
    return null;
  }

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        id="horizontal1"
        position={localPositions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: localPositions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={localPositions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: localPositions.horizontal1 + 5, max: 100 }}
      />
    </div>
  );
};

export const Nordic = ({ scaled, onPositionChange, positions }) => {
  const defaultPositions = {
    horizontal1: 50,
    vertical1: 15,
  };

  const [localPositions, setLocalPositions] = React.useState(
    positions?.Nordic || defaultPositions
  );

  React.useEffect(() => {
    onPositionChange("Nordic", localPositions);
  }, []);

  const handlePositionChange = (lineId, newPosition) => {
    const newPositions = {
      ...localPositions,
      [lineId]: newPosition,
    };
    setLocalPositions(newPositions);
    onPositionChange("Nordic", newPositions);
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        id="horizontal1"
        position={localPositions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
      <DraggableLine
        id="vertical1"
        position={localPositions.vertical1}
        orientation="vertical"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
    </div>
  );
};

export const Punto = ({ scaled, onPositionChange, positions }) => {
  const defaultPositions = {
    horizontal1: 40,
    horizontal2: 55,
    vertical1: 15,
  };

  const [localPositions, setLocalPositions] = React.useState(
    positions?.Punto || defaultPositions
  );

  React.useEffect(() => {
    onPositionChange("Punto", localPositions);
  }, []);

  const handlePositionChange = (lineId, newPosition) => {
    const newPositions = {
      ...localPositions,
      [lineId]: newPosition,
    };
    setLocalPositions(newPositions);
    onPositionChange("Punto", newPositions);
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        id="horizontal1"
        position={localPositions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: localPositions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={localPositions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: localPositions.horizontal1 + 5, max: 100 }}
      />
      <DraggableLine
        id="vertical1"
        position={localPositions.vertical1}
        orientation="vertical"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
    </div>
  );
};

export const Geos = ({ scaled, onPositionChange, positions }) => {
  const defaultPositions = {
    horizontal1: 50,
    vertical1: 50,
  };

  const [localPositions, setLocalPositions] = React.useState(
    positions?.Geos || defaultPositions
  );

  React.useEffect(() => {
    onPositionChange("Geos", localPositions);
  }, []);

  const handlePositionChange = (lineId, newPosition) => {
    const newPositions = {
      ...localPositions,
      [lineId]: newPosition,
    };
    setLocalPositions(newPositions);
    onPositionChange("Geos", newPositions);
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        id="horizontal1"
        position={localPositions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
      <DraggableLine
        id="vertical1"
        position={localPositions.vertical1}
        orientation="vertical"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
    </div>
  );
};

export const Geometry = ({ scaled, onPositionChange, positions }) => {
  const defaultPositions = {
    horizontal1: 33,
    horizontal2: 66,
    vertical1: 50,
  };

  const [localPositions, setLocalPositions] = React.useState(
    positions?.Geometry || defaultPositions
  );

  React.useEffect(() => {
    onPositionChange("Geometry", localPositions);
  }, []);

  const handlePositionChange = (lineId, newPosition) => {
    const newPositions = {
      ...localPositions,
      [lineId]: newPosition,
    };
    setLocalPositions(newPositions);
    onPositionChange("Geometry", newPositions);
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        id="horizontal1"
        position={localPositions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: localPositions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={localPositions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: localPositions.horizontal1 + 5, max: 100 }}
      />
      <DraggableLine
        id="vertical1"
        position={localPositions.vertical1}
        orientation="vertical"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
    </div>
  );
};

export const Star = ({ scaled, onPositionChange, positions }) => {
  const [localPositions, setLocalPositions] = React.useState(
    positions?.Star || {
      horizontal1: 25,
      horizontal2: 50,
      horizontal3: 75,
      vertical1: 50,
    }
  );

  const handlePositionChange = (lineId, newPosition) => {
    const newPositions = {
      ...localPositions,
      [lineId]: newPosition,
    };
    setLocalPositions(newPositions);
    onPositionChange("Star", newPositions);
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        id="horizontal1"
        position={localPositions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: localPositions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={localPositions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{
          min: localPositions.horizontal1 + 5,
          max: localPositions.horizontal3 - 5,
        }}
      />
      <DraggableLine
        id="horizontal3"
        position={localPositions.horizontal3}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: localPositions.horizontal2 + 5, max: 100 }}
      />
      <DraggableLine
        id="vertical1"
        position={localPositions.vertical1}
        orientation="vertical"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
    </div>
  );
};

export const Diez = ({ scaled, onPositionChange, positions }) => {
  const [localPositions, setLocalPositions] = React.useState(
    positions?.Diez || {
      horizontal1: 20,
      horizontal2: 40,
      horizontal3: 60,
      horizontal4: 80,
      vertical1: 50,
    }
  );

  const handlePositionChange = (lineId, newPosition) => {
    const newPositions = {
      ...localPositions,
      [lineId]: newPosition,
    };
    setLocalPositions(newPositions);
    onPositionChange("Diez", newPositions);
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        id="horizontal1"
        position={localPositions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: localPositions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={localPositions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{
          min: localPositions.horizontal1 + 5,
          max: localPositions.horizontal3 - 5,
        }}
      />
      <DraggableLine
        id="horizontal3"
        position={localPositions.horizontal3}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{
          min: localPositions.horizontal2 + 5,
          max: localPositions.horizontal4 - 5,
        }}
      />
      <DraggableLine
        id="horizontal4"
        position={localPositions.horizontal4}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: localPositions.horizontal3 + 5, max: 100 }}
      />
      <DraggableLine
        id="vertical1"
        position={localPositions.vertical1}
        orientation="vertical"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
    </div>
  );
};

export const Loft = ({ scaled, onPositionChange, positions }) => {
  const [localPositions, setLocalPositions] = React.useState(
    positions?.Loft || {
      horizontal1: 20,
      horizontal2: 80,
      vertical1: 15,
      vertical2: 85,
    }
  );

  const handlePositionChange = (lineId, newPosition) => {
    const newPositions = {
      ...localPositions,
      [lineId]: newPosition,
    };
    setLocalPositions(newPositions);
    onPositionChange("Loft", newPositions);
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        id="horizontal1"
        position={localPositions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: localPositions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={localPositions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: localPositions.horizontal1 + 5, max: 100 }}
      />
      <DraggableLine
        id="vertical1"
        position={localPositions.vertical1}
        orientation="vertical"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: localPositions.vertical2 - 5 }}
      />
      <DraggableLine
        id="vertical2"
        position={localPositions.vertical2}
        orientation="vertical"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: localPositions.vertical1 + 5, max: 100 }}
      />
    </div>
  );
};

// export const Nimbus = ({ scaled }) => {
//   const [positions, setPositions] = React.useState({
//     horizontal1: 10,
//     horizontal2: 90,
//     vertical1: 10,
//     vertical2: 90,
//   });

//   const handlePositionChange = (lineId, newPosition) => {
//     setPositions((prev) => ({
//       ...prev,
//       [lineId]: newPosition,
//     }));
//   };

//   return (
//     <div
//       style={{
//         height: "100%",
//         width: "100%",
//         position: "relative",
//       }}
//     >
//       <DraggableLine
//         id="horizontal1"
//         position={positions.horizontal1}
//         orientation="horizontal"
//         onPositionChange={handlePositionChange}
//         scaled={scaled}
//         constraints={{ min: 0, max: positions.horizontal2 - 5 }}
//       />
//       <DraggableLine
//         id="horizontal2"
//         position={positions.horizontal2}
//         orientation="horizontal"
//         onPositionChange={handlePositionChange}
//         scaled={scaled}
//         constraints={{ min: positions.horizontal1 + 5, max: 100 }}
//       />
//       <DraggableLine
//         id="vertical1"
//         position={positions.vertical1}
//         orientation="vertical"
//         onPositionChange={handlePositionChange}
//         scaled={scaled}
//         constraints={{ min: 0, max: positions.vertical2 - 5 }}
//       />
//       <DraggableLine
//         id="vertical2"
//         position={positions.vertical2}
//         orientation="vertical"
//         onPositionChange={handlePositionChange}
//         scaled={scaled}
//         constraints={{ min: positions.vertical1 + 5, max: 100 }}
//       />
//     </div>
//   );
// };

export const Nimbus = ({ scaled }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: `${(scaled.scaledWidth * 0.1) / 16}rem`,
          left: 0,
          transform: "translateY(50%)",
          width: "100%",
          height: `${scaled.borderPx / 20}rem`,
          backgroundColor: "#000",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: `${(scaled.scaledWidth * 0.1) / 16}rem`,
          left: 0,
          transform: "translateY(-50%)",
          width: "100%",
          height: `${scaled.borderPx / 20}rem`,
          backgroundColor: "#000",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: `${(scaled.scaledWidth * 0.1) / 16}rem`,
          transform: "translateX(50%)",
          width: `${scaled.borderPx / 20}rem`,
          height: "100%",
          backgroundColor: "#000",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: `${(scaled.scaledWidth * 0.1) / 16}rem`,
          transform: "translateX(-50%)",
          width: `${scaled.borderPx / 20}rem`,
          height: "100%",
          backgroundColor: "#000",
        }}
      />
    </div>
  );
};

export const Modern = ({ scaled }) => (
  <div
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      pointerEvents: "none",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "55%",
        left: 0,
        transform: "translateY(-50%)",
        width: "80%",
        height: `${scaled.borderPx / 20}rem`,
        backgroundColor: "#000",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: "80%",
        transform: "translateX(-100%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "45%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const ModernInverted = ({ scaled }) => (
  <div
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      pointerEvents: "none",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "55%",
        right: 0,
        transform: "translateY(-50%)",
        width: "80%",
        height: `${scaled.borderPx / 20}rem`,
        backgroundColor: "#000",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: 0,
        right: "80%",
        transform: "translateX(50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "45%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const Altus = ({ scaled, onPositionChange, positions }) => {
  const defaultPositions = {
    horizontal1: 45,
    horizontal2: 55,
    vertical1: 25,
    vertical2: 75,
  };

  const [localPositions, setLocalPositions] = React.useState(
    positions?.Altus || defaultPositions
  );

  // Trimite valorile default la montare
  React.useEffect(() => {
    onPositionChange("Altus", localPositions);
  }, []); // Empty dependency array means it runs once on mount

  const handlePositionChange = (lineId, newPosition) => {
    const newPositions = {
      ...localPositions,
      [lineId]: newPosition,
    };
    setLocalPositions(newPositions);
    onPositionChange("Altus", newPositions);
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        id="horizontal1"
        position={localPositions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: localPositions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={localPositions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: localPositions.horizontal1 + 5, max: 100 }}
      />
      <div style={{ height: "45%", position: "relative" }}>
        <DraggableLine
          id="vertical1"
          position={localPositions.vertical1}
          orientation="vertical"
          onPositionChange={handlePositionChange}
          scaled={scaled}
          constraints={{ min: 0, max: 100 }}
        />
      </div>
      <div
        style={{
          height: "45%",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <DraggableLine
          id="vertical2"
          position={localPositions.vertical2}
          orientation="vertical"
          onPositionChange={handlePositionChange}
          scaled={scaled}
          constraints={{ min: 0, max: 100 }}
        />
      </div>
    </div>
  );
};

import React from "react";
import DraggableLine from "./DraggableLine.jsx";

export const Line = ({ scaled }) => {
  const [positions, setPositions] = React.useState({
    line1: 10,
  });

  const handlePositionChange = (lineId, newPosition) => {
    setPositions((prev) => ({
      ...prev,
      [lineId]: newPosition,
    }));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <DraggableLine
        id="line1"
        position={positions.line1}
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
    </div>
  );
};

export const DoubleLine = ({ scaled }) => {
  // State pentru pozițiile liniilor
  const [positions, setPositions] = React.useState({
    line1: 10,
    line2: 20,
  });

  // Handler pentru actualizarea pozițiilor
  const handlePositionChange = (lineId, newPosition) => {
    setPositions((prev) => ({
      ...prev,
      [lineId]: newPosition,
    }));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <DraggableLine
        id="line1"
        position={positions.line1}
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: positions.line2 - 5 }}
      />
      <DraggableLine
        id="line2"
        position={positions.line2}
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: positions.line1 + 5, max: 100 }}
      />
    </div>
  );
};

export const TripleLine = ({ scaled }) => {
  const [positions, setPositions] = React.useState({
    line1: 10,
    line2: 20,
    line3: 30,
  });

  const handlePositionChange = (lineId, newPosition) => {
    setPositions((prev) => ({
      ...prev,
      [lineId]: newPosition,
    }));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <DraggableLine
        id="line1"
        position={positions.line1}
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: positions.line2 - 5 }}
      />
      <DraggableLine
        id="line2"
        position={positions.line2}
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: positions.line1 + 5, max: positions.line3 - 5 }}
      />
      <DraggableLine
        id="line3"
        position={positions.line3}
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: positions.line2 + 5, max: 100 }}
      />
    </div>
  );
};

export const Simetry = ({ scaled }) => {
  const [positions, setPositions] = React.useState({
    horizontal1: 50,
  });

  const handlePositionChange = (lineId, newPosition) => {
    setPositions((prev) => ({
      ...prev,
      [lineId]: newPosition,
    }));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <DraggableLine
        id="horizontal1"
        position={positions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
    </div>
  );
};

export const Trio = ({ scaled }) => {
  const [positions, setPositions] = React.useState({
    horizontal1: 33,
    horizontal2: 66,
  });

  const handlePositionChange = (lineId, newPosition) => {
    setPositions((prev) => ({
      ...prev,
      [lineId]: newPosition,
    }));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <DraggableLine
        id="horizontal1"
        position={positions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: positions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={positions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: positions.horizontal1 + 5, max: 100 }}
      />
    </div>
  );
};

export const Quatro = ({ scaled }) => {
  const [positions, setPositions] = React.useState({
    horizontal1: 25,
    horizontal2: 50,
    horizontal3: 75,
  });

  const handlePositionChange = (lineId, newPosition) => {
    setPositions((prev) => ({
      ...prev,
      [lineId]: newPosition,
    }));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <DraggableLine
        id="horizontal1"
        position={positions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: positions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={positions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{
          min: positions.horizontal1 + 5,
          max: positions.horizontal3 - 5,
        }}
      />
      <DraggableLine
        id="horizontal3"
        position={positions.horizontal3}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: positions.horizontal2 + 5, max: 100 }}
      />
    </div>
  );
};

export const Five = ({ scaled }) => {
  const [positions, setPositions] = React.useState({
    horizontal1: 20,
    horizontal2: 40,
    horizontal3: 60,
    horizontal4: 80,
  });

  const handlePositionChange = (lineId, newPosition) => {
    setPositions((prev) => ({
      ...prev,
      [lineId]: newPosition,
    }));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <DraggableLine
        id="horizontal1"
        position={positions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: positions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={positions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{
          min: positions.horizontal1 + 5,
          max: positions.horizontal3 - 5,
        }}
      />
      <DraggableLine
        id="horizontal3"
        position={positions.horizontal3}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{
          min: positions.horizontal2 + 5,
          max: positions.horizontal4 - 5,
        }}
      />
      <DraggableLine
        id="horizontal4"
        position={positions.horizontal4}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: positions.horizontal3 + 5, max: 100 }}
      />
    </div>
  );
};

export const Trend = ({ scaled, doorDimensions }) => {
  const [positions, setPositions] = React.useState({
    horizontal1: 70,
    horizontal2: 85,
  });

  const handlePositionChange = (lineId, newPosition) => {
    setPositions((prev) => ({
      ...prev,
      [lineId]: newPosition,
    }));
  };

  if (doorDimensions.height < 1200) {
    return null;
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <DraggableLine
        id="horizontal1"
        position={positions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: positions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={positions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: positions.horizontal1 + 5, max: 100 }}
      />
    </div>
  );
};

export const Nordic = ({ scaled }) => {
  const [positions, setPositions] = React.useState({
    horizontal1: 50,
    vertical1: 15,
  });

  const handlePositionChange = (lineId, newPosition) => {
    setPositions((prev) => ({
      ...prev,
      [lineId]: newPosition,
    }));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <DraggableLine
        id="horizontal1"
        position={positions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
      <DraggableLine
        id="vertical1"
        position={positions.vertical1}
        orientation="vertical"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
    </div>
  );
};

export const Punto = ({ scaled }) => {
  const [positions, setPositions] = React.useState({
    horizontal1: 40,
    horizontal2: 55,
    vertical1: 15,
  });

  const handlePositionChange = (lineId, newPosition) => {
    setPositions((prev) => ({
      ...prev,
      [lineId]: newPosition,
    }));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <DraggableLine
        id="horizontal1"
        position={positions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: positions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={positions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: positions.horizontal1 + 5, max: 100 }}
      />
      <DraggableLine
        id="vertical1"
        position={positions.vertical1}
        orientation="vertical"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
    </div>
  );
};

export const Geos = ({ scaled }) => {
  const [positions, setPositions] = React.useState({
    horizontal1: 50,
    vertical1: 50,
  });

  const handlePositionChange = (lineId, newPosition) => {
    setPositions((prev) => ({
      ...prev,
      [lineId]: newPosition,
    }));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <DraggableLine
        id="horizontal1"
        position={positions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
      <DraggableLine
        id="vertical1"
        position={positions.vertical1}
        orientation="vertical"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
    </div>
  );
};

export const Geometry = ({ scaled }) => {
  // State pentru toate liniile
  const [positions, setPositions] = React.useState({
    horizontal1: 33,
    horizontal2: 66,
    vertical1: 50,
  });

  // Handler pentru actualizarea pozițiilor
  const handlePositionChange = (lineId, newPosition) => {
    setPositions((prev) => ({
      ...prev,
      [lineId]: newPosition,
    }));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <DraggableLine
        id="horizontal1"
        position={positions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: positions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={positions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: positions.horizontal1 + 5, max: 100 }}
      />
      <DraggableLine
        id="vertical1"
        position={positions.vertical1}
        orientation="vertical"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
    </div>
  );
};

export const Star = ({ scaled }) => {
  const [positions, setPositions] = React.useState({
    horizontal1: 25,
    horizontal2: 50,
    horizontal3: 75,
    vertical1: 50,
  });

  const handlePositionChange = (lineId, newPosition) => {
    setPositions((prev) => ({
      ...prev,
      [lineId]: newPosition,
    }));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <DraggableLine
        id="horizontal1"
        position={positions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: positions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={positions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{
          min: positions.horizontal1 + 5,
          max: positions.horizontal3 - 5,
        }}
      />
      <DraggableLine
        id="horizontal3"
        position={positions.horizontal3}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: positions.horizontal2 + 5, max: 100 }}
      />
      <DraggableLine
        id="vertical1"
        position={positions.vertical1}
        orientation="vertical"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
    </div>
  );
};

export const Diez = ({ scaled }) => {
  const [positions, setPositions] = React.useState({
    horizontal1: 20,
    horizontal2: 40,
    horizontal3: 60,
    horizontal4: 80,
    vertical1: 50,
  });

  const handlePositionChange = (lineId, newPosition) => {
    setPositions((prev) => ({
      ...prev,
      [lineId]: newPosition,
    }));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <DraggableLine
        id="horizontal1"
        position={positions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: positions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={positions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{
          min: positions.horizontal1 + 5,
          max: positions.horizontal3 - 5,
        }}
      />
      <DraggableLine
        id="horizontal3"
        position={positions.horizontal3}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{
          min: positions.horizontal2 + 5,
          max: positions.horizontal4 - 5,
        }}
      />
      <DraggableLine
        id="horizontal4"
        position={positions.horizontal4}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: positions.horizontal3 + 5, max: 100 }}
      />
      <DraggableLine
        id="vertical1"
        position={positions.vertical1}
        orientation="vertical"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
      />
    </div>
  );
};

export const Loft = ({ scaled }) => {
  const [positions, setPositions] = React.useState({
    horizontal1: 20,
    horizontal2: 80,
    vertical1: 15,
    vertical2: 85,
  });

  const handlePositionChange = (lineId, newPosition) => {
    setPositions((prev) => ({
      ...prev,
      [lineId]: newPosition,
    }));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <DraggableLine
        id="horizontal1"
        position={positions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: positions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={positions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: positions.horizontal1 + 5, max: 100 }}
      />
      <DraggableLine
        id="vertical1"
        position={positions.vertical1}
        orientation="vertical"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: positions.vertical2 - 5 }}
      />
      <DraggableLine
        id="vertical2"
        position={positions.vertical2}
        orientation="vertical"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: positions.vertical1 + 5, max: 100 }}
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

export const Altus = ({ scaled }) => {
  const [positions, setPositions] = React.useState({
    horizontal1: 45,
    horizontal2: 55,
    vertical1: 25,
    vertical2: 75,
  });

  const handlePositionChange = (lineId, newPosition) => {
    setPositions((prev) => ({
      ...prev,
      [lineId]: newPosition,
    }));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <DraggableLine
        id="horizontal1"
        position={positions.horizontal1}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: 0, max: positions.horizontal2 - 5 }}
      />
      <DraggableLine
        id="horizontal2"
        position={positions.horizontal2}
        orientation="horizontal"
        onPositionChange={handlePositionChange}
        scaled={scaled}
        constraints={{ min: positions.horizontal1 + 5, max: 100 }}
      />
      <div style={{ height: "45%", position: "relative" }}>
        <DraggableLine
          id="vertical1"
          position={positions.vertical1}
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
          position={positions.vertical2}
          orientation="vertical"
          onPositionChange={handlePositionChange}
          scaled={scaled}
          constraints={{ min: 0, max: 100 }}
        />
      </div>
    </div>
  );
};

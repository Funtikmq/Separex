import DraggableLine from "./DraggableLine.jsx";

export const Line = ({
  sectionIndex,
  scaled,
  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    vertical1: sectionLinePositions.vertical1 ?? 10,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        sectionIndex={sectionIndex}
        id="vertical1"
        position={positions.vertical1}
        setLinePositions={setLinePositionsForSection}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
    </div>
  );
};

export const DoubleLine = ({
  sectionIndex,
  scaled,
  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    vertical1: sectionLinePositions.vertical1 ?? 10,
    vertical2: sectionLinePositions.vertical2 ?? 20,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        sectionIndex={sectionIndex}
        id="vertical1"
        position={positions.vertical1}
        setLinePositions={setLinePositionsForSection}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="vertical2"
        position={positions.vertical2}
        setLinePositions={setLinePositionsForSection}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
    </div>
  );
};

export const TripleLine = ({
  sectionIndex,
  scaled,
  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    vertical1: sectionLinePositions.vertical1 ?? 10,
    vertical2: sectionLinePositions.vertical2 ?? 20,
    vertical3: sectionLinePositions.vertical3 ?? 30,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        sectionIndex={sectionIndex}
        id="vertical1"
        position={positions.vertical1}
        setLinePositions={setLinePositionsForSection}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="vertical2"
        position={positions.vertical2}
        setLinePositions={setLinePositionsForSection}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="vertical3"
        position={positions.vertical3}
        setLinePositions={setLinePositionsForSection}
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
    </div>
  );
};

export const Simetry = ({
  sectionIndex,
  scaled,
  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    horizontal1: sectionLinePositions.horizontal1 ?? 50,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal1"
        position={positions.horizontal1}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
    </div>
  );
};

export const Trio = ({
  sectionIndex,
  scaled,
  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    horizontal1: sectionLinePositions.horizontal1 ?? 33,
    horizontal2: sectionLinePositions.horizontal2 ?? 66,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal1"
        position={positions.horizontal1}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal2"
        position={positions.horizontal2}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
    </div>
  );
};

export const Quatro = ({
  sectionIndex,
  scaled,
  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    horizontal1: sectionLinePositions.horizontal1 ?? 25,
    horizontal2: sectionLinePositions.horizontal2 ?? 50,
    horizontal3: sectionLinePositions.horizontal3 ?? 75,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal1"
        position={positions.horizontal1}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal2"
        position={positions.horizontal2}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal3"
        position={positions.horizontal3}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
    </div>
  );
};

export const Five = ({
  sectionIndex,
  scaled,
  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    horizontal1: sectionLinePositions.horizontal1 ?? 20,
    horizontal2: sectionLinePositions.horizontal2 ?? 40,
    horizontal3: sectionLinePositions.horizontal3 ?? 60,
    horizontal4: sectionLinePositions.horizontal4 ?? 80,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal1"
        position={positions.horizontal1}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal2"
        position={positions.horizontal2}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal3"
        position={positions.horizontal3}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal4"
        position={positions.horizontal4}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
    </div>
  );
};

export const Trend = ({
  sectionIndex,
  scaled,

  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    horizontal1: sectionLinePositions.horizontal1 ?? 55,
    horizontal2: sectionLinePositions.horizontal2 ?? 65,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal1"
        position={positions.horizontal1}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
        doorDimensions={doorDimensions}
        sectionDimensions={sectionDimensions}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal2"
        position={positions.horizontal2}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
        doorDimensions={doorDimensions}
        sectionDimensions={sectionDimensions}
      />
    </div>
  );
};

export const Nordic = ({
  sectionIndex,
  scaled,
  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    horizontal1: sectionLinePositions.horizontal1 ?? 50,
    vertical1: sectionLinePositions.vertical1 ?? 15,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal1"
        position={positions.horizontal1}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="vertical1"
        position={positions.vertical1}
        setLinePositions={setLinePositionsForSection}
        orientation="vertical"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
    </div>
  );
};

export const Punto = ({
  sectionIndex,
  scaled,
  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    horizontal1: sectionLinePositions.horizontal1 ?? 40,
    horizontal2: sectionLinePositions.horizontal2 ?? 55,
    vertical1: sectionLinePositions.vertical1 ?? 15,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal1"
        position={positions.horizontal1}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal2"
        position={positions.horizontal2}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="vertical1"
        position={positions.vertical1}
        setLinePositions={setLinePositionsForSection}
        orientation="vertical"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
    </div>
  );
};

export const Geos = ({
  sectionIndex,
  scaled,
  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    horizontal1: sectionLinePositions.horizontal1 ?? 50,
    vertical1: sectionLinePositions.vertical1 ?? 50,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal1"
        position={positions.horizontal1}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="vertical1"
        position={positions.vertical1}
        setLinePositions={setLinePositionsForSection}
        orientation="vertical"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
    </div>
  );
};

export const Geometry = ({
  sectionIndex,
  scaled,
  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    horizontal1: sectionLinePositions.horizontal1 ?? 33,
    horizontal2: sectionLinePositions.horizontal2 ?? 66,
    vertical1: sectionLinePositions.vertical1 ?? 50,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal1"
        position={positions.horizontal1}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal2"
        position={positions.horizontal2}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="vertical1"
        position={positions.vertical1}
        setLinePositions={setLinePositionsForSection}
        orientation="vertical"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
    </div>
  );
};

export const Star = ({
  sectionIndex,
  scaled,
  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    horizontal1: sectionLinePositions.horizontal1 ?? 25,
    horizontal2: sectionLinePositions.horizontal2 ?? 50,
    horizontal3: sectionLinePositions.horizontal3 ?? 75,
    vertical1: sectionLinePositions.vertical1 ?? 50,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal1"
        position={positions.horizontal1}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal2"
        position={positions.horizontal2}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal3"
        position={positions.horizontal3}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="vertical1"
        position={positions.vertical1}
        setLinePositions={setLinePositionsForSection}
        orientation="vertical"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
    </div>
  );
};

export const Diez = ({
  sectionIndex,
  scaled,
  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    horizontal1: sectionLinePositions.horizontal1 ?? 20,
    horizontal2: sectionLinePositions.horizontal2 ?? 40,
    horizontal3: sectionLinePositions.horizontal3 ?? 60,
    horizontal4: sectionLinePositions.horizontal4 ?? 80,
    vertical1: sectionLinePositions.vertical1 ?? 50,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal1"
        position={positions.horizontal1}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal2"
        position={positions.horizontal2}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal3"
        position={positions.horizontal3}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal4"
        position={positions.horizontal4}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="vertical1"
        position={positions.vertical1}
        setLinePositions={setLinePositionsForSection}
        orientation="vertical"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
    </div>
  );
};

export const Loft = ({
  sectionIndex,
  scaled,
  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    horizontal1: sectionLinePositions.horizontal1 ?? 20,
    horizontal2: sectionLinePositions.horizontal2 ?? 80,
    vertical1: sectionLinePositions.vertical1 ?? 15,
    vertical2: sectionLinePositions.vertical2 ?? 85,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal1"
        position={positions.horizontal1}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal2"
        position={positions.horizontal2}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="vertical1"
        position={positions.vertical1}
        setLinePositions={setLinePositionsForSection}
        orientation="vertical"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="vertical2"
        position={positions.vertical2}
        setLinePositions={setLinePositionsForSection}
        orientation="vertical"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
    </div>
  );
};

export const Nimbus = ({
  sectionIndex,
  scaled,
  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    horizontal1: sectionLinePositions.horizontal1 ?? 10,
    horizontal2: sectionLinePositions.horizontal2 ?? 90,
    vertical1: sectionLinePositions.vertical1 ?? 10,
    vertical2: sectionLinePositions.vertical2 ?? 90,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal1"
        position={positions.horizontal1}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="horizontal2"
        position={positions.horizontal2}
        setLinePositions={setLinePositionsForSection}
        orientation="horizontal"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="vertical1"
        position={positions.vertical1}
        setLinePositions={setLinePositionsForSection}
        orientation="vertical"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
      <DraggableLine
        sectionIndex={sectionIndex}
        id="vertical2"
        position={positions.vertical2}
        setLinePositions={setLinePositionsForSection}
        orientation="vertical"
        scaled={scaled}
        constraints={{ min: 0, max: 100 }}
        profileColor={profileColor}
      />
    </div>
  );
};

export const Altus = ({
  sectionIndex,
  scaled,
  getLinePositionsForSection,
  setLinePositionsForSection,
  profileColor,
}) => {
  const sectionLinePositions = getLinePositionsForSection(sectionIndex);

  const positions = {
    vertical1: sectionLinePositions.verticalTop ?? 75,
    vertical2: sectionLinePositions.verticalBottom ?? 25,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: 0,
          transform: "translateY(-50%)",
          width: "100%",
          height: `${scaled.borderPx / 20}rem`,
          backgroundColor: profileColor,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: 0,
          transform: "translateY(-50%)",
          width: "100%",
          height: `${scaled.borderPx / 20}rem`,
          backgroundColor: profileColor,
        }}
      />
      <div style={{ height: "45%", position: "relative" }}>
        <DraggableLine
          sectionIndex={sectionIndex}
          id="verticalTop"
          position={positions.vertical1}
          setLinePositions={setLinePositionsForSection}
          orientation="vertical"
          scaled={scaled}
          constraints={{ min: 0, max: 100 }}
          profileColor={profileColor}
        />
      </div>
      <div style={{ height: "45%", position: "relative", bottom: "-10%" }}>
        <DraggableLine
          sectionIndex={sectionIndex}
          id="verticalBottom"
          position={positions.vertical2}
          setLinePositions={setLinePositionsForSection}
          orientation="vertical"
          scaled={scaled}
          constraints={{ min: 0, max: 100 }}
          profileColor={profileColor}
        />
      </div>
    </div>
  );
};

// Modelele non-draggable (Modern, ModernInverted) rămân neschimbate
export const Modern = ({ scaled, profileColor }) => (
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
        backgroundColor: profileColor,
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
        backgroundColor: profileColor,
      }}
    />
  </div>
);

export const ModernInverted = ({ scaled, profileColor }) => (
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
        backgroundColor: profileColor,
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
        backgroundColor: profileColor,
      }}
    />
  </div>
);

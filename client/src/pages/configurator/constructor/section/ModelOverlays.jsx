export const Line = ({ scaled }) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: "10%",
      transform: "translateX(-50%)",
      width: `${scaled.borderPx / 16}rem`,
      height: "100%",
      backgroundColor: "#000",
      pointerEvents: "none",
      transform: "translateX(-50%)",
    }}
  />
);

export const LineInverted = ({ scaled }) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: "90%",
      transform: "translateX(-50%)",
      width: `${scaled.borderPx / 16}rem`,
      height: "100%",
      backgroundColor: "#000",
      pointerEvents: "none",
    }}
  />
);

export const DoubleLine = ({ scaled }) => (
  <div
    style={{
      height: "100%",
      width: "100%",
      pointerEvents: "none",
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "10%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "20%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const DoubleLineInverted = ({ scaled }) => (
  <div
    style={{
      height: "100%",
      width: "100%",
      pointerEvents: "none",
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "90%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "80%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const TripleLine = ({ scaled }) => (
  <div
    style={{
      height: "100%",
      width: "100%",
      pointerEvents: "none",
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "10%",
        transform: "translateX(-50%)",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "20%",
        transform: "translateX(-50%)",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "30%",
        transform: "translateX(-50%)",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const TripleLineInverted = ({ scaled }) => (
  <div
    style={{
      height: "100%",
      width: "100%",
      pointerEvents: "none",
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "90%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "80%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "70%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const Simetry = ({ scaled }) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: 0,
      transform: "translateY(-50%)",
      width: `100%`,
      height: `${scaled.borderPx / 20}rem`,
      backgroundColor: "#000",
    }}
  />
);

export const Trio = ({ scaled }) => (
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
        top: "33%",
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
        top: "66%",
        left: 0,
        transform: "translateY(-50%)",
        width: "100%",
        height: `${scaled.borderPx / 20}rem`,
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const Quatro = ({ scaled }) => (
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
        top: "25%",
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
        top: "50%",
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
        top: "75%",
        left: 0,
        transform: "translateY(-50%)",
        width: "100%",
        height: `${scaled.borderPx / 20}rem`,
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const Five = ({ scaled }) => (
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
        top: "20%",
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
        top: "40%",
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
        top: "60%",
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
        top: "80%",
        left: 0,
        transform: "translateY(-50%)",
        width: "100%",
        height: `${scaled.borderPx / 20}rem`,
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const Trend = ({ scaled }) => (
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
        top: "40%",
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
        top: "60%",
        left: 0,
        transform: "translateY(-50%)",
        width: "100%",
        height: `${scaled.borderPx / 20}rem`,
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const Nordic = ({ scaled }) => (
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
        top: "60%",
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
        left: "10%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const NordicInverted = ({ scaled }) => (
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
        top: "60%",
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
        left: "90%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const Punto = ({ scaled }) => (
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
        top: "45%",
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
        top: "55%",
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
        left: "10%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const PuntoInverted = ({ scaled }) => (
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
        top: "45%",
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
        top: "55%",
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
        left: "90%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const Geos = ({ scaled }) => (
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
        top: "50%",
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
        left: "50%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const Geometry = ({ scaled }) => (
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
        top: "33%",
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
        top: "66%",
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
        left: "50%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const Star = ({ scaled }) => (
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
        top: "25%",
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
        top: "50%",
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
        top: "75%",
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
        left: "50%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const Diez = ({ scaled }) => (
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
        top: "20%",
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
        top: "40%",
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
        top: "60%",
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
        top: "80%",
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
        left: "50%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const Loft = ({ scaled }) => (
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
        top: "20%",
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
        top: "80%",
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
        left: "10%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "90%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "100%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

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

export const Altus = ({ scaled }) => (
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
        top: "45%",
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
        top: "55%",
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
        left: "75%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "45%",
        backgroundColor: "#000",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: "25%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "45%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

export const AltusInverted = ({ scaled }) => (
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
        top: "45%",
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
        top: "55%",
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
        left: "25%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "45%",
        backgroundColor: "#000",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: "75%",
        transform: "translateX(-50%)",
        width: `${scaled.borderPx / 20}rem`,
        height: "45%",
        backgroundColor: "#000",
      }}
    />
  </div>
);

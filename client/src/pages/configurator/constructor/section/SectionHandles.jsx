export const HandleWithLock = ({ scaled, position }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        ...(position === "right" ? { right: ".3em" } : { left: ".3em" }),
        transform: `translateY(-50%) translateX(${
          position === "right" ? "50%" : "-50%"
        })`,
      }}
    >
      {/*Blocul manerului*/}
      <div
        style={{
          position: "relative",
          width: `${(scaled.borderPx * 2) / 16}rem`,
          height: `${(scaled.borderPx * 2) / 16}rem`,
          backgroundColor: "#333",
          pointerEvents: "none",
        }}
      />
      {/*Manerului propriu-zis*/}
      <div
        style={{
          position: "absolute",
          width: `${(scaled.borderPx * 5) / 16}rem`,
          height: `${scaled.borderPx / 16}rem`,
          backgroundColor: "#333",
          top: "50%",
          ...(position === "right" ? { right: "150%" } : { left: "150%" }),
          transform: `translateY(-50%) translateX(${
            position === "right" ? "50%" : "-50%"
          })`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export const PullHandle160 = ({ scaled, position }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: `${scaled.borderPx / 16}rem`,
        height: `${(scaled.borderPx * 7) / 16}rem`,
        backgroundColor: "#333",
        ...(position === "right" ? { right: ".2em" } : { left: ".2em" }),
        top: "50%",
        transform: `translateY(-50%) translateX(${
          position === "right" ? "50%" : "-50%"
        })`,
        pointerEvents: "none",
      }}
    />
  );
};

export const PullHandle288 = ({ scaled, position }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: `${scaled.borderPx / 16}rem`,
        height: `${(scaled.borderPx * 13) / 16}rem`,
        backgroundColor: "#333",
        ...(position === "right" ? { right: ".2em" } : { left: ".2em" }),
        top: "50%",
        transform: `translateY(-50%) translateX(${
          position === "right" ? "50%" : "-50%"
        })`,
        pointerEvents: "none",
      }}
    />
  );
};

export const PullHandle448 = ({ scaled, position }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: `${scaled.borderPx / 16}rem`,
        height: `${(scaled.borderPx * 20) / 16}rem`,
        backgroundColor: "#333",
        ...(position === "right" ? { right: ".2em" } : { left: ".2em" }),
        top: "50%",
        transform: `translateY(-50%) translateX(${
          position === "right" ? "50%" : "-50%"
        })`,
        pointerEvents: "none",
      }}
    />
  );
};

export const HandleWithLock = ({ scaled, position }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        ...(position === "right" ? { right: ".35em" } : { left: ".3em" }),
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
          height: `${(scaled.borderPx * 6) / 16}rem`,
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
          top: "20%",
          ...(position === "right" ? { right: "1em" } : { left: "1em" }),
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
        ...(position === "right" ? { right: ".1em" } : { left: ".2em" }),
        top: "50%",
        transform: `translateY(-50%) translateX(${
          position === "right" ? "0" : "-50%"
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
        ...(position === "right" ? { right: ".1em" } : { left: ".2em" }),
        top: "50%",
        transform: `translateY(-50%) translateX(${
          position === "right" ? "0" : "-50%"
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
        ...(position === "right" ? { right: ".1em" } : { left: ".2em" }),
        top: "50%",
        transform: `translateY(-50%) translateX(${
          position === "right" ? "0" : "-50%"
        })`,
        pointerEvents: "none",
      }}
    />
  );
};

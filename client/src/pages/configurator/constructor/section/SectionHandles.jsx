export const HandleWithLock = ({ scaled, position, profileColor }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: `${(scaled.borderPx * 43) / 16}rem`,
        ...(position === "right"
          ? { right: `${scaled.borderPx / 16}rem` }
          : { left: `${scaled.borderPx / 16}rem` }),
        transform: `translateY(-50%) translateX(${
          position === "right" ? "50%" : "-50%"
        })`,
        zIndex: 5,
      }}
    >
      {/*Blocul manerului*/}
      <div
        style={{
          position: "relative",
          width: `${(scaled.borderPx * 2) / 16}rem`,
          height: `${(scaled.borderPx * 2) / 16}rem`,
          backgroundColor: profileColor,
          pointerEvents: "none",
        }}
      />
      {/*Manerului propriu-zis*/}
      <div
        style={{
          position: "absolute",
          width: `${(scaled.borderPx * 5) / 16}rem`,
          height: `${scaled.borderPx / 16}rem`,
          backgroundColor: profileColor,
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

export const PullHandle160 = ({ scaled, position, profileColor }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: `${(scaled.borderPx * 45) / 16}rem`,
        pointerEvents: "none",
        width: `${scaled.borderPx / 16}rem`,
        height: `${(scaled.borderPx * 7) / 16}rem`,
        ...(position === "right" ? { right: "0" } : { left: "0" }),
        transform: `translateY(50%)`,
        zIndex: 5,
      }}
    >
      {/*Bara orizontala top*/}
      <div
        style={{
          position: "absolute",
          top: 0,
          ...(position === "right" ? { right: "0" } : { left: "0" }),
          width: `${scaled.borderPx / 16}rem`,
          height: `${scaled.borderPx / 16}rem`,
          backgroundColor: profileColor,
        }}
      />
      {/*Bara verticala*/}
      <div
        style={{
          position: "absolute",
          width: `${scaled.borderPx / 16}rem`,
          height: "100%",
          backgroundColor: profileColor,
          bottom: "0",
          ...(position === "right" ? { right: "100%" } : { left: "100%" }),
        }}
      />
      {/*Bara orizontala bottom*/}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          ...(position === "right" ? { right: "0" } : { left: "0" }),
          width: `${scaled.borderPx / 16}rem`,
          height: `${scaled.borderPx / 16}rem`,
          backgroundColor: profileColor,
        }}
      />
    </div>
  );
};

export const PullHandle288 = ({ scaled, position, profileColor }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: `${(scaled.borderPx * 49) / 16}rem`,
        pointerEvents: "none",
        width: `${scaled.borderPx / 16}rem`,
        height: `${(scaled.borderPx * 13) / 16}rem`,
        ...(position === "right" ? { right: "0" } : { left: "0" }),
        transform: `translateY(50%)`,
        zIndex: 5,
      }}
    >
      {/*Bara orizontala top*/}
      <div
        style={{
          position: "absolute",
          top: 0,
          ...(position === "right" ? { right: "0" } : { left: "0" }),
          width: `${scaled.borderPx / 16}rem`,
          height: `${scaled.borderPx / 16}rem`,
          backgroundColor: profileColor,
        }}
      />
      {/*Bara verticala*/}
      <div
        style={{
          position: "absolute",
          width: `${scaled.borderPx / 16}rem`,
          height: "100%",
          backgroundColor: profileColor,
          bottom: "0",
          ...(position === "right" ? { right: "100%" } : { left: "100%" }),
        }}
      />
      {/*Bara orizontala bottom*/}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          ...(position === "right" ? { right: "0" } : { left: "0" }),
          width: `${scaled.borderPx / 16}rem`,
          height: `${scaled.borderPx / 16}rem`,
          backgroundColor: profileColor,
        }}
      />
    </div>
  );
};

export const PullHandle448 = ({ scaled, position, profileColor }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: `${(scaled.borderPx * 52) / 16}rem`,
        pointerEvents: "none",
        width: `${scaled.borderPx / 16}rem`,
        height: `${(scaled.borderPx * 20) / 16}rem`,
        ...(position === "right" ? { right: "0" } : { left: "0" }),
        transform: `translateY(50%)`,
        zIndex: 5,
      }}
    >
      {/*Bara orizontala top*/}
      <div
        style={{
          position: "absolute",
          top: 0,
          ...(position === "right" ? { right: "0" } : { left: "0" }),
          width: `${scaled.borderPx / 16}rem`,
          height: `${scaled.borderPx / 16}rem`,
          backgroundColor: profileColor,
        }}
      />
      {/*Bara verticala*/}
      <div
        style={{
          position: "absolute",
          width: `${scaled.borderPx / 16}rem`,
          height: "100%",
          backgroundColor: profileColor,
          bottom: "0",
          ...(position === "right" ? { right: "100%" } : { left: "100%" }),
        }}
      />
      {/*Bara orizontala bottom*/}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          ...(position === "right" ? { right: "0" } : { left: "0" }),
          width: `${scaled.borderPx / 16}rem`,
          height: `${scaled.borderPx / 16}rem`,
          backgroundColor: profileColor,
        }}
      />
    </div>
  );
};

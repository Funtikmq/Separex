function TopBar({ category, mountType, scaledWidth, selectedType, borderPx }) {
  if (category === "Sliding Doors") {
    const isOnWall = mountType === "On wall";

    return (
      <div
        style={{
          maxWidth: "900px",
          position: "absolute",
          top: `${isOnWall ? -borderPx / 16 : -(borderPx * 2.2) / 16}rem`,
          right: selectedType === "1-Part Element" && !isOnWall ? "0" : "50%",
          transform:
            selectedType === "1-Part Element" && !isOnWall
              ? "translateX(0%)"
              : "translateX(50%)",
          height: `${(2 * borderPx) / 16}rem`,
          width: `${isOnWall ? scaledWidth / 15 : (scaledWidth * 2) / 15}rem`,
          background:
            "linear-gradient(225deg, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0.66) 100%)",
          zIndex: 2,
        }}
      />
    );
  }
  return null;
}

export default TopBar;

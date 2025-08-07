function TopBar({ category, mountType, selectedType, borderPx, profileColor }) {
  if (category === "Sliding Doors") {
    const isOnWall = mountType === "In wall";

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
          width: isOnWall ? `100%` : `200%`,
          background:
            profileColor === "#f4f4f4"
              ? "linear-gradient(225deg, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0.66) 100%)"
              : "linear-gradient(225deg, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0.66) 100%)",

          zIndex: 2,
        }}
      />
    );
  }
  return null;
}

export default TopBar;

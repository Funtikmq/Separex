import Section from "./Section.jsx";

function SectionRenderer({ selectedType, scaled, sectionCount, selectedIndex, onClick }) {
  const sections = [];
  const bg = (i) =>
    selectedIndex === i
      ? "#555"
      : "transparent";

  if (selectedType === "2-Part Element O") {
    for (let i = 0; i < 2; i++) {
      sections.push(
        <Section
          key={i}
          index={i}
          total={2}
          onClick={() => onClick(i)}
          style={{
            position: "absolute",
            top: `${i * 50}%`,
            left: 0,
            width: "100%",
            height: "50%",
            borderBottom: i === 0 ? `${scaled.borderPx}px solid #222` : "0",
            background: bg(i),
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        />
      );
    }
  }

  else if (selectedType === "4-Part Element O") {
    for (let i = 0; i < 4; i++) {
      const row = Math.floor(i / 2);
      const col = i % 2;
      sections.push(
        <Section
          key={i}
          index={i}
          total={4}
          onClick={() => onClick(i)} 
          style={{
            position: "absolute",
            top: `${row * 50}%`,
            left: `${col * 50}%`,
            width: "50%",
            height: "50%",
            borderRight: col === 0 ? `${scaled.borderPx}px solid #222` : "0",
            borderBottom: row === 0 ? `${scaled.borderPx}px solid #222` : "0",
            background: bg(i),
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        />
      );
    }
  }

  else if (/^\d+-Part Element A$/.test(selectedType)) {
    const total = parseInt(selectedType.match(/^(\d+)-Part/)[1]);
    const rest = total - 1;

    sections.push(
      <Section
        key={0}
        index={0}
        total={total}
        onClick={() => onClick(0)} 
        style={{
          position: "absolute",
          top: "0%",
          left: 0,
          width: "100%",
          height: "30%",
          borderBottom: `${scaled.borderPx}px solid #222`,
          background: bg(0),
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      />
    );

    for (let i = 0; i < rest; i++) {
      sections.push(
        <Section
          key={i + 1}
          index={i + 1}
          total={total}
          onClick={() => onClick(i + 1)} 
          style={{
            position: "absolute",
            top: "30%",
            left: `${(i * 100) / rest}%`,
            width: `${100 / rest}%`,
            height: "70%",
            borderRight: i < rest - 1 ? `${scaled.borderPx}px solid #222` : "0",
            background: bg(i + 1),
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        />
      );
    }
  }

  else {
    for (let i = 0; i < sectionCount; i++) {
      sections.push(
        <Section
          key={i}
          index={i}
          total={sectionCount}
          onClick={() => onClick(i)} 
          style={{
            width: `${100 / sectionCount}%`,
            height: "100%",
            float: "left",
            borderRight: i === sectionCount - 1 ? "0" : `${scaled.borderPx}px solid #222`,
            background: bg(i),
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        />
      );
    }
  }

  return <>{sections}</>;
}

export default SectionRenderer;

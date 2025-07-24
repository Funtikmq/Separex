import SectionAxis from "./SectionAxis";

function Section({
  style,
  onClick,
  children,
  selectedType,
  sectionCount,
  index,
  doorDimensions,
  sectionDimensions,
}) {
  return (
    <div className="doorSection" style={style} onClick={onClick}>
      {children}
      <SectionAxis
        selectedType={selectedType}
        index={index}
        doorDimensions={doorDimensions}
        sectionDimensions={sectionDimensions}
        sectionCount={sectionCount}
      />
    </div>
  );
}

export default Section;

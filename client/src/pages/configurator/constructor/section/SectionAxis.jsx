function SectionAxis({
  selectedType,
  index,
  doorDimensions,
  sectionDimensions,
  sectionCount,
}) {
  // 4-Part Element O:
  if (selectedType && selectedType.includes("4-Part Element O")) {
    if (index === 0) {
      // stânga sus: verticală
      return (
        <>
          <div className="sectionAxis sectionAxisY">
            <span className="sectionAxisLabel">{sectionDimensions[index]}</span>
          </div>
        </>
      );
    }

    if (index === 2) {
      // stânga jos: verticala + orizontala
      return (
        <>
          <div className="sectionAxis sectionAxisY">
            <span className="sectionAxisLabel">
              {doorDimensions.height - sectionDimensions[0]}
            </span>
          </div>
          <div className="sectionAxis sectionAxisX">
            <span className="sectionAxisLabel">{sectionDimensions[index]}</span>
          </div>
        </>
      );
    }
    if (index === 3) {
      // stânga jos și dreapta jos: orizontală
      return (
        <>
          <div className="sectionAxis sectionAxisX">
            <span className="sectionAxisLabel">{sectionDimensions[3]}</span>
          </div>
          <div className="sectionAxis sectionAxisX">
            <span className="sectionAxisLabel">{sectionDimensions[3]}</span>
          </div>
        </>
      );
    }
    // index 1:
    return null;
  }

  // X-Part Element A:
  if (selectedType && selectedType.includes("Part Element A")) {
    if (index === 0) {
      return (
        <div className="sectionAxis sectionAxisY">
          <span className="sectionAxisLabel">{sectionDimensions[index]}</span>
        </div>
      );
    }
    if (index === 1) {
      return (
        <>
          <div className="sectionAxis sectionAxisY">
            <span className="sectionAxisLabel">
              {doorDimensions.height - sectionDimensions[0]}
            </span>
          </div>
          <div className="sectionAxis sectionAxisX">
            <span className="sectionAxisLabel">{sectionDimensions[index]}</span>
          </div>
          <div className="sectionAxis sectionAxisY">
            <span className="sectionAxisLabel">
              {doorDimensions.height - sectionDimensions[0]}
            </span>
          </div>
          <div className="sectionAxis sectionAxisX">
            <span className="sectionAxisLabel">{sectionDimensions[index]}</span>
          </div>
        </>
      );
    }
    if (index > 1) {
      return (
        <div className="sectionAxis sectionAxisX">
          <span className="sectionAxisLabel">{sectionDimensions[index]}</span>
        </div>
      );
    }
  }

  // 2-Part Element O:
  if (selectedType && selectedType.includes("2-Part Element O")) {
    return (
      <>
        <div className="sectionAxis sectionAxisY">
          <span className="sectionAxisLabel">{sectionDimensions[index]}</span>
        </div>
        <div className="sectionAxis sectionAxisY">
          <span className="sectionAxisLabel">{sectionDimensions[index]}</span>
        </div>
      </>
    );
  }
  // Default
  if (selectedType && selectedType.includes("Part Element")) {
    if (sectionCount !== 1) {
      return (
        <div className="sectionAxis sectionAxisX">
          <span className="sectionAxisLabel">{sectionDimensions[index]}</span>
        </div>
      );
    }
  }

  return null;
}

export default SectionAxis;

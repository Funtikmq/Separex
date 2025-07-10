function SectionAxis({ selectedType, index }) {
  // 4-Part Element O: axe doar pe anumite secțiuni
  if (selectedType && selectedType.includes("4-Part Element O")) {
    if (index === 0) {
      // stânga sus: verticală + orizontală
      return (
        <>
          <div className="sectionAxis sectionAxisVertical" />
        </>
      );
    }

    if (index === 2) {
        // stânga jos: verticala + orizontala
        return (
          <>
          <div className="sectionAxis sectionAxisVertical" />
          <div className="sectionAxis sectionAxisHorizontal" />
          </>
        )
        ;
      }
    if (index === 2 || index === 3) {
      // stânga jos și dreapta jos: orizontală
      return (
        <div className="sectionAxis sectionAxisHorizontal" />
      )
      ;
    }
    // index 1: nimic
    return null;
  }

  // X-Part Element A: index 0 verticală, index 1 verticală+orizontală
  if (selectedType && selectedType.includes("Part Element A")) {
    if (index === 0) {
      return <div className="sectionAxis sectionAxisVertical" />;
    }
    if (index === 1) {
      return (
        <>
          <div className="sectionAxis sectionAxisVertical" />
          <div className="sectionAxis sectionAxisHorizontal" />
        </>
      );
    }
    if (index > 1) {
      return <div className="sectionAxis sectionAxisHorizontal" />;
    }
  }

  // 2-Part Element O: două verticale pe fiecare secțiune
  if (selectedType && selectedType.includes("2-Part Element O")) {
    return (
      <>
        <div className="sectionAxis sectionAxisVertical" />
      </>
    );
  }

  // Orice alt Part Element: doar orizontală
  if (selectedType && selectedType.includes("Part Element")) {
    return <div className="sectionAxis sectionAxisHorizontal" />;
  }

  return null;
}

export default SectionAxis;
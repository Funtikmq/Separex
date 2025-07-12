import React from 'react';

const SectionInputs = ({
  selectedType,
  selectedCategory,
  safeSectionDimensions,
  handleSectionChange,
  handleSectionConfirm,
  sectionCount
}) => {
  const renderTwoPartElementO = () => (
    <>
      <div className="inputGroup">
        <h2>Top Section </h2>
        <div className="inputWithButtons">
          <input
            type="number"
            value={safeSectionDimensions[0]}
            onChange={(e) => handleSectionChange(0, e.target.value)}
            onBlur={() => handleSectionConfirm(0)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSectionConfirm(0);
              }
            }}
          />
        </div>
      </div>
      <div className="inputGroup">
        <h2>Bottom Section </h2>
        <div className="inputWithButtons">
          <input
            type="number"
            value={safeSectionDimensions[1]}
            readOnly
            disabled
          />
        </div>
      </div>
    </>
  );

  const renderFourPartElementO = () => (
    <>
      <div className="inputGroup">
        <h2>Left Width</h2>
        <div className="inputWithButtons">
          <input
            type="number"
            value={safeSectionDimensions[2] || ""}
            onChange={(e) => handleSectionChange(2, e.target.value)}
            onBlur={() => handleSectionConfirm(2)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSectionConfirm(2);
              }
            }}
          />
        </div>
      </div>
      <div className="inputGroup">
        <h2>Top Height</h2>
        <div className="inputWithButtons">
          <input
            type="number"
            value={safeSectionDimensions[0] || ""}
            onChange={(e) => handleSectionChange(0, e.target.value)}
            onBlur={() => handleSectionConfirm(0)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSectionConfirm(0);
              }
            }}
          />
        </div>
      </div>
    </>
  );

  const renderPartElementA = () => (
    <>
      <div className="inputGroup">
        <h2>Top Section </h2>
        <div className="inputWithButtons">
          <input
            type="number"
            value={safeSectionDimensions[0]}
            onChange={(e) => handleSectionChange(0, e.target.value)}
            onBlur={() => handleSectionConfirm(0)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSectionConfirm(0);
              }
            }}
          />
        </div>
      </div>
      {Array.from({ length: sectionCount - 1 }).map((_, idx) => (
        <div className="inputGroup" key={`section-${idx + 1}`}>
          <h2>Section {idx + 1} </h2>
          <div className="inputWithButtons">
            <input
              type="number"
              value={safeSectionDimensions[idx + 1] || ""}
              onChange={(e) => handleSectionChange(idx + 1, e.target.value)}
              onBlur={() => handleSectionConfirm(idx + 1)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSectionConfirm(idx + 1);
                }
              }}
            />
          </div>
        </div>
      ))}
    </>
  );

  const renderDefaultSections = () => (
    <>
      {Array.from({ length: sectionCount }).map((_, idx) => (
        <div className="inputGroup" key={`section-${idx}`}>
          <h2>Section {idx + 1} </h2>
          <div className="inputWithButtons">
            <input
              type="number"
              value={safeSectionDimensions[idx] || ""}
              onChange={(e) => handleSectionChange(idx, e.target.value)}
              onBlur={() => handleSectionConfirm(idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSectionConfirm(idx);
                }
              }}
              readOnly={selectedCategory === "Sliding Doors"}
            />
          </div>
        </div>
      ))}
    </>
  );

  const renderSections = () => {
    switch (selectedType) {
      case "2-Part Element O":
        return renderTwoPartElementO();
      case "4-Part Element O":
        return renderFourPartElementO();
      default:
        return selectedType.includes("Part Element A")
          ? renderPartElementA()
          : renderDefaultSections();
    }
  };

  return (
    <div className="sectionDimensions">
      {renderSections()}
    </div>
  );
};

export default SectionInputs;
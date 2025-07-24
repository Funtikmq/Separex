function ConstructorInfo({
  doorDimensions,
  selectedCategory,
  slidingMountType,
  selectedType,
  sectionCount,
  sectionModels,
  sectionColors,
  selectedHandle,
  selectedIndex,
  sectionDimensions,
  sectionTypes,
}) {
  const handleConfirm = () => {
    const data = {
      doorDimensions,
      selectedCategory,
      slidingMountType,
      selectedType,
      sectionCount,
      sectionModels,
      sectionColors,
      selectedHandle,
      selectedIndex,
      sectionDimensions,
      sectionTypes,
    };

    localStorage.setItem("cartData", JSON.stringify(data));

    alert("Configuration Saved To Cart");
  };

  return (
    <div className="constructorFooter">
      <div className="constructorInfo">
        <div className="constructorInfoButtons">
          <button className="constructorButton" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
        <h4 className="constructorInfoText">System: {selectedCategory}</h4>
        <h4 className="constructorInfoText">
          Handles:{" "}
          {Array.isArray(selectedHandle)
            ? selectedHandle.join(" ")
            : selectedHandle}
        </h4>
        <h4 className="constructorInfoText">
          Dimensions: {doorDimensions.width} x {doorDimensions.height}{" "}
        </h4>
        <h4 className="constructorInfoText">
          Models:{" "}
          {Array.isArray(sectionModels)
            ? sectionModels.join("; ")
            : sectionModels}
        </h4>
        <h4 className="constructorInfoText">Type: {selectedType}</h4>
        <h4 className="constructorInfoText">
          Colors:{" "}
          {Array.isArray(sectionColors)
            ? sectionColors.join("; ")
            : sectionColors}
        </h4>
      </div>
    </div>
  );
}

export default ConstructorInfo;

import React from "react";
import * as Models from "../ModelOverlays.jsx";
import * as Handles from "../SectionHandles.jsx";

// 1. Model Components Object
export const modelComponents = {
  Line: Models.Line,
  "Line Inverted": Models.LineInverted,
  "Double Line": Models.DoubleLine,
  "Double Line Inverted": Models.DoubleLineInverted,
  "Triple Line": Models.TripleLine,
  "Triple Line Inverted": Models.TripleLineInverted,
  Simetry: Models.Simetry,
  Trio: Models.Trio,
  Quatro: Models.Quatro,
  Five: Models.Five,
  Trend: Models.Trend,
  Nordic: Models.Nordic,
  "Nordic Inverted": Models.NordicInverted,
  Punto: Models.Punto,
  "Punto Inverted": Models.PuntoInverted,
  Geos: Models.Geos,
  Geometry: Models.Geometry,
  Star: Models.Star,
  Diez: Models.Diez,
  Loft: Models.Loft,
  Nimbus: Models.Nimbus,
  Modern: Models.Modern,
  "Modern Inverted": Models.ModernInverted,
  Altus: Models.Altus,
  "Altus Inverted": Models.AltusInverted,
};

// 2. Model Component Helper
export const getModelComponent = (modelName) => {
  return modelComponents[modelName] || null;
};

// 3. Model Utility Function
export function getModelOverlay(modelName, scaled, doorDimensions) {
  if (!modelName || modelName === "Aero") return null;
  const Component = modelComponents[modelName];
  return Component
    ? React.createElement(Component, { scaled, doorDimensions })
    : null;
}

// 4. Color Styles Object
export const colorStyles = {
  Clear: {
    backgroundColor:
      "linear-gradient(225deg, rgba(150, 150, 150, 0.4) 30%, rgba(150,150,150,0.2) 100%)",
  },
  Frosted: {
    backgroundColor:
      "linear-gradient(90deg,rgba(255, 255, 255, 0.4) 30%,rgba(255,255,255,0.2) 100%)",
  },
  Grey: {
    backgroundColor:
      "linear-gradient(225deg, rgba(0, 0, 0, 0.4) 30%, rgba(100, 100, 100, 0.2) 100%)",
  },
  "Dark Grey": {
    backgroundColor:
      "linear-gradient(225deg, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.4) 100%)",
  },
  Bronze: {
    backgroundColor:
      "linear-gradient(225deg, rgba(205,125,50,0.4) 30%, rgba(255,215,160,0.2) 100%)",
  },
  Lacobel: {
    backgroundColor:
      "linear-gradient(225deg, rgba(255,255,255,0.9) 30%, rgba(230,230,230,0.9) 100%)",
  },
  Canelata: {
    backgroundColor: `repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 0px,
      rgba(255, 255, 255, 0.1) 2px,
      rgba(150, 150, 150, 0.1) 6px,
      rgba(150, 150, 150, 0.1) 9px
    )`,
  },
};

// 5. Utility Functions
export const getSectionColor = (sectionColors, index) =>
  colorStyles[sectionColors?.[index]] || colorStyles["Clear"];

// 6. Section Type Validation
export const isValidSectionType = (type) => {
  return (
    typeof type === "string" &&
    (type === "2-Part Element O" ||
      type === "4-Part Element O" ||
      /^\d+-Part Element A$/.test(type))
  );
};

// 7. Section Measurement Utilities
export const calculateSectionMeasurements = (dimensions, doorDimensions) => {
  if (!dimensions || !doorDimensions) return null;

  return {
    width: Math.round((dimensions.width * doorDimensions.width) / 100),
    height: Math.round((dimensions.height * doorDimensions.height) / 100),
  };
};

// 8. Handle Components Object
export const handleComponents = {
  "Handle With Lock": Handles.HandleWithLock,
  "Pull Handle 160": Handles.PullHandle160,
  "Pull Handle 288": Handles.PullHandle288,
  "Pull Handle 448": Handles.PullHandle448,
};

// 9. Handle Utility Function
export const getHandleOverlay = (
  handleType,
  scaled,
  index,
  sectionType,
  selectedCategory,
  sectionCount,
  slidingMountType
) => {
  if (!handleType || (Array.isArray(handleType) && handleType.length === 0)) {
    return null;
  }

  const handleName = Array.isArray(handleType) ? handleType[index] : handleType;

  if (!handleName || sectionType === "fixed") {
    return null;
  }

  let position = "left"; // fallback default

  // Logica suplimentara pentru Sliding Doors
  if (selectedCategory === "Sliding Doors") {
    if (slidingMountType === "On wall") {
      if (index === sectionCount - 1) {
        position = "left";
      } else {
        position = "right";
      }
    } else {
      if (index === sectionCount - 1) {
        position = "right";
      } else {
        position = "left";
      }
    }
  } else {
    // logica standard pentru Swing Doors etc
    position = sectionType === "left" ? "right" : "left";
  }

  const HandleComponent = handleComponents[handleName];
  if (HandleComponent) {
    return React.createElement(HandleComponent, {
      scaled,
      position,
    });
  }

  return null;
};

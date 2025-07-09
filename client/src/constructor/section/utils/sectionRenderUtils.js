// 1. Import Models
import * as Models from "../ModelOverlays.jsx";

// 2. Model Components Object
export const modelComponents = {
  Line: Models.Line,
  "Double Line": Models.DoubleLine,
  "Triple Line": Models.TripleLine,
  Simetry: Models.Simetry,
  Trio: Models.Trio,
  Quatro: Models.Quatro,
  Five: Models.Five,
  Trend: Models.Trend,
  Nordic: Models.Nordic,
  Punto: Models.Punto,
  Geos: Models.Geos,
  Geometry: Models.Geometry,
  Star: Models.Star,
  Diez: Models.Diez,
  Loft: Models.Loft,
  Nimbus: Models.Nimbus,
  Modern: Models.Modern,
  Altus: Models.Altus,
};

// 3. Color Styles Object
export const colorStyles = {
  Clear: { 
    backgroundColor: "linear-gradient(225deg, rgba(150, 150, 150, 0.4) 30%, rgba(150,150,150,0.2) 100%)" 
  },
  Frosted: { 
    backgroundColor: "linear-gradient(90deg,rgba(255, 255, 255, 0.4) 30%,rgba(255,255,255,0.2) 100%)" 
  },
  Grey: { 
    backgroundColor: "linear-gradient(225deg, rgba(100, 100, 100, 0.4) 30%, rgba(100, 100, 100, 0.2) 100%)" 
  },
  "Dark Grey": { 
    backgroundColor: "linear-gradient(225deg, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0.2) 100%)" 
  },
  Bronze: { 
    backgroundColor: "linear-gradient(225deg, rgba(205,125,50,0.4) 30%, rgba(255,215,160,0.2) 100%)" 
  },
  Lacobel: { 
    backgroundColor: "linear-gradient(225deg, rgba(255,255,255,0.9) 30%, rgba(230,230,230,0.9) 100%)" 
  },
  Canelata: {
    backgroundColor: `repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 0px,
      rgba(255, 255, 255, 0.1) 2px,
      rgba(150, 150, 150, 0.1) 6px,
      rgba(150, 150, 150, 0.1) 9px
    )`
  }
};

// 4. Utility Functions
export const getSectionColor = (sectionColors, index) =>
  colorStyles[sectionColors?.[index]] || colorStyles["Clear"];

// 5. Section Type Validation
export const isValidSectionType = (type) => {
  return typeof type === 'string' && (
    type === "2-Part Element O" ||
    type === "4-Part Element O" ||
    /^\d+-Part Element A$/.test(type)
  );
};

// 6. Model Component Helper
export const getModelComponent = (modelName) => {
  return modelComponents[modelName] || null;
};

// 7. Section Measurement Utilities
export const calculateSectionMeasurements = (dimensions, doorDimensions) => {
  if (!dimensions || !doorDimensions) return null;

  return {
    width: Math.round(dimensions.width * doorDimensions.width / 100),
    height: Math.round(dimensions.height * doorDimensions.height / 100)
  };
};
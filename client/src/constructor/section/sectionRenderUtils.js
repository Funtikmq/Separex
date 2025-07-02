// Funcții utilitare și constante pentru SectionRender
import * as Models from "./ModelOverlays.jsx";

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

export const colorStyles = {
  Clear: { backgroundColor: "linear-gradient(225deg, rgba(150, 150, 150, 0.4) 30%, rgba(150,150,150,0.2) 100%)" },
  Frosted: { backgroundColor: "linear-gradient(90deg,rgba(255, 255, 255, 0.4) 30%,rgba(255,255,255,0.2) 100%)" },
  Grey: { backgroundColor: "linear-gradient(225deg, rgba(100, 100, 100, 0.4) 30%, rgba(100, 100, 100, 0.2) 100%)" },
  "Dark Grey": { backgroundColor: "linear-gradient(225deg, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0.2) 100%)" },
  Bronze: { backgroundColor: "linear-gradient(225deg, rgba(205,125,50,0.4) 30%, rgba(255,215,160,0.2) 100%)" },
  Lacobel: { backgroundColor: "linear-gradient(225deg, rgba(255,255,255,0.9) 30%, rgba(230,230,230,0.9) 100%)" },
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

export const getSectionColor = (sectionColors, index) =>
  colorStyles[sectionColors && sectionColors[index]] || colorStyles["Clear"]; 
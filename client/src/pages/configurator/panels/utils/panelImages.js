import * as categoryIcons from "@assets/navPanels/categoryPanel";
import * as typeIcons from "@assets/navPanels/typePanel";
import * as modelIcons from "@assets/navPanels/modelPanel";
import * as colorIcons from "@assets/navPanels/colorPanel";
import * as handleIcons from "@assets/navPanels/handlePanel";

export const ICON_CATEGORYS = {
  "Swing Doors": categoryIcons.swingDoor,
  "Sliding Doors": categoryIcons.slidingDoor,
  "Fixed Wall": categoryIcons.fixedWall,
};

export const ICON_TYPES = {
  "Swing Doors": {
    "1-PART ELEMENT": typeIcons.swingOne,
    "2-PART ELEMENT": typeIcons.swingTwo,
    "2-PART ELEMENT O": typeIcons.swingTwoO,
    "3-PART ELEMENT": typeIcons.swingThree,
    "3-PART ELEMENT A": typeIcons.swingThreeA,
    "4-PART ELEMENT": typeIcons.swingFour,
    "4-PART ELEMENT A": typeIcons.swingFourA,
    "4-PART ELEMENT O": typeIcons.swingFourO,
    "5-PART ELEMENT A": typeIcons.swingFiveA,
    "6-PART ELEMENT A": typeIcons.swingSixA,
    "7-PART ELEMENT A": typeIcons.swingSevenA,
    "8-PART ELEMENT A": typeIcons.swingEightA,
  },
  "Fixed Wall": {
    "1-PART ELEMENT": typeIcons.fixedOne,
    "2-PART ELEMENT": typeIcons.fixedTwo,
    "3-PART ELEMENT": typeIcons.fixedThree,
    "4-PART ELEMENT": typeIcons.fixedFour,
    "5-PART ELEMENT": typeIcons.fixedFive,
    "6-PART ELEMENT": typeIcons.fixedSix,
    "7-PART ELEMENT": typeIcons.fixedSeven,
  },
  "Sliding Doors": {
    "1-PART ELEMENT": typeIcons.slidingOne,
    "2-PART ELEMENT IN": typeIcons.slidingTwo,
    "2-PART ELEMENT ON": typeIcons.slidingTwoOn,
    "3-PART ELEMENT": typeIcons.slidingThree,
    "4-PART ELEMENT": typeIcons.slidingFour,
  },
};

export const ICON_MODELS = {
  Aero: modelIcons.aero,
  Line: modelIcons.line,
  "Double Line": modelIcons.doubleLine,
  "Triple Line": modelIcons.tripleLine,
  Simetry: modelIcons.simetry,
  Trio: modelIcons.trio,
  Quatro: modelIcons.quatro,
  Five: modelIcons.five,
  Trend: modelIcons.trend,
  Nordic: modelIcons.nordic,
  Punto: modelIcons.punto,
  Geos: modelIcons.geos,
  Geometry: modelIcons.geometry,
  Star: modelIcons.star,
  Diez: modelIcons.diez,
  Loft: modelIcons.loft,
  Nimbus: modelIcons.nimbus,
  Modern: modelIcons.modern,
  "Modern Inverted": modelIcons.modernInverted,
  Altus: modelIcons.altus,
};

export const ICON_COLORS = {
  Clear: colorIcons.clear,
  Frosted: colorIcons.frosted,
  Grey: colorIcons.grey,
  "Dark Grey": colorIcons.darkGrey,
  Bronze: colorIcons.bronze,
  Lacobel: colorIcons.lacobel,
  Canelata: colorIcons.canelata,
};

export const ICON_HANDLES = {
  "Handle With Lock": handleIcons.handleWithLock,
  "Pull Handle 160": handleIcons.pull160,
  "Pull Handle 288": handleIcons.pull288,
  "Pull Handle 448": handleIcons.pull448,
};

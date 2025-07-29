import { TwoPartElementO } from "../layouts/TwoPartElementO";
import { FourPartElementO } from "../layouts/FourPartElementO";
import { XPartElementA } from "../layouts/XPartElementA";
import { DefaultSectionLayout } from "../layouts/DefaultSectionLayout";
import { SECTION_TYPES } from "../constants/sectionConstants";

export const getLayoutComponent = (selectedType) => {
  switch (selectedType) {
    case SECTION_TYPES.TWO_PART:
      return TwoPartElementO;
    case SECTION_TYPES.FOUR_PART:
      return FourPartElementO;
    case (selectedType.match(/^\d+-Part Element A$/) || {}).input:
      return XPartElementA;
    default:
      return DefaultSectionLayout;
  }
};

import * as layouts from '../SectionLayouts';
import { SECTION_TYPES } from '../constants/sectionConstants';

export const getLayoutComponent = (selectedType) => {
  switch(selectedType) {
    case SECTION_TYPES.TWO_PART:
      return layouts.TwoPartElementO;
    case SECTION_TYPES.FOUR_PART:
      return layouts.FourPartElementO;
    case (selectedType.match(/^\d+-Part Element A$/) || {}).input:
      return layouts.XPartElementA;
    default:
      return layouts.DefaultSectionLayout;
  }
};
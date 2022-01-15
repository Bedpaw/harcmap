import { store } from 'store';
import { MACROS } from 'utils/macros';

export interface PointCategoryAppearance {
  strokeColor: string,
  fillColor: string,
  shape: string,
}
const availableColors = {
  stroke: 'stroke',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
};
const availableShapes = {
  star: 'star',
  dot: 'dot',
};
function getColor (color: string): string {
  return store.getters['theme/colors'][color];
}
export const pointCategoryUtils = {
  getPointAppearance: (pointCategoryId: string, pointType = MACROS.pointType.permanent): PointCategoryAppearance => {
    const pointCategory = store.getters['event/getCategoryById'](pointCategoryId);
    return {
      strokeColor: getColor(pointCategory.strokeColor),
      fillColor: getColor(pointCategory.fillColor),
      shape: pointType === MACROS.pointType.permanent ? availableShapes.dot : availableShapes.star,
    };
  },
  availableColors,
  availableShapes,
};

import { store } from 'store';
import { MACROS } from 'utils/macros';
import { translator } from 'dictionary';
import { PointCategory } from 'models/point';

export interface PointCategoryAppearance {
  pointStrokeColor: string,
  pointFillColor: string,
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

function getCategoriesSelectOptions (categories: PointCategory[]) {
  return categories.map(category => {
    const { categoryName, categoryId, pointValue } = category;
    const unit = translator.t('general.pointUnit');
    return {
      label: `${categoryName} - ${pointValue} ${unit}`,
      value: categoryId,
    };
  });
}

function getPointAppearance (pointCategoryId: string, pointType = MACROS.pointType.permanent): PointCategoryAppearance {
  const pointCategory = store.getters['event/getCategoryById'](pointCategoryId);
  return {
    pointFillColor: pointCategory.pointFillColor,
    pointStrokeColor: pointCategory.pointStrokeColor,
    shape: pointType === MACROS.pointType.permanent ? availableShapes.dot : availableShapes.star,
  };
}

export const pointCategoryUtils = {
  getPointAppearance,
  getCategoriesSelectOptions,
  availableColors,
  availableShapes,
};

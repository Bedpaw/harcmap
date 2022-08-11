import { store } from 'store';
import { MACROS } from 'utils/macros';
import { translator } from 'dictionary';
import { PointCategory } from 'models/point';
import { api } from 'src/api';
import { colorsUtils } from './macros/colors';

export interface PointCategoryAppearance {
  pointStrokeColor: string,
  pointFillColor: string,
  shape: string,
}
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

function getPointAppearance (pointCategoryId: string, pointType = MACROS.pointType.permanent, pointDescription?: string | null): PointCategoryAppearance {
  const pointCategory = store.getters['event/getCategoryById'](pointCategoryId);
  // TODO Only for Nowy porządek świata event
  let pointStrokeColor = pointCategory.pointStrokeColor;
  if (pointDescription) {
    const changedPointColor = colorsUtils.getAllColorsSelectValues
      .find(obj => pointDescription.search(`#${obj.label}`) !== -1)?.value;
    pointStrokeColor = changedPointColor ?? pointCategory.pointStrokeColor;
  }
  return {
    pointFillColor: pointCategory.pointFillColor,
    pointStrokeColor,
    shape: pointType === MACROS.pointType.permanent ? availableShapes.dot : availableShapes.star,
  };
}

async function getDefaultCategoriesIfEmpty (categories: PointCategory[], eventId: string) {
  if (categories.length === 0) {
    const defaultCategory = await api.addPointCategory({
      pointValue: 1,
      pointFillColor: colorsUtils.appColors.red,
      categoryName: translator.t('general.defaultPointCategoryName'),
      pointStrokeColor: colorsUtils.appColors.black,
      categoryDescription: '',
    }, eventId);
    categories.push(<PointCategory>defaultCategory);
  }
  return categories;
}

export const pointCategoryUtils = {
  getPointAppearance,
  getCategoriesSelectOptions,
  getDefaultCategoriesIfEmpty,
  availableShapes,
};

import { DATE_FORMATS, displayDate } from 'utils/date';
import { PointType } from 'models/point';
import { materialIcons } from '@dbetka/vue-material-icons';
import { pointUtils } from 'utils/point';
import { store } from 'store';

const ICONS = materialIcons.names;

const getAllOptions = (point: PointType) => {
  const { pointName, pointAppearanceTime, pointExpirationTime, pointCategoryId, pointKey } = point;
  const categoryData = store.getters['event/getCategoryById'](pointCategoryId);
  return {
    cords: {
      icon: ICONS.place,
      value: pointUtils.getLonLatAsString(point),
    },
    title: {
      icon: ICONS.title,
      value: pointName,
    },
    appearanceTime: {
      icon: ICONS.watch_later,
      value: displayDate.inFormat(pointAppearanceTime, DATE_FORMATS.HHmmDDMMYYYY),
    },
    expirationTime: {
      icon: ICONS.history_toggle_off,
      value: displayDate.inFormat(pointExpirationTime, DATE_FORMATS.HHmmDDMMYYYY),
    },
    categoryName: {
      icon: ICONS.category,
      value: categoryData.categoryName,
    },
    categoryValue: {
      icon: ICONS.star_rate,
      value: categoryData.pointValue,
    },
    pointKey: {
      icon: ICONS.vpn_key,
      value: pointKey,
    },
  };
};

const getTimeoutOptions = (point: PointType) => {
  const { cords, title, appearanceTime, expirationTime, categoryName, categoryValue } = getAllOptions(point);
  return [
    cords,
    title,
    appearanceTime,
    expirationTime,
    categoryName,
    categoryValue,
  ].filter(details => details.value);
};

const getPermamentOptions = (point: PointType) => {
  const { cords, title, categoryName, categoryValue, pointKey } = getAllOptions(point);
  return [
    cords,
    title,
    categoryName,
    categoryValue,
    pointKey,
  ].filter(details => details.value);
};
const getPointOptions = (point: PointType) => {
  return pointUtils.isPermanent(point)
    ? getPermamentOptions(point)
    : getTimeoutOptions(point);
};

export const mapPointPopupConfig = {
  getPointOptions,
};

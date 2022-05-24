import { DATE_FORMATS, displayDate } from 'utils/date';
import { PointType } from 'models/point';
import { materialIcons } from '@dbetka/vue-material-icons';
import { pointUtils } from 'utils/point';
import { store } from 'store';
import { Team } from 'models/team';

const ICONS = materialIcons.names;

const getAllOptions = (point: PointType) => {
  const {
    pointName,
    pointAppearanceTime,
    pointExpirationTime,
    pointCollectionTime,
    pointCategoryId,
    pointKey,
    pointId,
  } = point;
  const categoryData = store.getters['event/getCategoryById'](pointCategoryId);
  const teams = store.getters['groups/teams'] as Team[];
  const teamWhoCollectThisPoint = teams.find(team => team.collectedPoints.some(p => p === pointId)) ?? null;

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
    collectedBy: {
      icon: ICONS.group,
      value: teamWhoCollectThisPoint?.teamName,
      style: { color: teamWhoCollectThisPoint?.teamColor },
    },
    collectionTime: {
      icon: ICONS.alarm,
      value: pointCollectionTime ? displayDate.inFormat(pointCollectionTime, DATE_FORMATS.HHmmDDMMYYYY) : null,
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

const getPermanentOptions = (point: PointType) => {
  const {
    cords,
    title,
    categoryName,
    categoryValue,
    pointKey,
    collectedBy,
    collectionTime,
  } = getAllOptions(point);
  return [
    cords,
    title,
    categoryName,
    categoryValue,
    pointKey,
    collectedBy,
    collectionTime,
  ].filter(details => details.value);
};
const getPointOptions = (point: PointType) => {
  return pointUtils.isPermanent(point)
    ? getPermanentOptions(point)
    : getTimeoutOptions(point);
};

export const mapPointPopupConfig = {
  getPointOptions,
};

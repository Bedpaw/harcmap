import { MACROS } from 'utils/macros';
import { compareDate, isBeforeLastGapEndTime, sortObjectsListByTime } from 'utils/date';
import { generalConfigUtils } from 'src/config/general-config';
import { userUtils } from 'config/users-config';

const { isActual, isPast, isFuture, isToday } = compareDate;
const { timePeriods, order, pointType: pointTypes } = MACROS;

const listUtils = {
  sortPointsAscending: (pointsList) => sortObjectsListByTime(pointsList, 'pointExpirationTime', order.ascending),
  isPointIdOnList: (pointsList, { pointId }) => pointsList.includes(pointId),
  getTodayPoints: (pointsList) => pointsList.filter(point => isToday(point.pointAppearanceTime)),
};

const timeUtils = {
  isTimeoutActive: ({
    pointAppearanceTime,
    pointExpirationTime,
  }) => isActual(pointAppearanceTime, pointExpirationTime),
  isFuture: ({ pointAppearanceTime }) => isFuture(pointAppearanceTime),
  isPast: ({ pointExpirationTime }) => isPast(pointExpirationTime),
  isPermanent: ({ pointType }) => pointType === pointTypes.permanent,
  isTimeOut: ({ pointType }) => pointType === pointTypes.timeout,
};

const stateUtils = {
  pointIsNotCollected: ({ pointCollectionTime }) => pointCollectionTime === null,
  pointIsCollected: ({ pointCollectionTime }) => pointCollectionTime !== null,
  hasSetPosition: ({
    pointLatitude,
    pointLongitude,
  }) => pointLatitude !== null && pointLongitude !== null,
};

export const pointUtils = {
  ...listUtils,
  ...timeUtils,
  ...stateUtils,
  getLonLatAsString: ({ pointLatitude, pointLongitude }) => pointLatitude.toFixed(5) + ',' + pointLongitude.toFixed(5),
  getTimeClass (point) {
    if (this.isFuture(point)) return 'f-future-point';
    if (this.isTimeoutActive(point)) return 'f-active-point';
    else return 'f-disabled-point';
  },
  getTimeIcon ({
    pointAppearanceTime,
    pointExpirationTime,
  }) {
    let timePeriod = timePeriods.isCurrent;

    if (this.isFuture({ pointAppearanceTime })) {
      timePeriod = timePeriods.isFuture;
    }
    if (this.isPast({ pointExpirationTime })) {
      timePeriod = timePeriods.isPast;
    }
    return generalConfigUtils.getIconByTimePeriod(timePeriod);
  },
  pointIsVisibleOnMap (point, {
    hiddenPointId,
    pointsCollectedByUser,
    mapRefreshTime,
  }) {
    const {
      pointId,
      pointCollectionTime,
    } = point;

    // Hide if it's hide point
    if (pointId === hiddenPointId) return false;

    // Admin can see all points on map
    if (userUtils.can.seeAllPointsOnMap()) return true;

    if (this.isPermanent(point)) {
      // Point is not collected
      if (this.pointIsNotCollected(point)) return true;

      // Display points collected by user
      if (this.isPointIdOnList(pointsCollectedByUser, point)) return true;

      // Point is permanent and collected, but user don't know it to next gap time
      // Gap time is last full time from mapRefreshTime counting from full hours
      return isBeforeLastGapEndTime(mapRefreshTime, pointCollectionTime) === false;
    }
    return this.isTimeoutActive(point);
  },

};

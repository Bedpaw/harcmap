import { MACROS } from 'utils/macros';
import { compareDate, displayDate, getDate, isBeforeLastGapEndTime, sortObjectsListByTime } from 'utils/date';
import { generalConfigUtils } from 'src/config/general-config';
import { userUtils } from 'config/users-config';
import { store } from 'store';
import { hashtags } from 'utils/macros/hashtags';

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
  convertPointToForm (oldData) {
    const data = { ...oldData };
    if (oldData.pointExpirationTime && oldData.pointAppearanceTime) {
      data.pointExpirationTime = getDate.fromTimestamp(oldData.pointExpirationTime);
      data.pointAppearanceTime = getDate.fromTimestamp(oldData.pointAppearanceTime);
    }
    return data;
  },
  convertPointToSend (oldData) {
    const data = { ...oldData };
    if (oldData.pointExpirationTime && oldData.pointAppearanceTime) {
      data.pointExpirationTime = displayDate.inTimestamp(oldData.pointExpirationTime);
      data.pointAppearanceTime = displayDate.inTimestamp(oldData.pointAppearanceTime);
    }
    return data;
  },
  pointIsVisibleOnMap (point, hiddenPointId) {
    // Hide if it's hide point (point edit mode)
    if (point.pointId === hiddenPointId) return false;

    // Admin can see all points on map
    if (userUtils.can.seeAllPointsOnMap()) return true;

    // TODO Temporary for event!
    if (point.pointDescription) {
      const search = (tag) => point.pointDescription.search(tag) !== -1;
      const eventEnd = store.getters['event/event'].eventEndDate;
      const oneHourInMs = 3600000;
      const now = new Date().getTime();
      const { little, normal, very } = hashtags.late;

      if (search('#' + little.label)) return now + little.time * oneHourInMs > eventEnd;
      else if (search('#' + very.label)) return now + very.time * oneHourInMs > eventEnd;
      else if (search('#' + normal.label)) return now + normal.time * oneHourInMs > eventEnd;
    }

    // Permanent points are always visible
    if (this.isPermanent(point)) return true;

    // Timeout are only visible in their active time
    return this.isTimeoutActive(point);
  },

  pointIsDisplayedAsCollected (point, { pointsCollectedByTeam, mapRefreshTime }) {
    // Status: All points
    // Filter: Timeout points always not collected
    if (pointUtils.isTimeOut(point)) return false;
    // Status: All permanent points
    // Filter: Point is not collected
    if (this.pointIsNotCollected(point)) return false;
    // Status: All permanent collected points
    // Filter: Admin can see all collected points on map without time delay
    if (userUtils.can.seeAllPointsOnMap()) return true;
    // Status: All permanent collected points seen by common user
    // Filter: Point collected by team and is displayed as collected immediately
    if (this.isPointIdOnList(pointsCollectedByTeam, point)) return true;
    // Status: Permanent collected points seen by common user, but not collected by him
    // Filter: Point is permanent and collected, but team don't know it to next gap time
    // Gap time is last full time from mapRefreshTime counting from full hours
    return isBeforeLastGapEndTime(mapRefreshTime, point.pointCollectionTime) === true;
  },

};

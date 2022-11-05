import { MACROS } from 'utils/macros';
import { compareDate, displayDate, getDate, isBeforeLastGapEndTime, sortObjectsListByTime } from 'utils/date';
import { generalConfigUtils } from 'src/config/general-config';
import { userUtils } from 'config/users-config';
import { PointType } from 'models/point';

const { isActual, isPast, isFuture, isToday } = compareDate;
const { timePeriods, order, pointType: pointTypes } = MACROS;

const listUtils = {
  sortPointsAscending: (pointsList: Record<string, number>[]) => sortObjectsListByTime(pointsList, 'pointExpirationTime', order.ascending),
  isPointIdOnList: (pointsList: string[], { pointId }: Partial<PointType>) => pointsList.includes(pointId!),
  getTodayPoints: (pointsList: Partial<Partial<PointType>>[]) => pointsList.filter(point => isToday(point.pointAppearanceTime)),
};

const timeUtils = {
  isTimeoutActive: ({
    pointAppearanceTime,
    pointExpirationTime,
  }: Partial<PointType>) => isActual(pointAppearanceTime, pointExpirationTime),
  isFuture: ({ pointAppearanceTime }: Partial<PointType>) => isFuture(pointAppearanceTime),
  isPast: ({ pointExpirationTime }: Partial<PointType>) => isPast(pointExpirationTime),
  isPermanent: ({ pointType }: Partial<PointType>) => pointType === pointTypes.permanent,
  isTimeOut: ({ pointType }: Partial<PointType>) => pointType === pointTypes.timeout,
};

const stateUtils = {
  pointIsNotCollected: ({ pointCollectionTime }: Partial<PointType>) => pointCollectionTime === null,
  pointIsCollected: ({ pointCollectionTime }: Partial<PointType>) => pointCollectionTime !== null,
  hasSetPosition: ({
    pointLatitude,
    pointLongitude,
  }: Partial<PointType>) => pointLatitude !== null && pointLongitude !== null,
};

export const pointUtils = {
  ...listUtils,
  ...timeUtils,
  ...stateUtils,
  getLonLatAsString: ({ pointLatitude, pointLongitude }: Partial<PointType>) => pointLatitude!.toFixed(5) + ',' + pointLongitude!.toFixed(5),
  getTimeClass (point: Partial<PointType>) {
    if (this.isFuture(point)) return 'f-future-point';
    if (this.isTimeoutActive(point)) return 'f-active-point';
    else return 'f-disabled-point';
  },
  getTimeIcon ({
    pointAppearanceTime,
    pointExpirationTime,
  }: Partial<PointType>) {
    let timePeriod = timePeriods.isCurrent;

    if (this.isFuture({ pointAppearanceTime }))
      timePeriod = timePeriods.isFuture;

    if (this.isPast({ pointExpirationTime }))
      timePeriod = timePeriods.isPast;

    return generalConfigUtils.getIconByTimePeriod(timePeriod);
  },
  convertPointToForm (oldData: {pointExpirationTime: number, pointAppearanceTime: number}) {
    const data = { ...oldData };
    if (oldData.pointExpirationTime && oldData.pointAppearanceTime) {
      data.pointExpirationTime = getDate.fromTimestamp(oldData.pointExpirationTime) as unknown as number;
      data.pointAppearanceTime = getDate.fromTimestamp(oldData.pointAppearanceTime) as unknown as number;
    }
    return data;
  },
  convertPointToSend (oldData: {pointExpirationTime: number, pointAppearanceTime: number}) {
    const data = { ...oldData };
    if (oldData.pointExpirationTime && oldData.pointAppearanceTime) {
      data.pointExpirationTime = displayDate.inTimestamp(oldData.pointExpirationTime) as unknown as number;
      data.pointAppearanceTime = displayDate.inTimestamp(oldData.pointAppearanceTime) as unknown as number;
    }
    return data;
  },
  pointIsVisibleOnMap (point: Partial<PointType>, hiddenPointId: string, role: string) {
    // Hide if it's hide point (point edit mode)
    if (point.pointId === hiddenPointId) return false;

    // Admin can see all points on map
    if (userUtils.can.seeAllPointsOnMap(role)) return true;

    // Permanent points are always visible
    if (this.isPermanent(point)) return true;

    // Timeout are only visible in their active time
    return this.isTimeoutActive(point);
  },

  pointIsDisplayedAsCollected (
    point: Partial<PointType>,
    role: string,
    { pointsCollectedByTeam, mapRefreshTime }: { pointsCollectedByTeam: string[], mapRefreshTime: number },
    currentTime?: any,
  ) {
    // Status: All points
    // Filter: Timeout points always not collected
    if (pointUtils.isTimeOut(point)) return false;
    // Status: All permanent points
    // Filter: Point is not collected
    if (this.pointIsNotCollected(point)) return false;
    // Status: All permanent collected points
    // Filter: Admin can see all collected points on map without time delay
    if (userUtils.can.seeAllPointsOnMap(role)) return true;
    // Status: All permanent collected points seen by common user
    // Filter: Point collected by team and is displayed as collected immediately
    if (this.isPointIdOnList(pointsCollectedByTeam, point)) return true;
    // Status: Permanent collected points seen by common user, but not collected by him
    // Filter: Point is permanent and collected, but team don't know it to next gap time
    // Gap time is last full time from mapRefreshTime counting from full hours
    return isBeforeLastGapEndTime(mapRefreshTime as number, point.pointCollectionTime!, currentTime) === true;
  },

};

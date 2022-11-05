import { MACROS } from 'utils/macros';
import * as dayjs from 'dayjs';
import { DateType } from 'src/models/date';

const { secondsInMinute, msInSeconds, minutesInHour } = MACROS.time;

export const DATE_FORMATS = {
  YYYYMMDD: 'YYYY-MM-DD',
  YYYYMMDDTHHmm: 'YYYY-MM-DDTHH:mm',
  DDMMYYYY: 'DD.MM.YYYY',
  DDMMYYYYHHmm: 'DD.MM.YYYY HH:mm',
  HHmmDDMMYYYY: 'HH:mm DD.MM.YYYY',
  HHmm: 'HH:mm',
  HH: 'HH',
  mm: 'mm',
  ss: 'ss',
};

export const compareDate: Record<string, (startDate: DateType, endDate?: DateType) => boolean> = {
  isFuture: (date) => dayjs().isBefore(date),
  isPast: (date) => dayjs().isAfter(date),
  isAfter: (edgeDate, dateToCheck) => dayjs(dateToCheck).isAfter(edgeDate),
  isActual: (startDate, endDate: DateType) => dayjs(dayjs()).isBetween(startDate, endDate),
  isToday: (date) => dayjs(date).isToday(),
};

export const displayDate = {
  inFormat: (date: DateType, format = DATE_FORMATS.DDMMYYYY) => dayjs(date).format(format),
  inTimestamp: (date: DateType) => dayjs(date).valueOf(),
  relativeToInCalendarFormat: (date: DateType) => dayjs(date).calendar(),
  asDuration: (date: number) => dayjs.duration(date, 'seconds').humanize(),
  timeRange: (from: string, to: string, separator = ' - '): string => {
    if (from === to)
      return from;

    return from + separator + to;
  },
};

export const getDate = {
  fromFormat: (date: DateType, format = DATE_FORMATS.DDMMYYYY): dayjs.Dayjs => dayjs(date, format),
  fromTimestamp: (date: DateType): dayjs.Dayjs => dayjs(date),
  secondsAfterFull: (date = dayjs()): number => Number(dayjs(date).format(DATE_FORMATS.ss)),
  minutesAfterFull: (date = dayjs()): number => Number(dayjs(date).format(DATE_FORMATS.mm)),
  secondsToFull: (date = dayjs()): number => secondsInMinute - Number(dayjs(date).format(DATE_FORMATS.ss)),
  minutesToFull: (date = dayjs()): number => minutesInHour - Number(dayjs(date).format(DATE_FORMATS.mm)),
};
export const timeUnitConversion = {
  msToSeconds: (seconds: number): number => seconds * msInSeconds,
};

function isCurrentHour (timeToCompare: DateType) {
  if (!compareDate.isToday(timeToCompare))
    return false;
  else {
    const currentHour = dayjs().hour();
    const hourToCompare = dayjs(timeToCompare).hour();
    if (currentHour === hourToCompare) return true;
  }
}

export function isBeforeLastGapEndTime (refreshIntervalInSeconds: number, timeToCompare: number): boolean {
  /**
   * Name = example value | [possible range]
   *
   * mapRefreshTimeInMinutes = 15 | [any divider of 60 -> 1,2,3,4,5,6,12,15,30,60]
   *
   * minutesAfterFull = 37 | [0-59]
   *
   * minutesAfterLastGapTime = 7 | [0 - mapRefreshTimeInMinutes]
   *
   * lastGapEndTime = 30 | [
   * any multiplier of mapRefreshTimeInMinutes up to 60
   * for mapRefreshTimeInMinutes = 15 => [0, 15, 30, 45]
   * for mapRefreshTimeInMinutes = 10 => [0, 10, 20, 30, 40, 50]
   * ]
   * */
  if (isCurrentHour(timeToCompare) === false) {
    // At full hour is always update, we need to check only if hour is the same;
    return true;
  }
  const mapRefreshTimeInMinutes = refreshIntervalInSeconds / secondsInMinute;
  const minutesAfterLastGapTime = getDate.minutesAfterFull() % mapRefreshTimeInMinutes;
  const lastGapEndTime = getDate.minutesAfterFull() - minutesAfterLastGapTime;

  const minuteOfCompareTime = dayjs(timeToCompare).minute();

  return minuteOfCompareTime < lastGapEndTime;
}

export function getTimeComponents (date = dayjs()): string[] {
  const hours = displayDate.inFormat(date, DATE_FORMATS.HH);
  const minutes = displayDate.inFormat(date, DATE_FORMATS.mm);
  const seconds = displayDate.inFormat(date, DATE_FORMATS.ss);
  return [seconds, minutes, hours];
}

export const sortObjectsListByTime = <T extends Record<string, number>, Key extends keyof T> (objectsList: T[], timeKey: Key, order = MACROS.order.ascending) => {
  if (order === MACROS.order.ascending) return objectsList.sort((a, b) => a[timeKey] - b[timeKey]);
  else if (order === MACROS.order.descending) return objectsList.sort((a, b) => b[timeKey] - a[timeKey]);
};

export const splitObjectsListByTime = <T extends Record<string, DateType>, Key extends keyof T>(objectsList: T[], startDateKey: Key, endDateKey: Key) => {
  const isPast: T[] = [];
  const isCurrent: T[] = [];
  const isFuture: T[] = [];

  objectsList.forEach(obj => {
    const startDate = obj[startDateKey];
    const endDate = obj[endDateKey];
    if (compareDate.isActual(startDate, endDate))
      isCurrent.push(obj);
    else if (compareDate.isFuture(startDate))
      isFuture.push(obj);
    else
      isPast.push(obj);

  });
  return [isPast, isCurrent, isFuture];
};

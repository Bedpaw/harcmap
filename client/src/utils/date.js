import { MACROS } from 'utils/macros';
import dayjs from 'dayjs';

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

export const compareDate = {
  isFuture: (date) => dayjs().isBefore(date),
  isPast: (date) => dayjs().isAfter(date),
  isActual: (startDate, endDate) => dayjs(dayjs()).isBetween(startDate, endDate),
  isToday: (date) => dayjs().isToday(date),
};

export const displayDate = {
  inFormat: (date, format = DATE_FORMATS.DDMMYYYY) => dayjs(date).format(format),
  relativeToInCalendarFormat: (date) => dayjs(date).calendar(),
  asDuration: (date) => dayjs.duration(date, 'seconds').humanize(),
  fromTo: (from, to, separator = ' - ') => {
    if (from === to) {
      return from;
    }
    return from + separator + to;
  },
};

export const getDate = {
  fromFormat: (date, format = DATE_FORMATS.DDMMYYYY) => dayjs(date, format),
  secondsAfterFull: (date = dayjs()) => Number(dayjs(date).format(DATE_FORMATS.ss)),
  minutesAfterFull: (date = dayjs()) => Number(dayjs(date).format(DATE_FORMATS.mm)),
  secondsToFull: (date = dayjs()) => secondsInMinute - Number(dayjs(date).format(DATE_FORMATS.ss)),
  minutesToFull: (date = dayjs()) => minutesInHour - Number(dayjs(date).format(DATE_FORMATS.mm)),
  msInSeconds: (seconds) => seconds * msInSeconds,
};

export function isBeforeLastGapEndTime (refreshIntervalInSeconds, timeToCompare) {
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
  const mapRefreshTimeInMinutes = refreshIntervalInSeconds / secondsInMinute;
  const minutesAfterLastGapTime = getDate.minutesAfterFull() % mapRefreshTimeInMinutes;
  const lastGapEndTime = getDate.minutesAfterFull() - minutesAfterLastGapTime;
  return dayjs(timeToCompare).isBefore(lastGapEndTime);
}

export function getTimeComponents (date = dayjs()) {
  const hours = displayDate.inFormat(date, DATE_FORMATS.HH);
  const minutes = displayDate.inFormat(date, DATE_FORMATS.mm);
  const seconds = displayDate.inFormat(date, DATE_FORMATS.ss);
  return [seconds, minutes, hours];
}

export const sortObjectsListByTime = (objectsList, timeKey, order = MACROS.order.ascending) => {
  if (order === MACROS.order.ascending) return objectsList.sort((a, b) => a[timeKey] - b[timeKey]);
  else if (order === MACROS.order.descending) return objectsList.sort((a, b) => b[timeKey] - a[timeKey]);
};

export const splitObjectsListByTime = (objectsList, startDateKey, endDateKey) => {
  const isPast = [];
  const isCurrent = [];
  const isFuture = [];

  objectsList.forEach(obj => {
    const startDate = obj[startDateKey];
    const endDate = obj[endDateKey];
    if (compareDate.isActual(startDate, endDate)) {
      isCurrent.push(obj);
    } else if (compareDate.isFuture(startDate)) {
      isFuture.push(obj);
    } else {
      isPast.push(obj);
    }
  });
  return [isPast, isCurrent, isFuture];
};

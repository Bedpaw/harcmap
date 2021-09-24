import moment from 'moment';
import { MACROS } from 'utils/macros';

const { secondsInMinute, msInSeconds } = MACROS.time;
export const DATE_FORMATS = {
  DDMMYYYY: 'DD.MM.YYYY',
  DDMMYYYYHHmm: 'DD.MM.YYYY HH:mm',
  YYYYMMDD: 'YYYY-MM-DD',
  YYYYMMDDTHHmm: 'YYYY-MM-DDTHH:mm',
  DDMMYYYYoHHmm: 'DD.MM.YYYY [o] HH:mm',
  HHmm: 'HH:mm',
  HHmmDDMMYYYY: 'HH:mm DD.MM.YYYY',
};

export function getDateInFormat (date, format = DATE_FORMATS.DDMMYYYY) {
  return moment(new Date(date)).format(format);
}
export function getDateValueFromFormat (date, format = DATE_FORMATS.DDMMYYYY) {
  return moment(date, format).valueOf();
}
export function getCollectionTime (date) {
  // TODO Why like this?
  moment.locale('pl');
  return moment(date).calendar();
}
export function getDurationInHumanize (date) {
  // TODO Why like this?
  moment.locale('pl');
  return moment.duration(date, 'seconds').humanize();
}

export function getCalendarDate (date) {
  // TODO Why like this?
  return moment(new Date(date)).calendar(null, {
    sameDay: 'HH:mm',
    nextDay: 'DD.MM.YYYY HH:mm',
    nextWeek: 'DD.MM.YYYY HH:mm',
    lastDay: 'DD.MM.YYYY HH:mm',
    lastWeek: 'DD.MM.YYYY HH:mm',
    sameElse: 'DD.MM.YYYY HH:mm',
  });
}

export function isBeforeLastGapEndTime (refreshIntervalInSeconds, timeToCompare) {
  // TODO it is mess
  const mapRefreshTimeInMinutes = refreshIntervalInSeconds / 60;
  const now = moment();
  const lastGapEndTime = moment(now).minutes((now.minute() - (now.minute() % mapRefreshTimeInMinutes))).seconds(0);
  const isBeforeLastGapEndTime = moment(timeToCompare).isBefore(lastGapEndTime);
  return isBeforeLastGapEndTime;
}

export const compareDate = {
  isPast: (date) => date < Date.now(),
  isFuture: (date) => date > Date.now(),
  isActual: (startDate, endDate) => startDate < Date.now() && endDate > Date.now(),
  isToday: (date) => moment(new Date(date)).diff(moment(), 'days') === 0,
};

/**
 * Example1: Time now: 12.46.16 => 44
 * Example2: Time now 13.55.59 => 1
 * */
export const getSecondsToFullMinute = ({ inMs = false }) => {
  const secondsFromFullMinute = Number(moment().format('s'));
  const seconds = secondsInMinute - secondsFromFullMinute;
  const ms = seconds * msInSeconds;
  return inMs ? ms : seconds;
};

export const modifyDateHours = (date, modifyValue) => {
  const modifiedDate = new Date(date);
  const modifiedDateHour = date.getHours() + modifyValue;
  return new Date(modifiedDate.setHours(modifiedDateHour));
};

export const getZeroPad = (n) => (parseInt(n, 10) >= 10 ? '' : '0') + n;

export const getMinutesAsString = (date) => `${getZeroPad(date.getMinutes())}`;

export const getSecondsAsString = (date) => `${getZeroPad(date.getSeconds())}`;

export const getHoursAndMinutesAsString = (date) => {
  const dateObj = new Date(date);
  return `${dateObj.getHours()}` + ':' + getMinutesAsString(dateObj);
};
export const getFullDateAsString = (date) => `${date.getHours()}` + ':' + getMinutesAsString(date) + ':' + getSecondsAsString(date);

export const getFromToString = (from, to) => {
  if (from === to) {
    return from;
  }
  return from + '-' + to;
};

export const sortObjectsListByTime = (objectsList, timeKey, order = MACROS.order.ascending) => {
  if (order === MACROS.order.ascending) return objectsList.sort((a, b) => a[timeKey] - b[timeKey]);
  else if (order === MACROS.order.descending) return objectsList.sort((a, b) => b[timeKey] - a[timeKey]);
};
export const splitObjectsListByTime = (objectsList, startDateKey, endDateKey) => {
  const isPast = [];
  const isCurrent = [];
  const isFuture = [];

  objectsList.map(obj => {
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

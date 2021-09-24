import moment from 'moment';

export const DATE_FORMATS = {
  DDMMYYYY: 'DD.MM.YYYY',
  DDMMYYYYHHmm: 'DD.MM.YYYY HH:mm',
};
export function getDateInFormat (date, format = DATE_FORMATS.DDMMYYYY) {
  return moment(date).format(format);
}

export const modifyDateHours = (date, modifyValue) => {
  const modifiedDate = new Date(date);
  const modifiedDateHour = date.getHours() + modifyValue;
  return new Date(modifiedDate.setHours(modifiedDateHour));
};

export const getZeroPad = (n) => (parseInt(n, 10) >= 10 ? '' : '0') + n;

export const getMinutesAsString = (date) => `${getZeroPad(date.getMinutes())}`;

export const getSecondsAsString = (date) => `${getZeroPad(date.getSeconds())}`;

export const getFullDateAsString = (date) => `${date.getHours()}` + ':' + getMinutesAsString(date) + ':' + getSecondsAsString(date);

export const getHoursAndMinutesAsString = (date) => {
  return `${date.getHours()}` + ':' + getMinutesAsString(date);
};

export const splitObjectsListByTime = (objectsList, startDateKey, endDateKey) => {
  const before = [];
  const actual = [];
  const after = [];

  objectsList.map(obj => {
    const startDate = obj[startDateKey];
    const endDate = obj[endDateKey];
    const timeNow = moment.now();

    if (moment(timeNow).isBetween(startDate, endDate)) {
      actual.push(obj);
    } else if (moment(timeNow).isAfter(endDate)) {
      after.push(obj);
    } else {
      before.push(obj);
    }
  });
  return [before, actual, after];
};

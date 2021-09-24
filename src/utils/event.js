import { compareDate, splitObjectsListByTime } from 'utils/date';

const { isToday, isActual, isFuture, isPast } = compareDate;

const timeUtils = {
  isBeforeStart: ({ eventStartDate }) => isFuture(eventStartDate),
  isAfterStart: ({ eventStartDate }) => isPast(eventStartDate),
  isOnGoing: ({
    eventStartDate,
    eventEndDate,
  }) => isActual(eventStartDate, eventEndDate),
  isOutOfDate: ({ eventEndDate }) => isPast(eventEndDate),
  isEndDateToday: ({ eventEndDate }) => isToday(eventEndDate),
};

const stateUtils = {
  hasSetPosition: ({ mapLatitude, mapLongitude }) => mapLatitude !== null && mapLongitude !== null,
};

const listUtils = {
  splitEventsByTimePeriods: (eventsList) => splitObjectsListByTime(eventsList, 'eventStartDate', 'eventEndDate'),
};

export const eventUtils = {
  ...timeUtils,
  ...listUtils,
  ...stateUtils,
};

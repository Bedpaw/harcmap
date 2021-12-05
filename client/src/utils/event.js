import { compareDate, displayDate, getDate, splitEventsListByTimeNew, splitObjectsListByTime } from 'utils/date';

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
  splitEventsByTimePeriodsNew: (eventsList) => splitEventsListByTimeNew(eventsList, 'startDate', 'endDate'),
};

const conversions = {
  convertEventToForm (oldData) {
    const data = { ...oldData };
    if (oldData.eventStartDate && oldData.eventEndDate) {
      data.eventStartDate = getDate.fromTimestamp(oldData.eventStartDate);
      data.eventEndDate = getDate.fromTimestamp(oldData.eventEndDate);
    }
    return data;
  },
  convertEventToSend (oldData) {
    const data = { ...oldData };
    if (oldData.eventStartDate && oldData.eventEndDate) {
      data.eventStartDate = displayDate.inTimestamp(oldData.eventStartDate);
      data.eventEndDate = displayDate.inTimestamp(oldData.eventEndDate);
    }
    return data;
  },
};

export const eventUtils = {
  ...timeUtils,
  ...listUtils,
  ...stateUtils,
  ...conversions,
};

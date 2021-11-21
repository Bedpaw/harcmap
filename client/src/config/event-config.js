import { MACROS } from 'utils/macros';
const { secondsInMinute } = MACROS.time;

export const DEFAULT_EVENT_CONFIG = {
  paginationStepOnEventList: 3,
  mapRefreshTime: 15 * secondsInMinute,
  mapZoom: 2,
  eventEndDate: null,
  eventStartDate: null,
  mapRefreshTimeOptions: [
    {
      label: '1 min',
      value: secondsInMinute,
    }, {
      label: '5 min',
      value: 5 * secondsInMinute,
    }, {
      label: '10 min',
      value: 10 * secondsInMinute,
    }, {
      label: '15 min',
      value: 15 * secondsInMinute,
    }, {
      label: '30 min',
      value: 30 * secondsInMinute,
    },
  ],
};

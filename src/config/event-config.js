// TODO move to macros
const minute = 60;

export const DEFAULT_EVENT_CONFIG = {
  paginationStepOnEventList: 3,
  mapRefreshTime: 15,
  mapZoom: 2,
  eventEndDate: null,
  eventStartDate: null,
  mapRefreshTimeOptions: [
    {
      label: '1 min',
      value: minute,
    }, {
      label: '5 min',
      value: 5 * minute,
    }, {
      label: '10 min',
      value: 10 * minute,
    }, {
      label: '15 min',
      value: 15 * minute,
    }, {
      label: '30 min',
      value: 30 * minute,
    },
  ],
};

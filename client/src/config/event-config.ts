import { MACROS } from 'utils/macros';
import { DateType } from 'src/models/date';
import {
  GameRule,
  GeolocationAvailabilityOptions,
  InputTypeEnum,
  Rules,
} from 'src/models/game-rules';

const { secondsInMinute } = MACROS.time;

const gameRules: GameRule[] = [
  {
    ruleId: Rules.GeolocationAvailability,
    ruleValue: GeolocationAvailabilityOptions.Available,
    ruleCategoryName: 'user.map',
    ruleType: InputTypeEnum.Select,
  },
  {
    ruleId: Rules.PointDetailsVisibilityOnMap,
    ruleValue: true,
    ruleCategoryName: 'user.map',
    ruleType: InputTypeEnum.Checkbox,
  },
];

export const DEFAULT_EVENT_CONFIG = {
  paginationStepOnEventList: 3,
  mapRefreshTime: 15,
  mapZoom: 2,
  eventEndDate: null as DateType,
  eventStartDate: null as DateType,
  gameRules,
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

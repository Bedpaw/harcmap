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
  mapRefreshTimeOptions: [1, 5, 10, 15, 30].map(v => ({
    label: `${v} min`,
    value: v * secondsInMinute,
  }),
  ),
};

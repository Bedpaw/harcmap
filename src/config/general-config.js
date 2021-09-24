import { ICONS } from 'src/__jscash__/icons-names-list';
import { MACROS } from 'utils/macros';

export const GENERAL_DEFAULT_CONFIG = {
  timeIcons: {
    [MACROS.timePeriods.before]: {
      icon: ICONS.history_toggle_off,
    },
    [MACROS.timePeriods.after]: {
      icon: ICONS.schedule,
    },
    [MACROS.timePeriods.current]: {
      icon: ICONS.access_time_filled,
    },
  },
};

import { MACROS } from 'utils/macros';
import { materialIcons } from '@dbetka/vue-material-icons';

const ICONS = materialIcons.names;

const { timePeriods: { isPast, isFuture, isCurrent } } = MACROS;

const timeIcons = {
  [isPast]: {
    icon: ICONS.history_toggle_off,
  },
  [isFuture]: {
    icon: ICONS.schedule,
  },
  [isCurrent]: {
    icon: ICONS.access_time_filled,
  },
};

export const generalConfigUtils = {
  getIconByTimePeriod: (timePeriod = isCurrent) => timeIcons[timePeriod].icon,
};

export const GENERAL_DEFAULT_CONFIG = {
  timeIcons,
};

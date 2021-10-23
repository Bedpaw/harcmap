import * as dayjs from 'dayjs';
import * as isToday from 'dayjs/plugin/isToday';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as calendar from 'dayjs/plugin/calendar';
import * as duration from 'dayjs/plugin/duration';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/pl';
import { DATE_FORMATS } from 'utils/date';

export function initDateConfig (): void {
  dayjs.extend(isToday);
  dayjs.extend(isBetween);
  dayjs.extend(customParseFormat);
  dayjs.extend(calendar);
  dayjs.extend(duration);
  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);
  dayjs.updateLocale('pl', {
    calendar: {
      sameDay: DATE_FORMATS.HHmm,
      nextDay: DATE_FORMATS.DDMMYYYYHHmm,
      nextWeek: DATE_FORMATS.DDMMYYYYHHmm,
      lastDay: DATE_FORMATS.DDMMYYYYHHmm,
      lastWeek: DATE_FORMATS.DDMMYYYYHHmm,
      sameElse: DATE_FORMATS.DDMMYYYYHHmm,
    },
  });
  dayjs.locale('pl');
}

import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/it';
import 'dayjs/locale/es';
import isValidLocale from '../validation/isValidLocale';

export default function translateDayJs(locale: string): void {
  if (isValidLocale(locale)) {
    dayjs.locale(locale);
  }
}

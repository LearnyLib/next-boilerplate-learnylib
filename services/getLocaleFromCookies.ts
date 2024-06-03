import 'server-only';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { defaultLocale } from '../config/locales';
import LocaleType from '../types/LocaleType';
import isValidLocale from '../validation/isValidLocale';

/**
 * Renvoie la langue locale enregistrée dans les cookies
 * @returns {Promise<LocaleType>} - Promesse retournant la langue locale
 */
export const getLocaleFromCookies = cache(async (): Promise<LocaleType> => {
  const cookieLocale: string | undefined = cookies().get('locale')?.value;

  const locale: LocaleType = isValidLocale(cookieLocale)
    ? cookieLocale
    : defaultLocale;

  return locale;
});

export default getLocaleFromCookies;

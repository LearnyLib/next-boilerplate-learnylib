//import 'server-only';
import { cookies } from 'next/headers';
import { defaultLocale } from './locales';
import LocaleType from '../../types/LocaleType';
import isValidLocale from '../../validation/isValidLocale';

/**
 * Renvoie la langue locale enregistrée dans les cookies
 * @returns {Promise<LocaleType>} - Promesse retournant la langue locale
 */
export default async function getLocaleFromCookies(): Promise<LocaleType> {
  const cookieLocale: string | undefined =
    cookies().get('learnylib_locale')?.value;

  const locale: LocaleType = isValidLocale(cookieLocale)
    ? cookieLocale
    : defaultLocale;

  return locale;
}

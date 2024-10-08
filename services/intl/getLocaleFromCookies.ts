import { cookies, headers } from 'next/headers';
import { defaultLocale } from './locales';
import LocaleType from '../../types/LocaleType';
import isValidLocale from '../../validation/isValidLocale';
import extractLocaleFromAcceptLanguageHeader from './extractLocaleFromAcceptLanguageHeader';

/**
 * Renvoie la langue locale enregistrée dans les cookies
 * Sinon, renvoie la langue enregistrée dans le header 'accept-language'
 * Sinon, renvoie la langue par défaut
 * @returns {Promise<LocaleType>} - Promesse retournant la langue locale
 */
export default async function getLocaleFromCookies(): Promise<LocaleType> {
  const cookieLocale = cookies().get('learnylib_locale')?.value;

  if (cookieLocale && isValidLocale(cookieLocale)) return cookieLocale;

  const headersList = headers();
  const acceptLanguageHeader = headersList.get('accept-language') || '';
  const headerLocale =
    await extractLocaleFromAcceptLanguageHeader(acceptLanguageHeader);

  if (headerLocale && isValidLocale(headerLocale)) return headerLocale;

  return defaultLocale;
}

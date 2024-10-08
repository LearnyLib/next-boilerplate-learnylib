import { LocaleType } from '../../types';
import { locales } from './locales';

/**
 * Extrait la locale à partir de la valeur du header 'accept-language'
 * @param {string} acceptLanguageHeader
 * @returns {Promise<LocaleType | null>}
 */
export default async function extractLocaleFromAcceptLanguageHeader(
  acceptLanguageHeader: string,
): Promise<LocaleType | null> {
  const acceptLanguage: string = acceptLanguageHeader.split(',')[0] || '';

  // On tente de trouver la locale qui correspond au 'accept-language'
  return (
    locales.find((locale: LocaleType) => acceptLanguage.startsWith(locale)) ||
    null
  );
}

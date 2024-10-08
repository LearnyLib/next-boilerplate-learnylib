import { NextRequest } from 'next/server';
import { defaultLocale } from './locales';
import LocaleType from '../../types/LocaleType';
import isValidLocale from '../../validation/isValidLocale';
import extractLocaleFromAcceptLanguageHeader from './extractLocaleFromAcceptLanguageHeader';

/**
 * Extrait la langue (locale) de la requête
 * Celle du cookie est retenue en priorité, sinon celle header 'accept-language'
 * Si aucune locale n'est trouvée, on retourne la locale par défaut de l'application
 * @param {NextRequest} request - Requête HTTP
 * @returns {Promise<LocaleType>} - Langue locale (composée de deux lettres)
 */
export default async function extractLocaleFromRequest(
  request: NextRequest,
): Promise<LocaleType> {
  // On récupère la locale qui correspond au header 'accept-language' de la requête
  const acceptLanguageHeader = request.headers.get('accept-language') || '';

  const matchingLocale: LocaleType | null =
    await extractLocaleFromAcceptLanguageHeader(acceptLanguageHeader);

  // Sinon on prend la locale par défaut
  const acceptLocale: LocaleType = matchingLocale || defaultLocale;

  // On récupère la locale stockée dans les cookies
  const cookieLocaleString: string | undefined =
    request.cookies.get('learnylib_locale')?.value;

  const cookieLocale: LocaleType | undefined = isValidLocale(cookieLocaleString)
    ? cookieLocaleString
    : undefined;

  // Locale préférée : celle du cookie en priorité, sinon celle du header 'accept-language'
  const preferredLocale = cookieLocale || acceptLocale;

  return preferredLocale;
}

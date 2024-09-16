//import 'server-only';
import { cookies } from 'next/headers';
import LightModeType from '../../types/LightModeType';
import isValidLightMode from '../../validation/isValidLightMode';

/**
 * Récupère le mode d'éclairage enregistré dans les cookies
 * @returns {Promise<LightModeType|undefined>} - Mode d'éclairage
 */
export async function getLightModeFromCookies(): Promise<
  LightModeType | undefined
> {
  const lightModeCookie = cookies().get('learnylib_lightmode')?.value;

  return isValidLightMode(lightModeCookie) ? lightModeCookie : undefined;
}

/**
 * Enregistre le mode d'éclairage dans les cookies
 * @param {LightModeType} lightMode
 * @returns {void}
 */
export async function setLightModeInCookies(
  lightMode: LightModeType,
): Promise<void> {
  if (!isValidLightMode(lightMode)) return;

  // Cookie valide pendant un an
  const oneYear = 365 * 60 * 60 * 1000;

  // Enregistrement du cookie
  cookies().set('learnylib_lightmode', lightMode, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + oneYear),
    sameSite: 'lax',
    path: '/',
  });
}

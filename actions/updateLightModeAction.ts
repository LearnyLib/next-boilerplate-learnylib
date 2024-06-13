'use server';
import { revalidatePath } from 'next/cache';
import { setLightModeInCookies } from '../services/cookies/lightMode';
import LightModeType from '../types/LightModeType';
import isValidLightMode from '../validation/isValidLightMode';
import { redirect } from 'next/navigation';

/**
 * Met à jour le mode d'éclairage de l'application dans les cookies
 *
 * @param {LightModeType} lightMode - Mode d'éclairage par défaut
 * @param {string} path - Chemin de redirection après application du changement
 * @returns {Promise<void>}
 */
export default async function updateLightModeAction(
  lightMode: LightModeType,
  path: string,
): Promise<void> {
  if (!isValidLightMode(lightMode)) return;

  await setLightModeInCookies(lightMode);

  revalidatePath('/');

  redirect(path);
}

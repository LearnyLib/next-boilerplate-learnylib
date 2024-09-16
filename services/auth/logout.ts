'use server';
import { removeTokensFromCookies } from './tokens';

/**
 * Déconnecter l'utilisateur en supprimant tous les cookies d'authentification
 * @returns {Promise<void>}
 */
export default async function logout(): Promise<void> {
  await removeTokensFromCookies();
}

import 'server-only';
import CoreAPI from '../services/CoreAPI';
import { getRefreshToken, getSsoToken, setTokensInCookies } from './tokens';
import AuthTokensType from '../types/AuthTokensType';

/**
 * Rafraîchit les tokens d'authentification en utilisant le refresh token stocké dans les cookies
 * @returns {Promise<AuthTokensType>} - Retourne une promesse résolue avec un objet contenant les nouveaux tokens
 * @throws {Error} - Lance une erreur si le refresh token est introuvable ou si l'opération de rafraîchissement échoue
 */
export default async function refreshTokens(): Promise<AuthTokensType> {
  const refreshToken = getRefreshToken() || getSsoToken();

  if (!refreshToken) {
    throw new Error('Refresh token not found');
  }

  // Récupération d'un un nouveau jeu de tokens JWT pour faire persister la connexion
  try {
    const response = await CoreAPI.post('/auth/refresh', { refreshToken });

    // Sauvegarde les tokens dans les cookies HttpOnly
    const tokens = response.data;

    setTokensInCookies(tokens);

    return tokens;
  } catch (error) {
    console.log('Failed to refresh tokens', error);

    throw new Error('Failed to refresh tokens');
  }
}

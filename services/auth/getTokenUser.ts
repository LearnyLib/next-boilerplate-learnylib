'use server';
import { TokenUserType } from '../../types';
import { getRefreshToken, validateToken } from './tokens';

/**
 * Récupère les informations de l'utilisateur dans le refresh token enregistré dans les cookies
 * Ces informations sont anonymes, elles se résument à l'ID et aux rôles de l'utilisateur
 * Approche optimiste et rapide (pas de vérification de la validité des tokens via l'API)
 * @returns {Promise<TokenUserType | null>}
 */
export default async function getTokenUser(): Promise<TokenUserType | null> {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) return null;

  const payload = await validateToken(refreshToken);

  if (!payload) return null;

  return { id: payload.sub, roles: payload.roles };
}

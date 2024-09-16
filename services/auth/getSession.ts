//import 'server-only';
import SessionType from '../../types/SessionType';
import { getRefreshToken, validateToken } from './tokens';

/**
 * Récupère les informations de la session dans le refresh token enregistré dans les cookies
 * Approche optimiste et rapide (pas de vérification de la validité des tokens via l'API)
 * @returns {Promise<SessionType>} - Retourne un objet de type SessionType contenant les informations de la session
 */
export default async function getSession(): Promise<SessionType> {
  let session: SessionType = {
    isAuth: false,
    user: null,
  };

  const refreshToken = await getRefreshToken();

  if (!refreshToken) return session;

  const payload = await validateToken(refreshToken);

  if (!payload) return session;

  session.isAuth = true;
  session.user = { id: payload.sub, roles: payload.roles };

  return session;
}

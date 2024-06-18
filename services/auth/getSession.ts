import 'server-only';
import SessionType from '../../types/SessionType';
import { getRefreshToken, validateToken } from './tokens';

/**
 * Récupère les informations de la session dans le refresh token enregistré dans les cookies
 * Approche optimiste et rapide (pas de vérification de la validité des tokens via l'API)
 * @returns {SessionType} - Retourne un objet de type SessionType contenant les informations de la session
 */
export default function getSession(): SessionType {
  let session: SessionType = {
    isAuth: false,
    user: null,
  };

  const refreshToken = getRefreshToken();

  if (!refreshToken) return session;

  const payload = validateToken(refreshToken);

  if (!payload) return session;

  session.isAuth = true;
  session.user = { id: payload.sub, roles: payload.roles };

  return session;
}

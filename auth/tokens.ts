import 'server-only';
import AuthTokensType from '../types/AuthTokensType';
import { cookies } from 'next/headers';
import decodeJwtPayload from '../utils/decodeJwtPayload';
import TokenPayloadType from '../types/TokenPayloadType';
import TokenPayloadSchema from '../validation/TokenPayloadSchema';

/**
 * Enregistrement des tokens dans des cookies HttpOnly
 * @param {AuthTokensType} tokens - Objet contenant les tokens d'authentification
 * @returns {Promise<void>} - Retourne une promesse qui se résout lorsque les tokens sont correctement enregistrés dans les cookies
 * @throws {Error} - Lance une erreur si les tokens sont invalides
 */
export async function setTokensInCookies(
  tokens: AuthTokensType,
): Promise<void> {
  // Validation des tokens et récupération des payloads
  const accessTokenPayload = await validateToken(tokens.accessToken);
  const refreshTokenPayload = await validateToken(tokens.refreshToken);

  if (!accessTokenPayload || !refreshTokenPayload) {
    throw new Error('Invalid token format');
  }

  // Calcul des durées de vies des cookies en milisecondes
  const accessTokenLifetime =
    (accessTokenPayload.exp - accessTokenPayload.iat) * 1000;
  const refreshTokenLifetime =
    (refreshTokenPayload.exp - refreshTokenPayload.iat) * 1000;

  // Enregistrement des cookies
  cookies().set('learnylib_access_token', tokens.accessToken, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + accessTokenLifetime),
    sameSite: 'lax',
    path: '/',
  });

  cookies().set('learnylib_refresh_token', tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + refreshTokenLifetime),
    sameSite: 'lax',
    path: '/',
  });
}

/**
 * Récupère le token d'accès dans les cookies
 * @returns {Promise<string | undefined>} - Retourne une promesse résolue avec le token d'accès sous forme de chaîne de caractères ou undefined si le token n'est pas trouvé
 */
export async function getAccessToken(): Promise<string | undefined> {
  return cookies().get('learnylib_access_token')?.value;
}

/**
 * Récupère le token de rafraîchissement dans les cookies
 * @returns {Promise<string | undefined>} - Retourne une promesse résolue avec le token de rafraîchissement sous forme de chaîne de caractères ou undefined si le token n'est pas trouvé
 */
export async function getRefreshToken(): Promise<string | undefined> {
  return cookies().get('learnylib_refresh_token')?.value;
}

/**
 * Valide le format d'un token JWT et renvoie le payload décodé
 * @param {string} token - Le token JWT à valider
 * @returns {Promise<TokenPayloadType | false>} - Retourne une promesse résolue avec le payload décodé du token s'il est valide, sinon retourne false
 */
export async function validateToken(
  token: string,
): Promise<TokenPayloadType | false> {
  const payload = decodeJwtPayload(token);

  if (!payload) return false;

  const validation = TokenPayloadSchema.safeParse({
    sub: payload.sub,
    roles: payload.roles,
    iat: payload.iat,
    exp: payload.exp,
  });

  if (!validation.success) return false;

  const validatedPayload: TokenPayloadType = validation.data;

  return validatedPayload;
}

/**
 * Supprime les cookies contenant les tokens d'authentification
 * @returns {Promise<void>} - Retourne une promesse résolue une fois les cookies supprimés
 */
export async function removeTokensFromCookies(): Promise<void> {
  cookies().delete('learnylib_access_token');
  cookies().delete('learnylib_refresh_token');
}

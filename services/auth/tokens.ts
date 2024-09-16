//import 'server-only';
import AuthTokensType from '../../types/AuthTokensType';
import { cookies } from 'next/headers';
import decodeJwtPayload from '../../utils/decodeJwtPayload';
import TokenPayloadType from '../../types/TokenPayloadType';
import TokenPayloadSchema from '../../validation/TokenPayloadSchema';
import CookieOptions from '../../types/CookieOptionsType';

/**
 * Enregistrement des tokens dans des cookies HttpOnly
 * @param {AuthTokensType} tokens - Objet contenant les tokens d'authentification
 * @returns {Promise<void>}
 * @throws {Error} - Lance une erreur si les tokens sont invalides
 */
export async function setTokensInCookies(
  tokens: AuthTokensType,
): Promise<void> {
  await setRefreshToken(tokens.refreshToken);
  await setAccessToken(tokens.accessToken);
}

/**
 * Enregistre l'access token dans les cookies
 * @param {string} accessToken
 * @returns {Promise<void>}
 */
export async function setAccessToken(accessToken: string): Promise<void> {
  // Validation du token et récupération du payload
  const accessTokenPayload = await validateToken(accessToken);

  if (!accessTokenPayload) {
    throw new Error('Invalid access token');
  }

  const cookieOptions = await createTokenCookieOptions(accessTokenPayload);

  // Enregistrement du cookie
  cookies().set('learnylib_access_token', accessToken, cookieOptions);
}

/**
 * Enregistre le refresh token dans les cookies
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
export async function setRefreshToken(refreshToken: string): Promise<void> {
  // Validation du token et récupération du payload
  const refreshTokenPayload = await validateToken(refreshToken);

  if (!refreshTokenPayload) {
    throw new Error('Invalid refresh token');
  }

  const cookieOptions = await createTokenCookieOptions(refreshTokenPayload);

  // Enregistrement du cookie
  cookies().set('learnylib_refresh_token', refreshToken, cookieOptions);
}

/**
 * Récupère le token d'accès dans les cookies
 * @returns {Promise<string | undefined>} - Retourne le token d'accès sous forme de chaîne de caractères ou undefined si le token n'est pas trouvé
 */
export async function getAccessToken(): Promise<string | undefined> {
  const token = cookies().get('learnylib_access_token')?.value || '';
  const tokenIsValid = await validateToken(token);
  if (!token || !tokenIsValid) return undefined;
  return token;
}

/**
 * Récupère le token de rafraîchissement dans les cookies
 * @returns {Promise<string | undefined>} - Retourne le token de rafraîchissement sous forme de chaîne de caractères ou undefined si le token n'est pas trouvé
 */
export async function getRefreshToken(): Promise<string | undefined> {
  const token = cookies().get('learnylib_refresh_token')?.value || '';
  const tokenIsValid = await validateToken(token);
  if (!token || !tokenIsValid) return undefined;
  return token;
}

/**
 * Supprime les cookies contenant les tokens d'authentification
 * @returns {Promise<void>}
 */
export async function removeTokensFromCookies(): Promise<void> {
  cookies().delete('learnylib_access_token');
  cookies().delete('learnylib_refresh_token');
}

/**
 * Valide le format d'un token JWT et renvoie le payload décodé
 * @param {string} token - Le token JWT à valider
 * @returns {Promise<TokenPayloadType | false>} - Retourne le payload décodé du token s'il est valide, sinon retourne false
 */
export async function validateToken(
  token: string,
): Promise<TokenPayloadType | false> {
  const payload = decodeJwtPayload(token);

  if (!payload) return false;

  const validation = TokenPayloadSchema.safeParse({
    sub: payload.sub,
    roles: payload.roles,
    type: payload.type,
    iat: payload.iat,
    exp: payload.exp,
  });

  if (!validation.success) return false;

  const validatedPayload: TokenPayloadType = validation.data;

  return validatedPayload;
}

/**
 * Génère les options pour les cookies d'authentification
 * @param {TokenPayloadType} tokenPayload
 * @returns {Promise<CookieOptions>}
 */
export default async function createTokenCookieOptions(
  tokenPayload: TokenPayloadType,
): Promise<CookieOptions> {
  const lifetime: number = (tokenPayload.exp - tokenPayload.iat) * 1000;
  return {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + lifetime),
    sameSite: 'lax',
    path: '/',
  };
}

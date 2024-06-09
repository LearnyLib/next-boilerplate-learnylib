import 'server-only';
import AuthTokensType from '../types/AuthTokensType';
import { cookies } from 'next/headers';
import decodeJwtPayload from '../utils/decodeJwtPayload';
import TokenPayloadType from '../types/TokenPayloadType';
import TokenPayloadSchema from '../validation/TokenPayloadSchema';
import CookieOptions from '../types/CookieOptionsType';

/**
 * Enregistrement des tokens dans des cookies HttpOnly
 * @param {AuthTokensType} tokens - Objet contenant les tokens d'authentification
 * @returns {void}
 * @throws {Error} - Lance une erreur si les tokens sont invalides
 */
export function setTokensInCookies(tokens: AuthTokensType): void {
  setRefreshToken(tokens.refreshToken);
  setAccessToken(tokens.accessToken);
}

/**
 * Enregistre l'access token dans les cookies
 * @param accessToken
 */
export function setAccessToken(accessToken: string): void {
  // Validation du token et récupération du payload
  const accessTokenPayload = validateToken(accessToken);

  if (!accessTokenPayload) {
    throw new Error('Invalid access token');
  }

  // Enregistrement du cookie
  cookies().set(
    'learnylib_access_token',
    accessToken,
    createTokenCookieOptions(accessTokenPayload),
  );
}

/**
 * Enregistre le refresh token dans les cookies
 * @param {string} refreshToken
 */
export function setRefreshToken(refreshToken: string): void {
  // Validation du token et récupération du payload
  const refreshTokenPayload = validateToken(refreshToken);

  if (!refreshTokenPayload) {
    throw new Error('Invalid refresh token');
  }

  // Enregistrement du cookie
  cookies().set(
    'learnylib_refresh_token',
    refreshToken,
    createTokenCookieOptions(refreshTokenPayload),
  );
}

/**
 * Récupère le token d'accès dans les cookies
 * @returns {string | undefined} - Retourne le token d'accès sous forme de chaîne de caractères ou undefined si le token n'est pas trouvé
 */
export function getAccessToken(): string | undefined {
  const token = cookies().get('learnylib_access_token')?.value;
  if (!token || !validateToken(token)) return undefined;
  return token;
}

/**
 * Récupère le token de rafraîchissement dans les cookies
 * @returns {string | undefined} - Retourne le token de rafraîchissement sous forme de chaîne de caractères ou undefined si le token n'est pas trouvé
 */
export function getRefreshToken(): string | undefined {
  const token = cookies().get('learnylib_refresh_token')?.value;
  if (!token || !validateToken(token)) return undefined;
  return token;
}

/**
 * Récupère le token SSO dans les cookies
 * @returns {string | undefined} - Retourne le token de rafraîchissement sous forme de chaîne de caractères ou undefined si le token n'est pas trouvé
 */
export function getSsoToken(): string | undefined {
  const token = cookies().get('learnylib_sso_token')?.value;
  if (!token || !validateToken(token)) return undefined;
  return token;
}

/**
 * Supprime les cookies contenant les tokens d'authentification
 * @returns {void}
 */
export function removeTokensFromCookies(): void {
  cookies().delete('learnylib_access_token');
  cookies().delete('learnylib_refresh_token');
  cookies().delete('learnylib_sso_token');
}

/**
 * Valide le format d'un token JWT et renvoie le payload décodé
 * @param {string} token - Le token JWT à valider
 * @returns {TokenPayloadType | false} - Retourne le payload décodé du token s'il est valide, sinon retourne false
 */
export function validateToken(token: string): TokenPayloadType | false {
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
 * @returns {CookieOptions}
 */
export default function createTokenCookieOptions(
  tokenPayload: TokenPayloadType,
): CookieOptions {
  const lifetime: number = (tokenPayload.exp - tokenPayload.iat) * 1000;
  return {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + lifetime),
    sameSite: 'lax',
    path: '/',
  };
}

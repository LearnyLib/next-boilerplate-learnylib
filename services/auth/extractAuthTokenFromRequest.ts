//import 'server-only';
import { NextRequest } from 'next/server';
import { validateToken } from './tokens';
import decrypt from '../crypto/decrypt';

/**
 * Extrait le token d'authentification de la requête
 * On prend en priorité le refresh token enregistré dans les cookies
 * Sinon on prend le ssoToken dans les query params
 * @param {NextRequest} request - Requête HTTP
 * @returns {Promise<string | undefined>}
 */
export default async function extractAuthTokenFromRequest(
  request: NextRequest,
): Promise<string | undefined> {
  const refreshToken = request.cookies.get('learnylib_refresh_token')?.value;

  const encryptedSsoToken = request.nextUrl.searchParams.get('sso');

  const ssoToken = encryptedSsoToken ? decrypt(encryptedSsoToken) : undefined;

  const authToken: string | undefined = refreshToken || ssoToken;

  if (!authToken) return undefined;

  const tokenIsValid = await validateToken(authToken);

  if (!tokenIsValid) return undefined;

  return authToken;
}

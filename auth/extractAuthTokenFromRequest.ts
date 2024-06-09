import 'server-only';
import { NextRequest } from 'next/server';
import { validateToken } from './tokens';

/**
 * Extrait le token d'authentification de la requête
 * On prend en priorité le refresh token enregistré dans les cookies
 * Sinon on prend le ssoToken dans les query params
 * @param {NextRequest} request - Requête HTTP
 * @returns {string | undefined}
 */
export default function extractAuthTokenFromRequest(
  request: NextRequest,
): string | undefined {
  const refreshToken = request.cookies.get('learnylib_refresh_token')?.value;

  const ssoToken =
    request.cookies.get('learnylib_sso_token')?.value ||
    request.nextUrl.searchParams.get('ssoToken') ||
    undefined;

  const authToken: string | undefined = refreshToken || ssoToken;

  if (!authToken) return undefined;

  if (!validateToken(authToken)) return undefined;

  return authToken;
}

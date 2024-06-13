import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import createTokenCookieOptions, { validateToken } from '../auth/tokens';
import extractLocaleFromRequest from '../intl/extractLocaleFromRequest';
import { decrypt } from '../crypto';

/**
 * Prépare la réponse avant de l'envoyer au client, à partir des infos de la requête
 * Ajoute des cookies tels que le token SSO et la langue locale
 * @param {NextRequest} request - requête du client
 * @returns {NextResponse}
 */
export default function setupResponseWithCookies(
  request: NextRequest,
): NextResponse {
  // Initialisation de la réponse
  let response = NextResponse.next();

  // Gestion du token SSO
  const encryptedSsoToken = request.nextUrl.searchParams.get('sso');

  if (encryptedSsoToken) {
    // Déchiffrage, vérification et enregistrement du token SSO dans les cookies
    const ssoToken = decrypt(encryptedSsoToken);

    const payload = validateToken(ssoToken);

    if (payload) {
      response.cookies.set(
        'learnylib_sso_token',
        ssoToken,
        createTokenCookieOptions(payload),
      );
    }
  }

  // Enregistrement de la langue dans les cookies
  const locale = extractLocaleFromRequest(request);
  response.cookies.set('learnylib_locale', locale);

  return response;
}

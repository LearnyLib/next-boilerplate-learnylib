//import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import createTokenCookieOptions, { validateToken } from '../auth/tokens';
import extractLocaleFromRequest from '../intl/extractLocaleFromRequest';
import { decrypt } from '../crypto';

/**
 * Prépare la réponse avant de l'envoyer au client, à partir des infos de la requête
 * Ajoute des cookies tels que le token SSO et la langue locale
 * @param {NextRequest} request - requête du client
 * @returns {Promise<NextResponse>}
 */
export default async function setupResponseWithCookies(
  request: NextRequest,
): Promise<NextResponse> {
  // Initialisation de la réponse
  let response = NextResponse.next();

  // Gestion du token SSO
  const encryptedSsoToken = request.nextUrl.searchParams.get('sso');

  if (encryptedSsoToken) {
    // Déchiffrage, vérification et enregistrement du token SSO dans les cookies
    const ssoToken = decrypt(encryptedSsoToken);

    const payload = await validateToken(ssoToken);

    if (payload) {
      const cookieOptions = await createTokenCookieOptions(payload);
      response.cookies.set('learnylib_refresh_token', ssoToken, cookieOptions);
    }
  }

  // Enregistrement de la langue dans les cookies
  const locale = await extractLocaleFromRequest(request);
  response.cookies.set('learnylib_locale', locale);

  return response;
}

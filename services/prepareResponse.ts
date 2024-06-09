import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import extractLocaleFromRequest from './extractLocaleFromRequest';
import createTokenCookieOptions, { validateToken } from '../auth/tokens';

/**
 * Prépare la réponse avant de l'envoyer au client, à partir des infos de la requête
 * Ajoute des cookies tels que le token SSO et la langue locale
 * @param {NextRequest} request - requête du client
 * @returns {NextResponse}
 */
export default function prepareResponse(request: NextRequest): NextResponse {
  // Initialiser la réponse
  let response = NextResponse.next();

  // Gestion du token SSO
  const ssoToken = request.nextUrl.searchParams.get('ssoToken');

  if (ssoToken) {
    // Réécriture de l'URL pour enlever le paramètre ssoToken
    const nextUrl = request.nextUrl;
    nextUrl.searchParams.delete('ssoToken');
    response = NextResponse.redirect(nextUrl);

    // Enregistrement du token SSO dans les cookies
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

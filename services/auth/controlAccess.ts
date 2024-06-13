import 'server-only';
import { NextRequest } from 'next/server';
import AccessControlResultType from '../../types/AccessControlResultType';
import AccessRoutesTypes from '../../types/AccessRoutesType';
import { validateToken } from './tokens';
import extractAuthTokenFromRequest from './extractAuthTokenFromRequest';

/**
 * Vérifie si l'utilisateur a le droit ou non d'exécuter une requête en fonction de ses rôles
 * @param {NextRequest} request - Requête HTTP envoyée par le client
 * @param {AccessRoutesTypes} accessRoutes - Routes publiques et routes protégées
 * @returns {AccessControlResultType} - Retourne un booléen indiquant si l'utilisateur est autorisé ou non
 */
export default function controlAccess(
  request: NextRequest,
  accessRoutes: AccessRoutesTypes,
): AccessControlResultType {
  // Chemin de l'URL auquel l'utilisateur tente d'accéder
  const path = request.nextUrl.pathname;

  // Si la route est explicitement déclarée comme publique, alors l'accès est autorisé
  const isRoutePublic = accessRoutes.public.find((p) => path.startsWith(p));

  if (isRoutePublic) return 'authorized';

  // On chercher une route protégée correspondant au chemin de l'URL
  const matchingProtectedRoute = accessRoutes.protected.find((route) =>
    path.startsWith(route.path),
  );

  // Si aucune route protégée n'est trouvée, alors on considère que la route est publique
  if (!matchingProtectedRoute) return 'authorized';

  // On récupère le token d'authentification (refresh ou sso)
  const authToken: string | undefined = extractAuthTokenFromRequest(request);

  if (!authToken) return 'unauthorized';

  // On contrôle la validité du token et on récupère le payload
  const authTokenPayload = validateToken(authToken);

  if (!authTokenPayload) return 'unauthorized';

  // On vérifie si l'utilisateur a le droit d'accéder à la ressource à partir du payload du token

  // Si aucun rôle spécifique n'est requis, alors la requête est acceptée
  if (
    !matchingProtectedRoute.roles ||
    matchingProtectedRoute.roles?.length === 0
  ) {
    return 'authorized';
  }

  // Si l'utilisateur a au moins un rôle autorisé, alors la requête est acceptée
  const hasAuthorizedRole = matchingProtectedRoute.roles.some((role) =>
    authTokenPayload.roles?.includes(role),
  );

  if (!hasAuthorizedRole) return 'forbidden';

  return 'authorized';
}

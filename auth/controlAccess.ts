import 'server-only';
import getSession from './getSession';
import { NextRequest } from 'next/server';
import AccessControlResultType from '../types/AccessControlResultType';
import AccessRoutesTypes from '../types/AccessRoutesType';

/**
 * Vérifie si l'utilisateur a le droit ou non d'exécuter une requête en fonction de ses rôles
 * @param {NextRequest} request - Requête HTTP envoyée par le client
 * @param {AccessRoutesTypes} accessRoutes - Routes publiques et routes protégées
 * @returns {Promise<AccessControlResultType>} - Retourne une promesse résolue avec un booléen indiquant si l'utilisateur est autorisé ou non
 */
export default async function controlAccess(
  request: NextRequest,
  accessRoutes: AccessRoutesTypes,
): Promise<AccessControlResultType> {
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

  // On récupère les informations de la session dans les cookies
  const session = await getSession();

  if (!session.isAuth) return 'unauthorized';

  // On vérifie si l'utilisateur a le droit d'accéder à la ressource

  // Si aucun rôle spécifique n'est requis, alors la requête est acceptée
  if (
    !matchingProtectedRoute.roles ||
    matchingProtectedRoute.roles?.length === 0
  ) {
    return 'authorized';
  }

  // Si l'utilisateur a au moins un rôle autorisé, alors la requête est acceptée
  const hasAuthorizedRole = matchingProtectedRoute.roles.some((role) =>
    session.user?.roles?.includes(role),
  );

  if (!hasAuthorizedRole) return 'forbidden';

  return 'authorized';
}

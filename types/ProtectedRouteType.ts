/**
 * Route protégée de l'application
 */
export default interface ProtectedRouteType {
  /**
   * Chemin d'URL qui active la protection
   * path = "/admin" signifie que tous les chemins commençant par "/admin" sont protégés
   */
  path: string;

  /**
   * Rôles qui permettent à l'utilisateur d'accéder à l'URL
   * roles = ['admin'] signifie que seuls les administrateurs peuvent y accéder
   * Si la propriété n'est pas définie ou est un tableau vide, alors tout le monde peut y accéder
   */
  roles?: string[];
}

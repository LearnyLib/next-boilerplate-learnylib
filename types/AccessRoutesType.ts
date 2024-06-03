import ProtectedRouteType from './ProtectedRouteType';

/**
 * Définition des routes publiques et protégées de l'application
 */
export default interface AccessRoutesTypes {
  /**
   * Routes publiques
   */
  public: string[];

  /**
   * Routes protégées et rôles associés
   */
  protected: ProtectedRouteType[];
}

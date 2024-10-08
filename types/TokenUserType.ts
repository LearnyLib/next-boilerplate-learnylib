/**
 * Données de l'utilisateur stockées dans le token JWT issu de l'API
 */
export default interface TokenUserType {
  /**
   * Identifiant de l'utilisateur
   */
  id: number;

  /**
   * Rôles de l'utilisateur
   */
  roles: string[];
}

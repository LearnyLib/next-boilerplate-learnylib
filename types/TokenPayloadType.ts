/**
 * Jeu de données d'un token JWT issu de l'API
 */
export default interface TokenPayloadType {
  /**
   * Identifiant de l'utilisateur
   */
  sub: number;

  /**
   * Rôles de l'utilisateur
   */
  roles: string[];

  /**
   * Type de token
   */
  type: 'access' | 'refresh' | 'sso';

  /**
   * Date d'émission du token (timestamp en secondes)
   */
  iat: number;

  /**
   * Date d'expiration du token (timestamp en secondes)
   */
  exp: number;
}

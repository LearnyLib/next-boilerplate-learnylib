import SessionUserType from './SessionUserType';

/**
 * Session de l'utilisateur
 */
export default interface SessionType {
  isAuth: boolean;
  user: SessionUserType | null;
}

import UserModel from '../models/UserModel';

/**
 * Renvoie les initiales d'un utilisateur à partir d'un objet "user"
 * @param {UserModel} user - Jeu de données de l'utilisateur
 * @returns {string} - Initiales de l'utilisateur
 */
export function getUserInitials(user: UserModel): string {
  return (
    user.firstName.trim().substring(0, 1) + user.lastName.trim().substring(0, 1)
  ).toUpperCase();
}

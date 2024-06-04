import UserModelSchema from './UserModelSchema';

/**
 * Vérifie qu'une valeur est de type UseModel
 * @param {any} value
 * @returns {boolean}
 */
export default function isValidUserModel(value: any): boolean {
  try {
    UserModelSchema.parse(value);
    return true;
  } catch {
    return false;
  }
}

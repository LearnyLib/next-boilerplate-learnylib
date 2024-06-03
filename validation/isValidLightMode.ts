import LightModeType from '../types/LightModeType';

/**
 * Vérifie qu'une valeur est un mode d'éclairage valide
 * @param {any} value - Valeur à tester
 * @returns {LightModeType} - La valeur est oui ou non un mode d'éclairage valide
 */
export default function isValidLightMode(value: any): value is LightModeType {
  return ['dark', 'light'].includes(value);
}

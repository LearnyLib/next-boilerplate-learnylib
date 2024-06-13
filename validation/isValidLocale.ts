import { locales } from '../services/intl/locales';
import LocaleType from '../types/LocaleType';

/**
 * Vérifie qu'une valeur est une langue valide
 * @param {any} value - Valeur à tester
 * @returns {LocaleType} - La valeur est oui ou non une langue valide
 */
export default function isValidLocale(value: any): value is LocaleType {
  return locales.includes(value);
}

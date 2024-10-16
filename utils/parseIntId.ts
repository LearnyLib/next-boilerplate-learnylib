/**
 * Convertit une chaîne de caractères en ID entier si possible.
 * @param {string} id - L'ID à convertir.
 * @returns {number | false} - L'ID converti sous forme d'entier ou `false` si la conversion échoue.
 */
export default function parseIntId(id: string): number | false {
  const numericId = parseInt(id);
  if (isNaN(numericId) || !Number.isInteger(numericId)) return false;
  return numericId;
}

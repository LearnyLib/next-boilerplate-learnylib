/**
 * Génère un identifiant unique sous forme de chaîne de caractères basé sur l'horodatage actuel et une valeur aléatoire.
 *
 * L'identifiant est créé en combinant le temps actuel en millisecondes (converti en une chaîne en base 36)
 * avec une chaîne générée aléatoirement. Cela assure un identifiant relativement unique adapté aux cas d'utilisation courants.
 *
 * @returns {string} Une chaîne de caractères représentant un identifiant unique.
 */
export default function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

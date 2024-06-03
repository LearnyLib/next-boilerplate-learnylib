/**
 * Sous-option de menu de l'application
 */
export default interface MenuSubOptionType {
  /**
   * Clé de traduction du nom du groupe d'options
   */
  label: string;

  /**
   * Lien correspondant à l'option de menu
   * Si l'URL actuelle commence par la valeur de "path", alors la sous-option est active
   */
  path: string;

  /**
   * Masquer dans le menu
   */
  hide?: boolean;
}

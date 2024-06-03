import MenuSubOptionType from './MenuSubOptionType';

/**
 * Option de menu de l'application
 */
export default interface MenuOptionType {
  /**
   * Clé de traduction du nom du groupe d'options
   */
  label: string;

  /**
   * Lien correspondant à l'option de menu
   * Si l'URL actuelle commence par la valeur de "path", alors l'option est active
   */
  path: string;

  /**
   * Icône de l'option
   */
  icon: React.ReactNode;

  /**
   * Sous-options de menu
   */
  subOptions?: MenuSubOptionType[];

  /**
   * Masquer dans le menu
   */
  hide?: boolean;
}

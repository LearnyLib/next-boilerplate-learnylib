import MenuOptionType from './MenuOptionType';

/**
 * Groupe d'options du menu de l'application
 * Exemple : le groupe menu "CRM" va contenir les options "Contacts", "Entreprises", "Ventes"...
 */
export default interface MenuGroupType {
  /**
   * Clé de traduction du nom du groupe d'options
   */
  label: string;

  /**
   * Options du groupe
   */
  options: MenuOptionType[];

  /**
   * Masquer dans le menu
   */
  hide?: boolean;
}

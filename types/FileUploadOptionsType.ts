/**
 * Options pour l'upload de fichier sur Clever Cloud Cellar S3
 */
export default interface FileUploadOptionsType {
  /**
   * Si isPrivate = true, le fichier ne sera pas accessible via une URL publique
   */
  isPrivate?: boolean;

  /**
   * Préfixe à ajouter au nom du fichier
   */
  namePrefix?: string;
}

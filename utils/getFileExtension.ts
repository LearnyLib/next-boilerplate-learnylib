/**
 * Extrait l'extension d'un fichier à partir d'un nom de fichier
 * @param {string} fileName - Nom du fichier
 * @returns {string} - Extension
 */
export default function getFileExtension(fileName: string): string {
  return '.' + fileName.split('.').reverse()[0];
}

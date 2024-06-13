/**
 * Extraire le nom d'un fichier dans une URL
 * @param {string} fileUrl - URL du fichier
 * @returns {string} - Nom du fichier
 */
export default function getFileNameFromUrl(fileUrl: string): string {
  try {
    // Utiliser l'objet URL pour analyser l'URL
    const parsedUrl = new URL(fileUrl);
    // Extraire le chemin et diviser par '/'
    const pathSegments = parsedUrl.pathname.split('/');
    // Retourner le dernier segment, qui est le nom du fichier
    const fileName = pathSegments.pop();
    // Optionnel: Valider si le nom de fichier existe
    if (!fileName) throw new Error('URL does not contain a valid file name.');
    return fileName;
  } catch {
    return ''; // Ou lancer une exception
  }
}

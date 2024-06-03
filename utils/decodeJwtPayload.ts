/**
 * Décode le jeu de données d'un token JWT
 * @param {string} token - Token JWT
 * @returns {any} - Jeu de données du token JWT
 */
export default function decodeJwtPayload(token: string): any {
  try {
    const base64Url = token.split('.')[1]; // Accès à la partie Payload du token

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convertir de Base64 URL en Base64 normal

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    return JSON.parse(jsonPayload); // Renvoie l'objet JavaScript du payload
  } catch (e) {
    return null; // Gestion des erreurs de parsing ou de décodage
  }
}

import CryptoJS from 'crypto-js';

/**
 * Déchiffre une chaîne de caractère
 * @param {string} encrypted
 * @returns {string}
 */
export default function decrypt(encrypted: string): string {
  try {
    // Remplacement des caractères de retour
    let base64 = encrypted.replace(/-/g, '+').replace(/_/g, '/');
    // Décodage depuis la base64
    const ciphertext = CryptoJS.enc.Base64.parse(base64);
    // Déchiffrement
    const decrypted = CryptoJS.AES.decrypt(
      {
        ciphertext: ciphertext,
      } as any,
      CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY || ''),
      {
        iv: CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV || ''),
        mode: CryptoJS.mode.CBC, // Utilisation du mode CBC
        padding: CryptoJS.pad.Pkcs7,
      },
    );
    // Conversion en texte lisible
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch {
    console.log('Failed to decrypt', encrypted);
    return '';
  }
}

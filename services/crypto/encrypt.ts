import CryptoJS from 'crypto-js';

/**
 * Chiffre une chaîne de caractère
 * @param {string} text
 * @returns {string}
 */
export default function encrypt(text: string): string {
  try {
    // Chiffrement
    const encrypted = CryptoJS.AES.encrypt(
      text,
      CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY || ''),
      {
        iv: CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV || ''),
        mode: CryptoJS.mode.CBC, // Utilisation du mode CBC
        padding: CryptoJS.pad.Pkcs7,
      },
    );
    // Conversion en base64 pour une transmission sécurisée
    const base64 = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    // Remplacement des caractères problématiques
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // Enlever aussi les "="
  } catch {
    return '';
  }
}

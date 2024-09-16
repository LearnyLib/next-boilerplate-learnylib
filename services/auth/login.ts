//import 'server-only';
import CredentialsType from '../../types/CredentialsType';
import CoreAPI from '../coreapi/CoreAPI';
import { setTokensInCookies } from './tokens';

/**
 * Envoi les identifiants de l'utilisateur à l'API pour récupérer les tokens d'authentification en échange
 * @param {CredentialsType} credentials - Les identifiants de l'utilisateur (nom d'utilisateur et mot de passe)
 * @returns {Promise<void>} - Retourne une promesse qui se résout lorsque les tokens sont correctement stockés dans les cookies
 * @throws {Error} - Lance une erreur si l'authentification échoue
 */
export default async function login(
  credentials: CredentialsType,
): Promise<void> {
  // Authentification de l'utilisateur via l'API LearnyLib
  try {
    const response = await CoreAPI.post('/auth/login', credentials);

    // Sauvegarde les tokens dans des cookies HttpOnly
    const tokens = response.data;

    await setTokensInCookies(tokens);
  } catch {
    throw new Error('Login failed');
  }
}

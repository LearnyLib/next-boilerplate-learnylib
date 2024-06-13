'use server';
import { redirect } from 'next/navigation';
import { removeTokensFromCookies } from '../services/auth/tokens';

/**
 * Déconnexion de l'utilisateur
 * Supprime les tokens stockés dans les cookies et redirige l'utilisateur vers la page d'accueil.
 * @returns {Promise<void>} - Une promesse résolue lorsque les tokens sont supprimés et la redirection effectuée
 */
export default async function signOutAction(): Promise<void> {
  removeTokensFromCookies();
  redirect('/');
}

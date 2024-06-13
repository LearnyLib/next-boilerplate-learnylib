'use server';
import FormStateType from '../types/FormStateType';
import { redirect } from 'next/navigation';
import CredentialsType from '../types/CredentialsType';
import SignInFormSchema from '../validation/SignInFormSchema';
import login from '../services/auth/login';

/**
 * Gestion de la soumission du formulaire de connexion côté serveur
 * @param {FormStateType} state - L'état actuel du formulaire
 * @param {FormData} formData - Les données du formulaire
 * @returns {Promise<FormStateType>} - Un objet représentant le nouvel état du formulaire après la tentative de connexion
 */
export default async function signInAction(
  state: FormStateType,
  formData: FormData,
): Promise<FormStateType> {
  // Validation du format des saisies
  const validation = SignInFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validation.success) {
    return {
      status: 'error',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // Authentification de l'utilisateur via l'API LearnyLib
  const credentials: CredentialsType = validation.data;

  try {
    await login(credentials);
  } catch {
    return {
      status: 'error',
      errors: {
        form: ['BadCredentials'],
      },
    };
  }

  // Redirection vers l'URL cible en cas de succès
  const callbackUrl = formData.get('callbackUrl')?.toString();

  const defaultSuccessUrl = formData.get('defaultSuccessUrl')?.toString();

  const redirectUrl: string = callbackUrl || defaultSuccessUrl || '/';

  redirect(redirectUrl);

  return { status: 'success' };
}

'use server';
import FormStateType from '../types/FormStateType';
import CoreAPI from '../services/CoreAPI';
import ForgotPasswordSchema from '../validation/ForgotPasswordSchema';

/**
 * Envoi d'email de réinitialisation du mot de passe
 * @param {FormStateType} state - L'état actuel du formulaire
 * @param {FormData} formData - Les données du formulaire
 * @returns {Promise<FormStateType>} - Un objet représentant le nouvel état du formulaire après la tentative d'envoi de l'email de réinitialisation
 */
export default async function forgotPasswordAction(
  state: FormStateType,
  formData: FormData,
): Promise<FormStateType> {
  // Validation des saisies
  const validation = ForgotPasswordSchema.safeParse({
    username: formData.get('username'),
  });

  if (!validation.success) {
    return {
      status: 'error',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // Appel API pour envoyer l'email de réinitialisation
  try {
    await CoreAPI.post('/auth/password/forgot', validation.data);

    return { status: 'success' };
  } catch {
    return {
      status: 'error',
      errors: {
        form: ['ForgotPasswordError'],
      },
    };
  }
}

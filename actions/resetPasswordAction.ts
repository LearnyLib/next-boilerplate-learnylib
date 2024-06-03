'use server';
import FormStateType from '../types/FormStateType';
import CoreAPI from '../services/CoreAPI';
import ResetPasswordSchema from '../validation/ResetPasswordSchema';

/**
 * Réinitialisation du mot de passe
 * @param {FormStateType} state - L'état actuel du formulaire
 * @param {FormData} formData - Les données du formulaire
 * @returns {Promise<FormStateType>} - Un objet représentant le nouvel état du formulaire après la tentative de réinitialisation du mot de passe
 */
export default async function resetPasswordAction(
  state: FormStateType,
  formData: FormData,
): Promise<FormStateType> {
  // Validation des saisies
  const validation = ResetPasswordSchema.safeParse({
    password: formData.get('password'),
    token: formData.get('token'),
  });

  if (!validation.success) {
    return {
      status: 'error',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // Vérification de l'identicité des mots de passes
  if (formData.get('confirmPassword') !== validation.data.password) {
    return {
      status: 'error',
      errors: {
        confirmPassword: ['ConfirmPasswordError'],
      },
    };
  }

  // Appel API pour réinitialiser le mot de passe
  try {
    await CoreAPI.post('/auth/password/reset', validation.data);

    return { status: 'success' };
  } catch {
    return {
      status: 'error',
      errors: {
        form: ['ResetPasswordError'],
      },
    };
  }
}

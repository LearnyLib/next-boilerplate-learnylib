'use server';
import FormErrorsType from '../types/FormErrorsType';
import FormStateType from '../types/FormStateType';
import { redirect } from 'next/navigation';
import CredentialsType from '../types/CredentialsType';
import SignUpFormSchema from '../validation/SignUpFormSchema';
import CreateUserDto from '../dto/CreateUserDto';
import CoreAPI from '../services/coreapi/CoreAPI';
import login from '../services/auth/login';

/**
 * Création du compte utilisateur après soumission du formulaire d'inscription
 * Vérifie les entrées, crée un nouvel utilisateur, l'authentifie et redirige vers l'URL de callback.
 * @param {FormStateType} state - L'état actuel du formulaire
 * @param {FormData} formData - Les données du formulaire
 * @returns {Promise<FormStateType>} - Un objet représentant le nouvel état du formulaire après la tentative d'inscription
 */
export default async function signUpAction(
  state: FormStateType,
  formData: FormData,
): Promise<FormStateType> {
  let errors: FormErrorsType = {};

  // Vérification que les mots de passes sont identiques
  if (formData.get('confirmPassword') !== formData.get('password')) {
    errors.confirmPassword = ['ConfirmPasswordError'];
  }

  // Vérification que les CGV et CGU ont été acceptées
  if (!formData.get('acceptTerms')) {
    errors.acceptTerms = ['AcceptTermsError'];
  }

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors };
  }

  // Validation du format des saisies
  const validation = SignUpFormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    password: formData.get('password'),
  });

  if (!validation.success) {
    return {
      status: 'error',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // Création de l'utilisateur via l'API LearnyLib
  const user: CreateUserDto = validation.data;

  try {
    await CoreAPI.post('/users', user);
  } catch (error: any) {
    console.log('Failed to create user', error);

    // Traitement de l'erreur "409 Conflict" = Email déjà utilisé (clé unique)
    if (error?.response?.status === 409) {
      errors.email = ['EmailAlreadyUsed'];
    } else {
      errors.form = ['AnErrorOccured'];
    }

    return { status: 'error', errors };
  }

  // Authentification l'utilisateur via l'API LearnyLib
  const credentials: CredentialsType = {
    username: user.email,
    password: user.password || '',
  };

  try {
    await login(credentials);
  } catch (error) {
    console.log('Failed to authenticate user', error);

    return {
      status: 'error',
      errors: {
        form: ['AnErrorOccured'],
      },
    };
  }

  // Rediriger vers l'URL cible en cas de succès
  const callbackUrl = formData.get('callbackUrl')?.toString();

  const callbackQuery = callbackUrl ? `?callbackUrl=${callbackUrl}` : '';

  let successUrl = formData.get('successUrl')?.toString();

  successUrl = successUrl ? successUrl + callbackQuery : undefined;

  const redirectUrl = successUrl || callbackUrl || '/';

  redirect(redirectUrl);

  return { status: 'success' };
}

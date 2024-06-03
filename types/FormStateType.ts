import FormErrorsType from './FormErrorsType';

/**
 * Etat d'un formulaire
 */
type FormStateType =
  | {
      status?: 'success' | 'error';
      errors?: FormErrorsType;
      message?: string;
      data?: any;
    }
  | undefined;

export default FormStateType;

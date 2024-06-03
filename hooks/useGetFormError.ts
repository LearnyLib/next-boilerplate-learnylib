'use client';
import { useCallback } from 'react';
import { FormStateType } from '../types/FormStateType';
import useText from './useTranslate';

/**
 * Hook qui récupère le message d'erreur complet et traduit d'un champ de formulaire.
 * @param {FormStateType} state - L'état du formulaire.
 * @returns {function} - Une fonction qui prend une clé d'erreur et retourne le message d'erreur complet et traduit pour ce champ.
 */
export default function useGetFormError(
  state: FormStateType,
): (errorKey: string) => string {
  const t = useText();

  const getError = useCallback(
    (errorKey: string): string => {
      return (state?.errors?.[errorKey] || []).map((e) => t(e)).join(' ');
    },
    [state, t],
  );

  return getError;
}

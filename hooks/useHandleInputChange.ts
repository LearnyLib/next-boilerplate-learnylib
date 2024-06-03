'use client';
import { ChangeEvent, Dispatch, SetStateAction, useCallback } from 'react';

type ChangeEventFn = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;

/**
 * Hook qui gère les saisies dans les inputs en modifiant le state du formulaire.
 * @param {any} state - L'état actuel du formulaire.
 * @param {Dispatch<SetStateAction<any>>} setState - La fonction pour mettre à jour l'état du formulaire.
 * @returns {} - Une fonction pour gérer les changements d'input.
 */
export default function useHandleInputChange(
  state: any,
  setState: Dispatch<SetStateAction<any>>,
): ChangeEventFn {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;

      let newState = { ...state, [name]: value.trim() };

      setState(newState);
    },
    [state, setState],
  );

  return handleChange;
}

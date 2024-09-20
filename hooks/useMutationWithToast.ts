'use client';
import {
  QueryClient,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import useToast from './useToast';
import { useEffect } from 'react';
import useTranslate from './useTranslate';

/**
 * Mutation Tanstack Query qui déclenche des toasts en cas de succès ou d'échec
 * @param {UseMutationOptions<unknown, Error, void, unknown>} options - Options de mutation Tanstack Query
 * @param queryClient - Client Tanstack Query
 * @returns {UseMutationResult<unknown, Error, void, unknown>}
 */
export default function useMutationWithToast(
  options: UseMutationOptions<unknown, Error, void, unknown>,
  queryClient?: QueryClient,
): UseMutationResult<unknown, Error, void, unknown> {
  const mutation = useMutation(options, queryClient);

  const showToast = useToast();

  const t = useTranslate();

  const { isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      showToast(t('MutationSuccess'), 'success', 3000);
    }
  }, [showToast, t, isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast(t('MutationError'), 'error', 3000);
    }
  }, [showToast, t, isError]);

  return mutation;
}

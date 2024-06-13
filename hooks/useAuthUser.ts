'use client';
import UserModel from '../models/UserModel';
import { useQuery } from '@tanstack/react-query';
import { getAuthUser } from '../services';

/**
 * Hook qui récupère l'utilisateur authentifié
 * @returns {UserModel|null}
 */
export default function useAuthUser(): UserModel | null {
  const { data, isSuccess } = useQuery<UserModel | null>({
    queryKey: ['auth-user'],
    queryFn: () => getAuthUser(),
    staleTime: 60 * 1000,
  });
  return isSuccess ? data : null;
}

'use client';
import UserModel from '../models/UserModel';
import getAuthUser from '../auth/getAuthUser';
import { useQuery } from '@tanstack/react-query';

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

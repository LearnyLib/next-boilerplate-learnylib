'use client';
import { useEffect, useState } from 'react';
import UserModel from '../models/UserModel';
import getAuthUser from '../auth/getAuthUser';

/**
 * Hook qui récupère l'utilisateur authentifié
 * @returns {UserModel|null}
 */
export default function useAuthUser(): UserModel | null {
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const cacheUser = await getAuthUser();
      setUser(cacheUser);
    };

    loadUser();
  }, []);

  return user;
}

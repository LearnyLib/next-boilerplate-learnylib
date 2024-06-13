'use server';
import CoreAPI from './CoreAPI';
import UserModel from '../../models/UserModel';
import isValidUserModel from '../../validation/isValidUserModel';
import { cache } from 'react';

/**
 * Récupère les données complètes de l'utilisateur connecté via l'API
 * @returns {Promise<UserModel | null>}
 */
export const getAuthUser = cache(async (): Promise<UserModel | null> => {
  try {
    const response = await CoreAPI.get('/users/me');
    if (!isValidUserModel(response.data)) {
      throw new Error('Invalid user data');
    }
    return response.data;
  } catch {
    console.log('Failed to fetch user');
    return null;
  }
});

export default getAuthUser;

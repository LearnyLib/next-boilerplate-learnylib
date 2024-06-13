'use server';
import { cache } from 'react';
import CoreAPI from './CoreAPI';
import UserModel from '../../models/UserModel';
import isValidUserModel from '../../validation/isValidUserModel';

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
  } catch (error) {
    console.log('Failed to fetch user', error);

    return null;
  }
});

export default getAuthUser;

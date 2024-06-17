'use server';
import UpdateUserDto from './dto/UpdateUserDto';
import CoreAPI from './CoreAPI';
import CreateUserDto from './dto/CreateUserDto';
import { cache } from 'react';
import { UserModel } from '../../models';

/**
 * Récupère les données de l'utilisateur authentifié
 * @returns {Promise<UserModel>}
 */
export const getAuthUser = cache(async (): Promise<UserModel> => {
  const response = await CoreAPI.get('/users/me');
  return response.data;
});

/**
 * Crée un nouvel utilisateur
 * @param {CreateUserDto} createUserDto
 * @returns {Promise<UserModel>}
 */
export async function createUser(
  createUserDto: CreateUserDto,
): Promise<UserModel> {
  const response = await CoreAPI.post('/users', createUserDto);
  return response.data;
}

/**
 * Modifie l'utilisateur authentifié
 * @param {UpdateUserDto} updateUserDto
 * @returns {Promise<UserModel>}
 */
export async function updateAuthUser(
  updateUserDto: UpdateUserDto,
): Promise<UserModel> {
  const response = await CoreAPI.put('/users/me', updateUserDto);
  return response.data;
}

/**
 * Ajoute un rôle à l'utilisateur authentifié
 * @param {string} role
 * @returns {Promise<UserModel>}
 */
export async function addAuthUserRole(role: string): Promise<UserModel> {
  const response = await CoreAPI.post('/users/me/roles', { role });
  return response.data;
}

/**
 * Retire un rôle à l'utilisateur authentifié
 * @param {string} role
 * @returns {Promise<UserModel>}
 */
export async function removeAuthUserRole(role: string): Promise<UserModel> {
  const response = await CoreAPI.delete(`/users/me/roles/${role}`);
  return response.data;
}

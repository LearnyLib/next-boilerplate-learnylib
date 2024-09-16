'use server';
import UpdateUserDto from '../../dto/UpdateUserDto';
import CoreAPI from './CoreAPI';
import CreateUserDto from '../../dto/CreateUserDto';
import { UserModel } from '../../models';
import CompanyModel from '../../models/CompanyModel';

/**
 * Récupère les données de l'utilisateur authentifié
 * @returns {Promise<UserModel>}
 */
export async function getAuthUser(): Promise<UserModel> {
  const response = await CoreAPI.get('/users/me');
  return response.data;
}

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
  const user = await getAuthUser();
  const response = await CoreAPI.put(`/users/${user.id}`, updateUserDto);
  return response.data;
}

/**
 * Ajoute un rôle à l'utilisateur authentifié
 * @param {string} role
 * @returns {Promise<UserModel>}
 */
export async function addAuthUserRole(role: string): Promise<UserModel> {
  const user = await getAuthUser();
  const response = await CoreAPI.post(`/users/${user.id}/roles/${role}`);
  return response.data;
}

/**
 * Retire un rôle à l'utilisateur authentifié
 * @param {string} role
 * @returns {Promise<UserModel>}
 */
export async function removeAuthUserRole(role: string): Promise<UserModel> {
  const user = await getAuthUser();
  const response = await CoreAPI.delete(`/users/${user.id}/roles/${role}`);
  return response.data;
}

/**
 * Récupère les entreprises de l'utilisateur authentifié
 * @returns {Promise<CompanyModel[]>}
 */
export async function getAuthUserCompanies(): Promise<CompanyModel[]> {
  const user = await getAuthUser();
  const response = await CoreAPI.get(`/users/${user.id}/companies`);
  return response.data;
}

'use server';
import { CompanyModel, UserModel } from '../../models';
import CoreAPI from './CoreAPI';
import CreateCompanyDto from '../../dto/CreateCompanyDto';
import UpdateCompanyDto from '../../dto/UpdateCompanyDto';

/**
 * Récupère les informations d'une entreprise par son identifiant.
 * @async
 * @param {number} id - L'identifiant de l'entreprise.
 * @returns {Promise<CompanyModel>} - Les informations de l'entreprise.
 */
export async function getCompany(id: number): Promise<CompanyModel> {
  const response = await CoreAPI.get(`/companies/${id}`);
  return response.data;
}

/**
 * Récupère la liste des utilisateurs associés à une entreprise.
 * @async
 * @param {number} id - L'identifiant de l'entreprise.
 * @returns {Promise<UserModel[]>} - La liste des utilisateurs de l'entreprise.
 */
export async function getCompanyUsers(id: number): Promise<UserModel[]> {
  const response = await CoreAPI.get(`/companies/${id}/users`);
  return response.data;
}

/**
 * Crée une nouvelle entreprise avec les données fournies.
 * @async
 * @param {CreateCompanyDto} data - Les données pour créer l'entreprise.
 * @returns {Promise<CompanyModel>} - Les informations de l'entreprise créée.
 */
export async function createCompany(
  data: CreateCompanyDto,
): Promise<CompanyModel> {
  const response = await CoreAPI.post(`/companies`, data);
  return response.data;
}

/**
 * Met à jour les informations d'une entreprise existante.
 * @async
 * @param {number} id - L'identifiant de l'entreprise.
 * @param {UpdateCompanyDto} data - Les données à mettre à jour pour l'entreprise.
 * @returns {Promise<CompanyModel>} - Les informations mises à jour de l'entreprise.
 */
export async function updateCompany(
  id: number,
  data: UpdateCompanyDto,
): Promise<CompanyModel> {
  const response = await CoreAPI.put(`/companies/${id}`, data);
  return response.data;
}

/**
 * Associe un utilisateur à une entreprise.
 * @async
 * @param {number} userId - L'identifiant de l'utilisateur.
 * @param {number} companyId - L'identifiant de l'entreprise.
 * @returns {Promise<void>} - Aucune valeur de retour.
 */
export async function linkUserToCompany(
  userId: number,
  companyId: number,
): Promise<void> {
  await CoreAPI.post(`/companies/${companyId}/users/${userId}`);
}

/**
 * Associe un utilisateur à une entreprise en utilisant son email.
 * @async
 * @param {string} email - L'email de l'utilisateur.
 * @param {number} companyId - L'identifiant de l'entreprise.
 * @returns {Promise<UserModel>} - Les informations de l'utilisateur associé.
 */
export async function linkUserToCompanyByEmail(
  email: string,
  companyId: number,
): Promise<UserModel> {
  const response = await CoreAPI.post(`/companies/${companyId}/users`, {
    email,
  });
  return response.data;
}

/**
 * Dissocie un utilisateur d'une entreprise.
 * @async
 * @param {number} userId - L'identifiant de l'utilisateur.
 * @param {number} companyId - L'identifiant de l'entreprise.
 * @returns {Promise<void>} - Aucune valeur de retour.
 */
export async function unlinkUserFromCompany(
  userId: number,
  companyId: number,
): Promise<void> {
  await CoreAPI.delete(`/companies/${companyId}/users/${userId}`);
}

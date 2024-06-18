'use server';
import { CompanyModel, UserModel } from '../../models';
import CoreAPI from './CoreAPI';
import CreateCompanyDto from '../../dto/CreateCompanyDto';
import UpdateCompanyDto from '../../dto/UpdateCompanyDto';

export async function getCompany(id: number): Promise<CompanyModel> {
  const response = await CoreAPI.get(`/companies/${id}`);
  return response.data;
}

export async function getCompanyUsers(id: number): Promise<UserModel[]> {
  const response = await CoreAPI.get(`/companies/${id}/users`);
  return response.data;
}

export async function createCompany(
  data: CreateCompanyDto,
): Promise<CompanyModel> {
  const response = await CoreAPI.post(`/companies`, data);
  return response.data;
}

export async function updateCompany(
  id: number,
  data: UpdateCompanyDto,
): Promise<CompanyModel> {
  const response = await CoreAPI.put(`/companies/${id}`, data);
  return response.data;
}

export async function linkUserToCompany(
  userId: number,
  companyId: number,
): Promise<void> {
  await CoreAPI.post(`/companies/${companyId}/users/${userId}`);
}

export async function linkUserToCompanyByEmail(
  email: string,
  companyId: number,
): Promise<UserModel> {
  const response = await CoreAPI.post(`/companies/${companyId}/users`, {
    email,
  });
  return response.data;
}

export async function unlinkUserFromCompany(
  userId: number,
  companyId: number,
): Promise<void> {
  await CoreAPI.delete(`/companies/${companyId}/users/${userId}`);
}

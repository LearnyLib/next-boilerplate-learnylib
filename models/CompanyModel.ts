/**
 * Entreprise LearnyLib
 */
export default interface CompanyModel {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  zip: string | null;
  city: string | null;
  country: string | null;
  businessId: string | null;
  createdAt: string;
  updatedAt: string;
}

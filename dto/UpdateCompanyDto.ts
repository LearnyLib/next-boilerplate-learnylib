/**
 * Data Transfer Object pour la création d'une entreprise
 */
export default interface UpdateCompanyDto {
  name?: string;
  email?: string;
  phone?: string | null;
  address?: string | null;
  zip?: string | null;
  city?: string | null;
  country?: string | null;
  businessId?: string | null;
}

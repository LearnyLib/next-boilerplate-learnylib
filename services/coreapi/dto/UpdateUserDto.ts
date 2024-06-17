/**
 * Data Transfer Object pour la modification d'un utilisateur
 */
export default interface UpdateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string | null;
  address?: string | null;
  zip?: string | null;
  city?: string | null;
  country?: string | null;
  pictureUrl?: string | null;
}

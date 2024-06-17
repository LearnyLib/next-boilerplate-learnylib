/**
 * Utilisateur LearnyLib
 */
export default interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  zip: string | null;
  city: string | null;
  country: string | null;
  professionalId: string | null;
  pictureUrl: string | null;
  createdAt: string;
  updatedAt: string;
  roles: string[];
}

import { z } from 'zod';

const UserModelSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  zip: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  pictureUrl: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  roles: z.array(z.string()),
});

export default UserModelSchema;

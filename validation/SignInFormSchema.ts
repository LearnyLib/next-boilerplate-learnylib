import { z } from 'zod';

/**
 * Validation des données du formulaire de connexion
 */
const SignInFormSchema = z.object({
  username: z.string().email({ message: 'InvalidEmail' }).trim(),
  password: z.string({ message: 'PleaseEnterValidPassword' }).trim(),
  callbackUrl: z.string().trim(),
});

export default SignInFormSchema;

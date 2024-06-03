import { z } from 'zod';

/**
 * Validation des données du formulaire de mot de passe oublié
 */
const ForgotPasswordSchema = z.object({
  username: z.string().email({ message: 'InvalidEmail' }).trim(),
});

export default ForgotPasswordSchema;

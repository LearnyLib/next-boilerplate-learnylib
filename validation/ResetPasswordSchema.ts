import { z } from 'zod';

/**
 * Validation des données du formulaire de réinitialisation du mot de passe
 */
const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'PasswordMustBe8CharactersLong' })
    .regex(/[a-zA-Z]/, { message: 'PasswordMustContain1Letter' })
    .regex(/[0-9]/, { message: 'PasswordMustContain1Number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'PasswordMustContain1SpecialCharacter' })
    .trim(),
  token: z.string({ message: 'ResetPasswordError' }).trim(),
});

export default ResetPasswordSchema;

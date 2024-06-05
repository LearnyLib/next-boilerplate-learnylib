import { z } from 'zod';

/**
 * Validation des données du formulaire d'inscription
 */
const SignUpFormSchema = z.object({
  firstName: z.string().min(2, { message: 'InvalidFirstName' }).trim(),
  lastName: z.string().min(2, { message: 'InvalidLastName' }).trim(),
  email: z.string().email({ message: 'InvalidEmail' }).trim(),
  phone: z
    .string()
    .regex(/^\+\d{7,}$/, { message: 'InvalidPhone' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'PasswordMustBe8CharactersLong' })
    .regex(/[a-zA-Z]/, { message: 'PasswordMustContain1Letter' })
    .regex(/[0-9]/, { message: 'PasswordMustContain1Number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'PasswordMustContain1SpecialCharacter' })
    .trim(),
});

export default SignUpFormSchema;

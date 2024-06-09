import { z } from 'zod';

/**
 * Validation du payload d'un token JWT issu de l'API LearnyLib
 */
const TokenPayloadSchema = z.object({
  sub: z.number(),
  roles: z.array(z.string()),
  type: z.enum(['access', 'refresh', 'sso']),
  iat: z.number(),
  exp: z.number(),
});

export default TokenPayloadSchema;

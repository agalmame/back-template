import { z } from 'zod';
import { SignInUserDTO } from '../../domain/dtos/Auth.dto';

export const signInUserSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export type SignInUserCommand = SignInUserDTO

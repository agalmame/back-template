import { z } from 'zod';
import { SignInUserDTO } from '../../domain/dtos/Auth.dto';

export const signInUserSchema = z.object({
  email: z.string().email(),
  password: z.string()
});



export class SignInUserCommand {
  readonly email: string;
  readonly password: string;
  
  constructor(data: SignInUserDTO) {
    this.email = data.email;
    this.password = data.password;
  }
}
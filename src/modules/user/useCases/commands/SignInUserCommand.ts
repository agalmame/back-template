import { z } from 'zod';
import { SignInUserDTO } from '../../domain/dtos/Auth.dto';

export const signInUserSchema = z.object({
  email: z.string({
    required_error: "email is required",
    invalid_type_error: "email must be a string",
  }).email(),
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
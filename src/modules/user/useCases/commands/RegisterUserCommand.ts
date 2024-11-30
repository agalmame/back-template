import { z } from 'zod';
import { RegisterUserDTO } from '../../domain/dtos/Auth.dto';

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2)
});


export class RegisterUserCommand {
  readonly email: string;
  readonly password: string;
  readonly name: string;

  constructor(data: RegisterUserDTO) {
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
  }

  static create(data: RegisterUserDTO): RegisterUserCommand {
    return new RegisterUserCommand(data);
  }
}

import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { RegisterUserCommand, registerUserSchema } from '../useCases/commands/RegisterUserCommand';
import { IRegisterUserHandler } from '../domain/interfaces/IRegisterUserHandler';
import { SignInUserCommand, signInUserSchema } from '../useCases/commands/SignInUserCommand';
import { ISignInUserHandler } from '../domain/interfaces/ISignInUserHandler';
import { CommandBus } from '@/shared/infrastructure/cqrs/CommandBus';

@injectable()
export class AuthController {
  constructor(
    @inject('CommandBus') private commandBus: CommandBus
  ) {}

  register = async (req: Request, res: Response): Promise<void> => {
      const validatedData = registerUserSchema.parse(req.body);
      const command = new RegisterUserCommand({...validatedData});
      const user = await this.commandBus.dispatch(command);
      // await this.registerHandler.execute(validatedData);

      res.status(201).json({ 
        message: 'Registration successful. Please check your email for verification.',
        data: user
      });
  };


  signIn = async (req: Request, res: Response): Promise<void> => {
    const validatedData = signInUserSchema.parse(req.body);
    const command = new SignInUserCommand({...validatedData});
    const { accessToken, refreshToken } = await this.commandBus.dispatch(command)
    
    // const { accessToken, refreshToken } = await this.signInHandler.execute(validatedData);
    res.status(200).json({ 
      message: 'Sign in successful',
      accessToken,
      refreshToken
    });
  };
}
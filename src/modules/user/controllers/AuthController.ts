import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { registerUserSchema } from '../useCases/commands/RegisterUserCommand';
import { IRegisterUserHandler } from '../domain/interfaces/IRegisterUserHandler';
import { signInUserSchema } from '../useCases/commands/SignInUserCommand';
import { ISignInUserHandler } from '../domain/interfaces/ISignInUserHandler';

@injectable()
export class AuthController {
  constructor(
    @inject("RegisterUserHandler") private registerHandler: IRegisterUserHandler,
    @inject("SignInUserHandler") private signInHandler: ISignInUserHandler,
  ) {}

  register = async (req: Request, res: Response): Promise<void> => {
      const validatedData = registerUserSchema.parse(req.body);

      await this.registerHandler.execute(validatedData);

      res.status(201).json({ 
        message: 'Registration successful. Please check your email for verification.',
        // data: user
      });
  };


  signIn = async (req: Request, res: Response): Promise<void> => {
    const validatedData = signInUserSchema.parse(req.body);
    const { accessToken, refreshToken } = await this.signInHandler.execute(validatedData);

    res.status(200).json({ 
      message: 'Sign in successful',
      accessToken,
      refreshToken
    });
  };
}
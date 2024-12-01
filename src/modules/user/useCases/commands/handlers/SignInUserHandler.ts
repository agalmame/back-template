import { injectable, inject } from 'tsyringe';
import { IHashService } from '@shared/infrastructure/security/IHashService';
import { IAuthTokenService } from '@shared/infrastructure/auth/interfaces/IAuthTokenService';
import { SignInUserCommand } from '../SignInUserCommand';
import { IUserRepository } from '@/modules/user/domain/interfaces/IUserRepository';
import { InvalidCredentialsError, UserNotVerifiedError } from '@/shared/errors/UserErrors';
import { PinoLogger } from '@/shared/infrastructure/logging/PinoLogger';

@injectable()
export class SignInUserHandler {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashService') private hashService: IHashService,
    @inject('AuthTokenService') private authTokenService: IAuthTokenService,
    private logger: PinoLogger
  ) {}

  async execute(command: SignInUserCommand): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.userRepository.findOne({ email: command.email });
    this.logger.info('Starting user registration', { email: command.email });
    
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await this.hashService.compare(
      command.password,
      user.password
    );

    if (!isPasswordValid) {
      this.logger.error('invalid pass',new InvalidCredentialsError, { email: command.email });
      throw new InvalidCredentialsError();
    }

    if (!user.verified) {
    //   throw new UserNotVerifiedError();
    }

    const {accessToken, refreshToken} = await this.authTokenService.generateTokens({
      id: user.id,
      email: user.email
    });

    return { accessToken, refreshToken };
  }
}


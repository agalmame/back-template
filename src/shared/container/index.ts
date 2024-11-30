import { container } from 'tsyringe';
import { IHashService } from '@shared/infrastructure/security/IHashService';
import { BcryptHashService } from '@shared/infrastructure/security/BcryptHashService';
import { IEmailService } from '@shared/infrastructure/email/IEmailService';
import { NodemailerService } from '@shared/infrastructure/email/NodemailerService';
import { IAuthTokenService } from '../infrastructure/auth/interfaces/IAuthTokenService';
import { JwtAuthTokenService } from '../infrastructure/auth/JwtAuthTokenService';
import { PrismaDatabase } from '../infrastructure/database/PrismaDatabase';
import { IDatabase } from '../infrastructure/database/interfaces/IDatabase';
import { UserRepository } from '../infrastructure/database/repositories/UserRepository';
import { IUserRepository } from '@/modules/user/domain/interfaces/IUserRepository';
import { RegisterUserHandler } from '@/modules/user/useCases/commands/handlers/RegisterUserHandler';
import { IRegisterUserHandler } from '@/modules/user/domain/interfaces/IRegisterUserHandler';
import { ISignInUserHandler } from '@/modules/user/domain/interfaces/ISignInUserHandler';
import { SignInUserHandler } from '@/modules/user/useCases/commands/handlers/SignInUserHandler';
import { AuthMiddleware } from '../infrastructure/middleware/AuthMiddleware';

export function registerDependencies(): void {
  console.log('registerDependencies..............')
  container.registerSingleton<IDatabase>('Database', PrismaDatabase);
  container.register('AuthMiddleware', AuthMiddleware);

  container.register<IUserRepository>('UserRepository', UserRepository);
  container.register<IHashService>('HashService', BcryptHashService);
  container.register<IEmailService>('EmailService', NodemailerService);
  container.registerSingleton<IAuthTokenService>('AuthTokenService', JwtAuthTokenService);
  container.register<IRegisterUserHandler>("RegisterUserHandler", RegisterUserHandler);
  container.register<ISignInUserHandler>("SignInUserHandler", SignInUserHandler);
  console.log('registered Dependencies..............')
}
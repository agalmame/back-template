import { Request, Response, NextFunction } from 'express';
import { DependencyContainer, inject, injectable } from 'tsyringe';
import { IAuthTokenService } from '@shared/infrastructure/auth/interfaces/IAuthTokenService';
import { UnauthorizedError } from '@shared/errors/AuthError';
// Extend Request to include user info
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

@injectable()
export class AuthMiddleware {
  constructor(
    @inject('AuthTokenService') private authTokenService: IAuthTokenService
  ) {}

  handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith('Bearer ')) {
        throw new UnauthorizedError('No token provided');
      }

      const token = authHeader.split(' ')[1];
      const decoded = await this.authTokenService.verifyAccessToken(token);

      // Attach user to request
      req.user = decoded;
      
      next();
    } catch (error) {
      next(new UnauthorizedError('Invalid token'));
    }
  };
}


export const protect = (container: DependencyContainer) => {
    const middleware = container.resolve(AuthMiddleware);
    return middleware.handle;
  };
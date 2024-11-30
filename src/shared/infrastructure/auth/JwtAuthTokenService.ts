import { injectable } from 'tsyringe';
import jwt from 'jsonwebtoken'
import { IAuthTokenService, TokenPayload, Tokens } from './interfaces/IAuthTokenService';
import { AuthenticationError } from '@/shared/errors/AuthError';


@injectable()
export class JwtAuthTokenService implements IAuthTokenService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;
  private readonly accessTokenExpiration: string;
  private readonly refreshTokenExpiration: string;

  constructor() {
    // Validate environment variables
    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
      throw new Error('JWT secrets not configured');
    }

    this.accessTokenSecret = process.env.JWT_ACCESS_SECRET;
    this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
    this.accessTokenExpiration = process.env.JWT_ACCESS_EXPIRATION || '15m';
    this.refreshTokenExpiration = process.env.JWT_REFRESH_EXPIRATION || '7d';
  }

  async generateTokens(payload: TokenPayload): Promise<Tokens> {
    try {
      const accessToken = jwt.sign(
        payload,
        this.accessTokenSecret,
        { expiresIn: this.accessTokenExpiration }
      );

      const refreshToken = jwt.sign(
        payload,
        this.refreshTokenSecret,
        { expiresIn: this.refreshTokenExpiration }
      );

      return { accessToken, refreshToken };
    } catch (error) {
      throw new AuthenticationError('Failed to generate tokens');
    }
  }

  async verifyAccessToken(token: string): Promise<TokenPayload> {
    try {
      const decoded = jwt.verify(token, this.accessTokenSecret) as TokenPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AuthenticationError('Access token expired');
      }
      throw new AuthenticationError('Invalid access token');
    }
  }

  async verifyRefreshToken(token: string): Promise<TokenPayload> {
    try {
      const decoded = jwt.verify(token, this.refreshTokenSecret) as TokenPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AuthenticationError('Refresh token expired');
      }
      throw new AuthenticationError('Invalid refresh token');
    }
  }

  private validatePayload(payload: TokenPayload): void {
    if (!payload.id || !payload.email) {
      throw new AuthenticationError('Invalid token payload');
    }
  }
}

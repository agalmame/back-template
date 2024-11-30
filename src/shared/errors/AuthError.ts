import { BaseError } from './BaseError';

export class AuthenticationError extends BaseError {
  constructor(message: string) {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, 403, 'UNAUTHORIZED_ERROR');
  }
}
import { BaseError } from './BaseError';

export class UserAlreadyExistsError extends BaseError {
  constructor() {
    super('User already exists', 409, 'USER_EXISTS');
  }
}

export class UserNotVerifiedError extends BaseError {
  constructor() {
    super('User not verified', 403, 'USER_NOT_VERIFIED');
  }
}
export class UserNotFoundError extends BaseError {
  constructor() {
    super('User not found', 404, 'USER_NOT_FOUND');
  }
}

export class InvalidCredentialsError extends BaseError {
  constructor() {
    super('Invalid credentials', 401, 'INVALID_CREDENTIALS');
  }
}


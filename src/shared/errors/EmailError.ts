import { BaseError } from './BaseError';

export class EmailError extends BaseError {
  constructor(message: string, public readonly originalError?: unknown) {
    super(message, 500, 'EMAIL_ERROR');
  }
}

export abstract class BaseError extends Error {
    constructor(
      public readonly message: string,
      public readonly statusCode: number,
      public readonly code: string
    ) {
      super(message);
      this.name = this.constructor.name;
      Object.setPrototypeOf(this, new.target.prototype)
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
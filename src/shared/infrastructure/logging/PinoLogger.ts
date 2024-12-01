import {Logger as PinoLoggerType} from 'pino';
import { inject, injectable } from 'tsyringe';
import { ILogger, LogContext } from './interfaces/ILogger';
import { PinoLoggerFactory } from './PinoLoggerFactory';
import { BaseError } from '@/shared/errors/BaseError';

@injectable()
export class PinoLogger implements ILogger {
  private logger: PinoLoggerType;

  constructor(private loggerFactory: PinoLoggerFactory, destination: any) {
    this.logger = this.loggerFactory.createLogger(destination);
  }

  info(message: string, context?: LogContext): void {
    this.logger.info({ ...context }, message);
  }

  error(message: string, error?: BaseError, context?: LogContext): void {
    this.logger.error(
      { 
        err: error, 
        ...context 
      }, 
      message
    );
  }

  warn(message: string, context?: LogContext): void {
    this.logger.warn({ ...context }, message);
  }

  debug(message: string, context?: LogContext): void {
    this.logger.debug({ ...context }, message);
  }
}

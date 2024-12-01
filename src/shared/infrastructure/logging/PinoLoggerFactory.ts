import pino, { LoggerOptions, Logger as PinoLoggerType } from 'pino';
import { injectable } from 'tsyringe';

@injectable()
export class PinoLoggerFactory {
  createLogger(destination: 'console' | 'betterstack' | 'cloudwatch'): PinoLoggerType {
    const baseOptions: LoggerOptions = {
      level: process.env.LOG_LEVEL || 'info',
    };

    switch (destination) {
      case 'betterstack':
        return pino({
          ...baseOptions,
          transport: {
            target: '@betterstack/pino-transport',
            options: {
              sourceToken: process.env.BETTERSTACK_TOKEN
            }
          }
        });

      case 'cloudwatch':
        return pino({
          ...baseOptions,
          transport: {
            target: 'pino-cloudwatch',
            options: {
              credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
              },
              region: process.env.AWS_REGION,
              logGroupName: process.env.AWS_CLOUDWATCH_GROUP,
              logStreamName: `${process.env.NODE_ENV}-${new Date().toISOString()}`
            }
          }
        });

      default:
        return pino({
          ...baseOptions,
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true
            }
          }
        });
    }
  }
}
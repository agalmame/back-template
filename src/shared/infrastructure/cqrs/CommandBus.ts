import { container, injectable } from 'tsyringe';

@injectable()
export class CommandBus {
  async dispatch<T extends object>(command: T): Promise<any> {
    const handler = container.resolve(command.constructor.name + 'Handler') as any;
    return handler.execute(command);
  }
}
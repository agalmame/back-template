import { PrismaClient } from '@prisma/client';
import { injectable } from 'tsyringe';

import { PrismaModel } from './PrismaModel';
import { IDBModel } from './interfaces/IDBModel';
import { IDatabase } from './interfaces/IDatabase';

@injectable()
export class PrismaDatabase implements IDatabase {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    await this.client.$connect();
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }

  model<T>(name: string): IDBModel<T> {
    return new PrismaModel<T>(this.client, name);
  }
}
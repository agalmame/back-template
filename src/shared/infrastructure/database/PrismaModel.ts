import { QueryOptions } from "./interfaces/IDatabase";
import { IDBModel } from "./interfaces/IDBModel";
import { PrismaClient } from "@prisma/client";

export class PrismaModel<T> implements IDBModel<T> {
    constructor(
      private prisma: PrismaClient,
      private collectionName: string 
    ) {}
  
    private get collection() {
      return (this.prisma as any)[this.collectionName];
    }
  
    async findOne(filter: Partial<T>): Promise<T | null> {
      return this.collection.findFirst({ where: filter });
    }
  
    async findMany(options?: QueryOptions): Promise<T[]> {
      return this.collection.findMany(options);
    }
  
    async create(data: Omit<T, 'id'>): Promise<T> {
      return this.collection.create({ data });
    }
  
    async update(id: string, data: Partial<T>): Promise<T> {
      return this.collection.update({
        where: { id },
        data
      });
    }
  
    async delete(id: string): Promise<void> {
      await this.collection.delete({ where: { id } });
    }
}
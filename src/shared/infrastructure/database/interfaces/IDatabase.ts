import { IDBModel } from "./IDBModel";

export interface QueryOptions {
    where?: Record<string, any>;
    select?: string[];
    skip?: number;
    take?: number;
    orderBy?: Record<string, 'asc' | 'desc'>;
}

export interface IDatabase {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    model<T>(name: string): IDBModel<T>;
}
  
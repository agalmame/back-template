import { QueryOptions } from "./IDatabase";


export interface RelationInclude {
  relation: string;
  nested?: RelationInclude[];
}

export interface FindOptions extends QueryOptions {
  include?: RelationInclude[];
}

export interface IDBModel<T> {
  findOne(filter: Partial<T>, options?: FindOptions): Promise<T | null>;
  findMany(options?: FindOptions): Promise<T[]>;
  create(data: Omit<T, 'id'>, options?: FindOptions): Promise<T>;
  update(id: string, data: Partial<T>, options?: FindOptions): Promise<T>;
  delete(id: string): Promise<void>;
}
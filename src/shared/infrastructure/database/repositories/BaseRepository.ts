import { IDBModel, FindOptions, RelationInclude } from '../interfaces/IDBModel';
import { IDatabase, QueryOptions } from '../interfaces/IDatabase';

export abstract class BaseRepository<T extends { id: string }> {
  protected abstract getModelName(): string;
  protected model: IDBModel<T>;

  constructor(protected db: IDatabase) {
    this.model = this.db.model<T>(this.getModelName());
  }

  async findOne(filter: Partial<T>, include?: RelationInclude[]): Promise<T | null> {
    return this.model.findOne(filter, { include });
  }

  async findById(id: string, include?: RelationInclude[]): Promise<T | null> {
    return this.model.findOne({ id } as Partial<T>, { include });
  }

  async findMany(options?: FindOptions): Promise<T[]> {
    return this.model.findMany(options);
  }

  async create(data: Omit<T, 'id'>, include?: RelationInclude[]): Promise<T> {
    return this.model.create(data, { include });
  }

  async update(id: string, data: Partial<T>, include?: RelationInclude[]): Promise<T> {
    return this.model.update(id, data, { include });
  }

  async delete(id: string): Promise<void> {
    await this.model.delete(id);
  }

}
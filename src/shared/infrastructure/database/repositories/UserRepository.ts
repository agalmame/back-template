import { inject, injectable } from "tsyringe";
import { IDatabase } from "../interfaces/IDatabase";
import { User } from "@/modules/user/domain/entities/User";
import { BaseRepository } from "./BaseRepository";
import { IUserRepository } from "@/modules/user/domain/interfaces/IUserRepository";

@injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor(@inject('Database') db: IDatabase) {
    super(db);
  }

  protected getModelName(): string {
    return 'user';
  }
}
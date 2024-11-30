import bcrypt from 'bcrypt';
import { injectable } from 'tsyringe';
import { IHashService } from './IHashService';

@injectable()
export class BcryptHashService implements IHashService {
  private readonly SALT_ROUNDS = 10;

  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.SALT_ROUNDS);
  }

  async compare(data: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(data, hashed);
  }
}
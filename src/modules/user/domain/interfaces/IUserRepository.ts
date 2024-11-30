import { User } from "../entities/User";

export interface IUserRepository {
    create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
    findById(id: string): Promise<User | null>;
    findOne(filter?:Partial<User>): Promise<User | null>
    // updateRefreshToken(userId: string, token: string | null): Promise<void>;
    // updateVerification(userId: string, verified: boolean): Promise<void>
    // updateResetToken(userId: string, token: string, expires: Date): Promise<void>
}


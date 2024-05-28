import { User } from "../domain/user";
import { UserEmail } from "../domain/email";

export interface UserQuery {
    canTrack?: boolean;
    isAdmin?: boolean;
    isPlayer?: boolean;
    ci?: string;
    userId?: string;
}

export interface UserRepository {
    exists(userEmail: UserEmail): Promise<boolean>;
    get(q: UserQuery): Promise<User>;
    getUserByEmail(email: UserEmail): Promise<User>;
    save(user: User): Promise<void>;
    getUserByRecoveryPasswordCode(code: string): Promise<User>;
    list(query: UserQuery): Promise<Array<User>>;
    delete(userId: string): Promise<void>;
}

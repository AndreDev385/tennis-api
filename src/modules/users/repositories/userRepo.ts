import { User } from "../domain/user";
import { UserEmail } from "../domain/email";

export interface UserRepository {
    exists(userEmail: UserEmail): Promise<boolean>;
    getUserByUserId(userId: string): Promise<User>;
    getUserByEmail(email: UserEmail): Promise<User>;
    save(user: User): Promise<void>;
}

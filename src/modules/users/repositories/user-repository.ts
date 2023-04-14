
import { User } from "../domain/user";
import { UserEmail } from "../domain/user-email";

export interface UserRepository {
  exists (userEmail: UserEmail): Promise<boolean>;
  getUserByUserId (userId: string): Promise<User>;
  save (user: User): Promise<void>;
}


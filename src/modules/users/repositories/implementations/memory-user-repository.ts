import { User } from "../../domain/user";
import { UserEmail } from "../../domain/user-email";
import { UserRepository } from "../user-repository";

export class MemoryUserRepository implements UserRepository {

    users: Array<User>;

    constructor() {
        this.users = [];
    }

    async exists(userEmail: UserEmail): Promise<boolean> {
        const found = this.users.find((u) => u.email.value === userEmail.value)
        return !!found
    }

    async getUserByUserId(userId: string): Promise<User> {
        const user = this.users.find((u) => u.id.toString() === userId)
        return user
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }

}

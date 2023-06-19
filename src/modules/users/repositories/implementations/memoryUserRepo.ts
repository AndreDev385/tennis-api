import { User } from "../../domain/user";
import { UserEmail } from "../../domain/email";
import { UserRepository } from "../userRepo";

export class MemoryUserRepository implements UserRepository {
    users: Array<User>;

    constructor() {
        this.users = [];
    }

    async getUserByEmail(email: UserEmail): Promise<User> {
        const found = this.users.find((u) => u.email.value === email.value);
        return found;
    }

    async exists(userEmail: UserEmail): Promise<boolean> {
        const found = this.users.find((u) => u.email.value === userEmail.value);
        return !!found;
    }

    async getUserByUserId(userId: string): Promise<User> {
        const user = this.users.find((u) => u.id.toString() === userId);
        return user;
    }

    async save(user: User): Promise<void> {
        console.log(this.users, 'before');
        const found = await this.exists(user.email);
        console.log(found)
        if (found) {
            for (let u of this.users) {
                if (user.email.value === u.email.value) {
                    u = user;
                }
            }
            console.log(this.users, 'update');
        } else {
            this.users.push(user);
            console.log(this.users, 'create');
        }
    }
}

import { UserEmail } from "../../domain/email";
import { User } from "../../domain/user.js";
import { UserMap } from "../../mappers/userMap";
import { UserQuery, UserRepository } from "../userRepo";

export class SequelizeUserRepo implements UserRepository {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async exists(email: UserEmail): Promise<boolean> {
        const UserModel = this.models.UserModel;

        const user = await UserModel.findOne({
            where: { email: email.value },
        });

        return !!user == true;
    }

    async getUserByUserId(userId: string): Promise<User> {
        const UserModel = this.models.UserModel;
        const user = await UserModel.findOne({ where: { userId: userId } });
        if (!!user == false) throw new Error("User not found");

        return UserMap.toDomain(user);
    }

    async getUserByEmail(email: UserEmail): Promise<User> {
        const UserModel = this.models.UserModel;
        const user = await UserModel.findOne({
            where: { email: email.value },
        });
        if (!!user == false) throw new Error("User not found");

        return UserMap.toDomain(user);
    }

    async save(user: User): Promise<void> {
        const UserModel = this.models.UserModel;
        const exists = await this.exists(user.email);

        const rawUser = await UserMap.toPersistance(user);

        if (exists) {
            await UserModel.update(rawUser, {
                where: { userId: user.userId.id.toString() },
            });
        } else {
            const user = await UserModel.create(rawUser);
            await user.save();
            return;
        }
    }

    async list(query: UserQuery): Promise<User[]> {
        const UserModel = this.models.UserModel;
        const rawList = await UserModel.findAll({
            where: query
        });

        return rawList.map((raw: any) => UserMap.toDomain(raw))
    }

    async getUserByRecoveryPasswordCode(code: string): Promise<User> {
        const UserModel = this.models.UserModel;

        const user = await UserModel.findOne({
            where: { recoverPasswordCode: code },
        });

        if (!!user == false) throw new Error("User not found");

        return UserMap.toDomain(user);
    }

    async delete(userId: string): Promise<void> {
        const UserModel = this.models.UserModel;

        await UserModel.destroy({
            where: { userId }
        })
    }
}

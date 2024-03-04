import { UserModel } from "../../../../shared/infra/database/sequelize/models/BaseUser";
import { UserEmail } from "../../domain/email";
import { User } from "../../domain/user.js";
import { UserMap } from "../../mappers/userMap";
import { UserQuery, UserRepository } from "../userRepo";

export class SequelizeUserRepo implements UserRepository {
    async exists(email: UserEmail): Promise<boolean> {
        const user = await UserModel.findOne({
            where: { email: email.value },
        });

        return !!user == true;
    }

    async getUserByUserId(userId: string): Promise<User> {
        const user = await UserModel.findOne({ where: { userId: userId } });
        if (!!user == false) throw new Error("User not found");

        return UserMap.toDomain(user)!;
    }

    async getUserByEmail(email: UserEmail): Promise<User> {
        console.log(email);
        const user = await UserModel.findOne({
            where: { email: email.value },
        });
        if (!!user == false) throw new Error("User not found");

        return UserMap.toDomain(user)!;
    }

    async save(user: User): Promise<void> {
        const rawUser = await UserMap.toPersistance(user);

        try {
            await this.getUserByUserId(user.userId.id.toString());
            await UserModel.update(rawUser, {
                where: { userId: user.userId.id.toString() },
            });
        } catch (error) {
            const user = await UserModel.create(rawUser);
            await user.save();
            return;

        }
    }

    async list(query: UserQuery): Promise<User[]> {
        const rawList = await UserModel.findAll({
            where: query as any
        });

        return rawList.map((raw: any) => UserMap.toDomain(raw)!)
    }

    async getUserByRecoveryPasswordCode(code: string): Promise<User> {

        const user = await UserModel.findOne({
            where: { recoverPasswordCode: code },
        });

        if (!!user == false) throw new Error("User not found");

        return UserMap.toDomain(user)!;
    }

    async delete(userId: string): Promise<void> {
        await UserModel.destroy({
            where: { userId }
        })
    }
}

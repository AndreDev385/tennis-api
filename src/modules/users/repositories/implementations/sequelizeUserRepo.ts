import models from "../../../../shared/infra/database/sequelize/models";
import { UserEmail } from "../../domain/email";
import { User } from "../../domain/user.js";
import { UserMap } from "../../mappers/userMap";
import { UserQuery, UserRepository } from "../userRepo";

export class SequelizeUserRepo implements UserRepository {

    async get(q: UserQuery): Promise<User> {
        const user = await models.UserModel.findOne({
            where: q as any,
        });

        if (!!user == false) {
            throw new Error("Usuario no encontrado");
        }

        return UserMap.toDomain(user)!
    }

    async exists(email: UserEmail): Promise<boolean> {
        const user = await models.UserModel.findOne({
            where: { email: email.value },
        });

        return !!user == true;
    }

    async getUserByUserId(userId: string): Promise<User> {
        const user = await models.UserModel.findOne({ where: { userId: userId } });
        if (!!user == false) throw new Error("User not found");

        return UserMap.toDomain(user)!;
    }

    async getUserByEmail(email: UserEmail): Promise<User> {
        const user = await models.UserModel.findOne({
            where: { email: email.value },
        });
        if (!!user == false) throw new Error("User not found");

        return UserMap.toDomain(user)!;
    }

    async save(user: User): Promise<void> {
        const rawUser = await UserMap.toPersistance(user);

        try {
            await this.getUserByUserId(user.userId.id.toString());
            await models.UserModel.update(rawUser, {
                where: { userId: user.userId.id.toString() },
            });
        } catch (error) {
            const user = await models.UserModel.create(rawUser);
            await user.save();
            return;

        }
    }

    async list(query: UserQuery): Promise<User[]> {
        const rawList = await models.UserModel.findAll({
            where: query as any
        });

        return rawList.map((raw: any) => UserMap.toDomain(raw)!)
    }

    async getUserByRecoveryPasswordCode(code: string): Promise<User> {

        const user = await models.UserModel.findOne({
            where: { recoverPasswordCode: code },
        });

        if (!!user == false) throw new Error("User not found");

        return UserMap.toDomain(user)!;
    }

    async delete(userId: string): Promise<void> {
        await models.UserModel.destroy({
            where: { userId }
        })
    }
}

import { UserEmail } from "../domain/email";
import { User } from "../domain/user";
import { Mapper } from "../../../shared/infra/Mapper";
import { FirstName, LastName } from "../domain/names";
import { UserPassword } from "../domain/password";
import { UserDto } from "../dtos/userDto";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export class UserMap implements Mapper<User> {
    public static async toPersistance(user: User) {

        let password: string = null;
        if (!!user.password === true) {
            if (user.password.isAlreadyHashed()) {
                password = user.password.value;
            } else {
                password = await user.password.getHashedValue();
            }
        }

        return {
            userId: user.userId.id.toString(),
            email: user.email.value,
            password: password,
            firstName: user.firstName.value,
            lastName: user.lastName.value,
            isAdmin: user.isAdmin,
            canTrack: user.canTrack || false,
            accessToken: user.accessToken || null,
        };
    }

    public static toDomain(raw: any): User {
        const emailOrError = UserEmail.create(raw.email);
        const firstNameOrError = FirstName.create({ value: raw.firstName });
        const lastNameOrError = LastName.create({ value: raw.lastName });
        const passwordOrError = UserPassword.create({
            value: raw.password,
            hashed: true,
        });

        const userOrError = User.create({
            email: emailOrError.getValue(),
            firstName: firstNameOrError.getValue(),
            lastName: lastNameOrError.getValue(),
            password: passwordOrError.getValue(),
            accessToken: raw.accessToken,
            canTrack: raw.canTrack,
            isAdmin: raw.isAdmin,
        }, new UniqueEntityID(raw.userId));

        userOrError.isFailure && console.log(userOrError.getErrorValue());

        return userOrError.isSuccess ? userOrError.getValue() : null;
    }

    public static toDto(user: User): UserDto {
        return {
            userId: user.userId.id.toString(),
            email: user.email.value,
            firstName: user.firstName.value,
            lastName: user.lastName.value,
            canTrack: user.canTrack,
            isAdmin: user.isAdmin,
        };
    }
}

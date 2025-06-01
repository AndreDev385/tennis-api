import { UserEmail } from "../domain/email";
import { User } from "../domain/user";
import { Mapper } from "../../../shared/infra/Mapper";
import { Name } from "../domain/names";
import { UserPassword } from "../domain/password";
import { UserDto } from "../dtos/userDto";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { CI } from "../domain/ci";

export class UserMap implements Mapper<User> {
	public static async toPersistance(user: User) {
		let password: string | null = null;
		if (!!user.password === true) {
			if (user.password?.isAlreadyHashed()) {
				password = user.password?.value ?? null;
			} else {
				password = (await user.password?.getHashedValue()) ?? null;
			}
		}

		return {
			userId: user.userId.id.toString(),
			email: user.email?.value ?? null,
			ci: user.ci?.value ?? null,
			password: password,
			firstName: user.firstName.value,
			lastName: user.lastName.value,
			recoverPasswordCode: user.recoverPasswordCode || null,
			canTrack: user.canTrack || false,
			isAdmin: user.isAdmin || false,
			isPlayer: user.isPlayer || false,
			accessToken: user.accessToken || null,
			isDeleted: user.isDeleted,
		};
	}

	public static toDomain(raw: any): User | null {
		const firstNameOrError = Name.create({ value: raw.firstName });
		const lastNameOrError = Name.create({ value: raw.lastName });

		let email: UserEmail | null = null;
		let password: UserPassword | null = null;
		let ci: CI | null = null;

		if (raw.email) {
			email = UserEmail.create(raw.email).getValue();
		}
		if (raw.password) {
			password = UserPassword.create({
				value: raw.password,
				hashed: true,
			}).getValue();
		}
		if (raw.ci) {
			ci = CI.create({ value: raw.ci }).getValue();
		}

		const userOrError = User.create(
			{
				email,
				firstName: firstNameOrError.getValue(),
				lastName: lastNameOrError.getValue(),
				ci,
				password,
				recoverPasswordCode: raw.recoverPasswordCode,
				isDeleted: raw.isDeleted,
				lastLogin: raw.lastLogin,
				accessToken: raw.accessToken,
				canTrack: raw.canTrack,
				isAdmin: raw.isAdmin,
				isPlayer: raw.isPlayer,
			},
			new UniqueEntityID(raw.userId),
		);

		userOrError.isFailure && console.log(userOrError.getErrorValue());

		return userOrError.isSuccess ? userOrError.getValue() : null;
	}

	public static toDto(user: User): UserDto {
		return {
			userId: user.userId.id.toString(),
			ci: user.ci?.value ?? null,
			email: user.email?.value ?? null,
			firstName: user.firstName.value,
			lastName: user.lastName.value,
			canTrack: user.canTrack,
			isAdmin: user.isAdmin,
			isPlayer: user.isPlayer,
			isDeleted: user.isDeleted,
		};
	}
}

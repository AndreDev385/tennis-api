import * as bcrypt from "bcrypt";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";

export interface IUserPasswordProps {
    value: string;
    hashed?: boolean;
}

const SALT_ROUNDS = 5;

export class UserPassword extends ValueObject<IUserPasswordProps> {
    public static minLength: number = 6;

    get value(): string {
        return this.props.value;
    }

    private constructor(props: IUserPasswordProps) {
        super(props);
    }

    private static isAppropriateLength(password: string): boolean {
        return password.length >= this.minLength;
    }

    public async comparePassword(plainTextPassword: string): Promise<boolean> {
        let hashed: string;
        if (this.isAlreadyHashed()) {
            hashed = this.props.value;
            return await this.bcryptCompare(plainTextPassword, hashed);
        } else {
            return this.props.value === plainTextPassword;
        }
    }

    private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainText, hashed, (err, compareResult) => {
                if (err) return resolve(false);
                return resolve(compareResult);
            });
        });
    }

    public isAlreadyHashed(): boolean {
        return this.props.hashed!;
    }

    private hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
                if (err) return reject(err);
                resolve(hash);
            });
        });
    }

    public getHashedValue(): Promise<string> {
        return new Promise((resolve) => {
            if (this.isAlreadyHashed()) {
                return resolve(this.props.value);
            } else {
                return resolve(this.hashPassword(this.props.value));
            }
        });
    }

    public static create(props: IUserPasswordProps): Result<UserPassword> {
        const propsResult = Guard.againstNullOrUndefined(
            props.value,
            "contraseña"
        );

        if (propsResult.isFailure) {
            return Result.fail<UserPassword>(propsResult.getErrorValue());
        } else {
            if (!props.hashed) {
                if (!this.isAppropriateLength(props.value)) {
                    return Result.fail<UserPassword>(
                        "La contraseña debe tener al menos [8] caracteres."
                    );
                }
            }

            return Result.ok<UserPassword>(
                new UserPassword({
                    value: props.value,
                    hashed: !!props.hashed === true,
                })
            );
        }
    }
}

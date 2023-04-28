import { UserEmail } from "./user-email";
import { UserId } from "./user-id";
import { UserPassword } from "./user-password";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { FirstName, LastName } from "./user-names";
import { JWTToken } from "./jwt";

interface UserProps {
    firstName: FirstName;
    lastName: LastName;
    email: UserEmail;
    password: UserPassword;
    recoverPasswordCode?: number;
    isAdminUser?: boolean;
    accessToken?: JWTToken;
    isDeleted?: boolean;
    lastLogin?: Date;
}

export class User extends AggregateRoot<UserProps> {
    get userId(): UserId {
        return UserId.create(this._id).getValue();
    }

    get firstName(): FirstName {
        return this.props.firstName;
    }

    get lastName(): LastName {
        return this.props.lastName;
    }

    get email(): UserEmail {
        return this.props.email;
    }

    get password(): UserPassword {
        return this.props.password;
    }

    get accessToken(): string {
        return this.props.accessToken;
    }

    get isDeleted(): boolean {
        return !!this.props.isDeleted;
    }

    get isAdminUser(): boolean {
        return !!this.props.isAdminUser;
    }

    get recoverPasswordCode(): number {
        return this.props.recoverPasswordCode;
    }

    public isLoggedIn(): boolean {
        return !!this.props.accessToken;
    }

    public setAccessToken(token: JWTToken): void {
        //this.addDomainEvent(new UserLoggedIn(this));
        this.props.accessToken = token;
        this.props.lastLogin = new Date();
    }

    public delete(): void {
        if (!this.props.isDeleted) {
            //this.addDomainEvent(new UserDeleted(this));
            this.props.isDeleted = true;
        }
    }

    public generateCode(): void {
        this.props.recoverPasswordCode = Math.floor(Math.random() * 1000000);
    }

    private constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.email, argumentName: "firstName" },
            { argument: props.email, argumentName: "lastName" },
            { argument: props.email, argumentName: "email" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<User>(guardResult.getErrorValue());
        }

        const user = new User(
            {
                ...props,
                isDeleted: props.isDeleted || false,
                isAdminUser: props.isAdminUser || false,
            },
            id
        );

        return Result.ok<User>(user);
    }
}

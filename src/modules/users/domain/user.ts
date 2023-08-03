import { UserEmail } from "./email";
import { UserId } from "./userId";
import { UserPassword } from "./password";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { FirstName, LastName } from "./names";
import { JWTToken } from "./jwt";
import { UserLoggedIn } from "./events/userLoggedIn";
import { UserCreated } from "./events/userCreated";

interface UserProps {
    firstName: FirstName;
    lastName: LastName;
    email: UserEmail;
    password: UserPassword;
    recoverPasswordCode?: string;
    isAdmin?: boolean;
    isPlayer?: boolean;
    canTrack?: boolean;
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

    get isAdmin(): boolean {
        return !!this.props.isAdmin;
    }

    get canTrack(): boolean {
        return !!this.props.canTrack;
    }

    get recoverPasswordCode(): string {
        return this.props.recoverPasswordCode;
    }

    get isPlayer(): boolean {
        return this.props.isPlayer;
    }

    get lastLogin() {
        return this.props.lastLogin;
    }

    public becomePlayer(): void {
        this.props.isPlayer = true;
    }

    public isLoggedIn(): boolean {
        return !!this.props.accessToken;
    }

    public setAccessToken(token: JWTToken): void {
        this.addDomainEvent(new UserLoggedIn(this));
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
        this.props.recoverPasswordCode = `${Math.floor(Math.random() * 1000000)}`;
    }

    public changePassword(password: UserPassword) {
        this.props.password = password;
        this.props.recoverPasswordCode = null;
        // this.addDomainEvent();
    }

    private constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
        console.log(id, "user constructor\n\n")
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.email, argumentName: "firstName" },
            { argument: props.email, argumentName: "lastName" },
            { argument: props.email, argumentName: "email" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<User>(guardResult.getErrorValue());
        }

        const isNew = !!id == false;
        const user = new User(
            {
                ...props,
                isDeleted: props.isDeleted || false,
                isAdmin: props.isAdmin || false,
                canTrack: props.canTrack || false,
                isPlayer: props.isPlayer || false,
                accessToken: props.accessToken || null,
            },
            id
        );

        if (isNew) {
            user.addDomainEvent(new UserCreated(user));
        }

        return Result.ok<User>(user);
    }
}

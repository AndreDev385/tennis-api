import { UserEmail } from "./email";
import { UserId } from "./userId";
import { UserPassword } from "./password";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Name } from "./names";
import { JWTToken } from "./jwt";
import { UserLoggedIn } from "./events/userLoggedIn";
import { UserCreated } from "./events/userCreated";
import { UserDeleted } from "./events/userDeleted";
import { ProvisionalPasswordGranted } from "./events/provisionalPasswordGranted";

interface UserProps {
    firstName: Name;
    lastName: Name;
    email: UserEmail;
    password: UserPassword;
    recoverPasswordCode?: string | null;
    isAdmin?: boolean;
    isPlayer?: boolean;
    canTrack?: boolean;
    accessToken?: JWTToken | null;
    isDeleted?: boolean;
    lastLogin?: Date;
}

export class User extends AggregateRoot<UserProps> {
    get userId(): UserId {
        return UserId.create(this._id).getValue();
    }

    get firstName(): Name {
        return this.props.firstName;
    }

    get lastName(): Name {
        return this.props.lastName;
    }

    get email(): UserEmail {
        return this.props.email;
    }

    get password(): UserPassword {
        return this.props.password;
    }

    get accessToken(): string | null {
        return this.props.accessToken!;
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

    get recoverPasswordCode(): string | null {
        return this.props.recoverPasswordCode!;
    }

    get isPlayer(): boolean {
        return this.props.isPlayer!;
    }

    get lastLogin() {
        return this.props.lastLogin;
    }

    public provisionalPasswordGranted(password: string) {
        this.addDomainEvent(new ProvisionalPasswordGranted(this, password));
    }

    public editUser(
        firstName: Name,
        lastName: Name,
        email: UserEmail
    ) {
        this.props.firstName = firstName;
        this.props.lastName = lastName;
        this.props.email = email;
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
            this.addDomainEvent(new UserDeleted(this));
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
                recoverPasswordCode: props.recoverPasswordCode || null,
            },
            id
        );

        if (isNew) {
            user.addDomainEvent(new UserCreated(user));
        }

        return Result.ok<User>(user);
    }
}

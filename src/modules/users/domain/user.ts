import { UserEmail } from './user-email'
import { UserId } from "./user-id";
import { UserPassword } from "./user-password";
//import { JWTToken, RefreshToken } from "./jwt";
//import { UserLoggedIn } from "./events/userLoggedIn";
//import { UserDeleted } from "./events/userDeleted";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";

interface UserProps {
  email: UserEmail;
  password: UserPassword;
  isEmailVerified?: boolean;
  isAdminUser?: boolean;
  //accessToken?: JWTToken;
  //refreshToken?: RefreshToken;
  isDeleted?: boolean;
  lastLogin?: Date;
}

export class User extends AggregateRoot<UserProps> {

  get userId (): UserId {
    return UserId.create(this._id)
      .getValue();
  }

  get email (): UserEmail {
    return this.props.email;
  }

  get password (): UserPassword {
    return this.props.password;
  }

  /*get accessToken (): string {
    return this.props.accessToken;
  }*/

  get isDeleted (): boolean {
    return !!this.props.isDeleted;
  }

  get isEmailVerified (): boolean {
    return !!this.props.isEmailVerified;
  }

  get isAdminUser (): boolean {
    return !!this.props.isAdminUser;
  }

  /*get refreshToken (): RefreshToken {
    return this.props.refreshToken
  }*/

  /*public isLoggedIn (): boolean {
    return !!this.props.accessToken && !!this.props.refreshToken
  }*/

  /*public setAccessToken (token: JWTToken, refreshToken: RefreshToken): void {
    this.addDomainEvent(new UserLoggedIn(this));
    this.props.accessToken = token;
    this.props.refreshToken = refreshToken;
    this.props.lastLogin = new Date();
  }*/

  /*public delete (): void {
    if (!this.props.isDeleted) {
      this.addDomainEvent(new UserDeleted(this));
      this.props.isDeleted = true;
    }
  }*/

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.email, argumentName: 'email' }
    ]);

    if (guardResult.isFailure) {
      return Result.fail<User>(guardResult.getErrorValue())
    }

    const user = new User({
      ...props,
      isDeleted: props.isDeleted ? props.isDeleted : false,
      isEmailVerified: props.isEmailVerified ? props.isEmailVerified : false,
      isAdminUser: props.isAdminUser ? props.isAdminUser : false
    }, id);

    return Result.ok<User>(user);
  }
}


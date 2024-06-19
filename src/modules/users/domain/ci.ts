import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

type CIProps = {
  value: string;
};

export class CI extends ValueObject<CIProps> {
  get value() {
    return this.props.value;
  }

  private static isValid(value: string): boolean {
    const re = new RegExp("^[V|E|J|P][0-9]{5,9}$");
    return re.test(value);
  }

  public static create(props: CIProps): Result<CI> {
    const guard = Guard.againstNullOrUndefined(props.value, "CI");

    if (guard.isFailure) {
      return Result.fail<CI>(`${guard.isFailure}`);
    }

    if (!this.isValid(props.value)) {
      return Result.fail<CI>("CI invalida");
    }

    return Result.ok(new CI(props));
  }
}

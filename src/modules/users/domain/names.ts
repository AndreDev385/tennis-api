import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface NameProps {
    value: string;
}

export class Name extends ValueObject<NameProps> {
    get value(): string {
        return this.props.value;
    }

    private constructor(props: NameProps) {
        super(props);
    }

    private static validate(value: string): boolean {
        const re = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        const length = value.trim().length > 1;
        const validName = re.test(value);

        return length && validName;
    }

    public static create(props: NameProps): Result<Name> {
        const result = Guard.againstNullOrUndefined(props.value, "nombre");
        if (result.isFailure) {
            return Result.fail<Name>(result.getErrorValue());
        }
        if (typeof props.value !== "string") {
            return Result.fail<Name>("Nombre debe ser un texto");
        }
        if (!this.validate(props.value)) {
            return Result.fail<Name>("Ingresa tu nombre");
        }
        return Result.ok<Name>(new Name(props));
    }
}

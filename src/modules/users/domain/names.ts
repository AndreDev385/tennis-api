import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface NameProps {
    value: string;
}

export class FirstName extends ValueObject<NameProps> {
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

    public static create(props: NameProps): Result<FirstName> {
        const result = Guard.againstNullOrUndefined(props.value, "nombre");
        if (result.isFailure) {
            return Result.fail<FirstName>(result.getErrorValue());
        }
        if (typeof props.value !== "string") {
            return Result.fail<FirstName>("Nombre debe ser un texto");
        }
        if (!this.validate(props.value)) {
            return Result.fail<FirstName>("Ingresa tu nombre");
        }
        return Result.ok<FirstName>(new FirstName(props));
    }
}

export class LastName extends ValueObject<NameProps> {
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

    public static create(props: NameProps): Result<LastName> {
        const result = Guard.againstNullOrUndefined(props.value, "Apellido");
        if (result.isFailure) {
            return Result.fail<LastName>(result.getErrorValue());
        }
        if (typeof props.value !== "string") {
            return Result.fail<LastName>("Apellido debe ser un texto");
        }
        if (!this.validate(props.value)) {
            return Result.fail<LastName>("Ingresa tu apellido");
        }

        return Result.ok<LastName>(new LastName(props));
    }
}

import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Couple } from "./couple";
import { Participant } from "./participant";

export type InscribedProps = {
    position?: number | null;
    participant?: Participant | null;
    couple?: Couple | null;
};

export class Inscribed extends ValueObject<InscribedProps> {
    get position(): number | null {
        return this.props.position!;
    }

    get participant(): Participant | null {
        return this.props.participant!;
    }

    get couple(): Couple | null {
        return this.props.couple!;
    }

    setPosition(value: number) {
        this.props.position = value;
    }

    setParticipant(p: Participant) {
        this.props.participant = p;
    }

    setCouple(c: Couple) {
        this.props.couple = c;
    }

    private constructor(props: InscribedProps) {
        super(props);
    }
    public static create(props: InscribedProps): Result<Inscribed> {
        if (!props.participant && !props.couple) {
            return Result.fail("Debes inscribir un participante o una pareja");
        }

        return Result.ok(
            new Inscribed({
                position: props.position ?? null,
                participant: props.participant ?? null,
                couple: props.couple ?? null,
            })
        );
    }
}

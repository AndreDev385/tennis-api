import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { ContestTeam } from "./contestTeam";
import { Couple } from "./couple";
import { Participant } from "./participant";

export type InscribedProps = {
    position?: number | null;
    participant?: Participant | null;
    couple?: Couple | null;
    team?: ContestTeam | null;
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

    get team(): ContestTeam | null {
        return this.props.team!;
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

    setTeam(t: ContestTeam) {
        this.props.team = t;
    }

    private constructor(props: InscribedProps) {
        super(props);
    }
    public static create(props: InscribedProps): Result<Inscribed> {
        if (!props.participant && !props.couple && !props.team) {
            return Result.fail(
                "Debes inscribir un participante, una pareja o un equipo!"
            );
        }

        return Result.ok(
            new Inscribed({
                position: props.position ?? null,
                participant: props.participant ?? null,
                couple: props.couple ?? null,
                team: props.team ?? null,
            })
        );
    }
}

import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { CoupleId } from "./coupleId";
import { Participant } from "./participant";

type CoupleProps = {
	p1: Participant;
	p2: Participant;
};

export class Couple extends Entity<CoupleProps> {
	get coupleId(): CoupleId {
		return CoupleId.create(this._id).getValue();
	}
	get p1(): Participant {
		return this.props.p1;
	}
	get p2(): Participant {
		return this.props.p2;
	}

	setP1(p: Participant) {
		if (this.props.p1.equals(p)) {
			return;
		}
		this.props.p1 = p;
	}

	setP2(p: Participant) {
		if (this.props.p2.equals(p)) {
			return;
		}
		this.props.p2 = p;
	}

	private constructor(props: CoupleProps, id?: UniqueEntityID) {
		super(props, id);
	}

	public static create(
		props: CoupleProps,
		id?: UniqueEntityID,
	): Result<Couple> {
		const guard = Guard.againstNullOrUndefinedBulk([
			{ argument: props.p1, argumentName: "participante 1" },
			{ argument: props.p2, argumentName: "participante 2" },
		]);

		if (guard.isFailure) {
			return Result.fail(guard.getErrorValue());
		}

		return Result.ok<Couple>(new Couple(props, id));
	}
}

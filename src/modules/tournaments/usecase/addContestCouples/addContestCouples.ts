import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { CI } from "../../../users/domain/ci";
import { Name } from "../../../users/domain/names";
import { User } from "../../../users/domain/user";
import { UserRepository } from "../../../users/repositories/userRepo";
import { Contest } from "../../domain/contest";
import { Couple } from "../../domain/couple";
import { Inscribed } from "../../domain/inscribed";
import { Participant } from "../../domain/participant";
import { ContestRepository } from "../../repository/contestRepo";
import { CoupleRepository } from "../../repository/coupleRepo";
import { ParticipantRepo } from "../../repository/participantRepo";
import {
    NewCoupleRecord,
    RegisterCouplesRepository,
} from "../../repository/registerCouplesRepo";
import { AddContestCouplesDto } from "./addContestCouplesDto";

type Response = Either<AppError.UnexpectedError | Result<string>, string[]>;

export class AddContestCouples
    implements UseCase<AddContestCouplesDto, Response>
{
    private readonly registerCouplesRepo: RegisterCouplesRepository;
    private readonly coupleRepo: CoupleRepository;
    private readonly contestRepo: ContestRepository;
    private readonly useRepo: UserRepository;
    private readonly participantRepo: ParticipantRepo;

    constructor(
        registerCouplesRepo: RegisterCouplesRepository,
        coupleRepo: CoupleRepository,
        contestRepo: ContestRepository,
        userRepo: UserRepository,
        participantRepo: ParticipantRepo
    ) {
        this.registerCouplesRepo = registerCouplesRepo;
        this.coupleRepo = coupleRepo;
        this.contestRepo = contestRepo;
        this.useRepo = userRepo;
        this.participantRepo = participantRepo;
    }

    async execute(req: AddContestCouplesDto): Promise<Response> {
        let contest: Contest;

        let newRecords: NewCoupleRecord[] = [];

        let inscribedList: Inscribed[] = [];

        try {
            try {
                contest = await this.contestRepo.get({
                    contestId: req.contestId,
                });
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            for (const r of req.couples) {
                const newRecord: NewCoupleRecord = {
                    couple: null,
                };

                let user1: User;
                try {
                    user1 = await this.useRepo.get({ ci: r.p1.ci });
                } catch (error) {
                    const mustFirstName = Name.create({
                        value: r.p1.firstName.trim(),
                    });
                    const mustLastName = Name.create({
                        value: r.p1.lastName.trim(),
                    });
                    const mustCI = CI.create({ value: r.p1.ci });

                    const result = Result.combine([
                        mustFirstName,
                        mustLastName,
                        mustCI,
                    ]);

                    if (result.isFailure) {
                        return left(
                            Result.fail<string>(result.getErrorValue())
                        );
                    }

                    const mustUser = User.create({
                        firstName: mustFirstName.getValue(),
                        lastName: mustLastName.getValue(),
                        ci: mustCI.getValue(),
                    });

                    if (mustUser.isFailure) {
                        return left(
                            Result.fail<string>(`${mustUser.getErrorValue()}`)
                        );
                    }

                    user1 = mustUser.getValue();

                    newRecord.user1 = user1;
                }

                let user2: User;
                try {
                    user2 = await this.useRepo.get({ ci: r.p2.ci });
                } catch (error) {
                    const mustFirstName = Name.create({
                        value: r.p2.firstName.trim(),
                    });
                    const mustLastName = Name.create({
                        value: r.p2.lastName.trim(),
                    });
                    const mustCI = CI.create({ value: r.p2.ci });

                    const result = Result.combine([
                        mustFirstName,
                        mustLastName,
                        mustCI,
                    ]);

                    if (result.isFailure) {
                        return left(
                            Result.fail<string>(result.getErrorValue())
                        );
                    }

                    const mustUser = User.create({
                        firstName: mustFirstName.getValue(),
                        lastName: mustLastName.getValue(),
                        ci: mustCI.getValue(),
                    });

                    if (mustUser.isFailure) {
                        return left(
                            Result.fail<string>(`${mustUser.getErrorValue()}`)
                        );
                    }

                    user2 = mustUser.getValue();

                    newRecord.user2 = user2;
                }

                let participant1: Participant;

                try {
                    participant1 = await this.participantRepo.get({
                        userId: user1.userId.id.toString(),
                    });
                } catch (error) {
                    participant1 = Participant.create({
                        user: user1,
                    }).getValue();

                    newRecord.participant1 = participant1;
                }

                let participant2: Participant;

                try {
                    participant2 = await this.participantRepo.get({
                        userId: user2.userId.id.toString(),
                    });
                } catch (error) {
                    participant2 = Participant.create({
                        user: user2,
                    }).getValue();

                    newRecord.participant2 = participant2;
                }

                let couple: Couple;

                try {
                    couple = await this.coupleRepo.get({
                        participantsId: {
                            p1Id: participant1.participantId.id.toString(),
                            p2Id: participant2.participantId.id.toString(),
                        },
                    });

                    console.log("EXIST COUPLE", couple);
                } catch (error) {
                    console.log(error, "ENTER error")
                    const mustCouple = Couple.create({
                        p1: participant1,
                        p2: participant2,
                    });

                    if (mustCouple.isFailure) {
                        return left(
                            Result.fail<string>(`${mustCouple.getErrorValue()}`)
                        );
                    }

                    newRecord.couple = mustCouple.getValue();
                    couple = mustCouple.getValue();
                }

                console.log(couple, "before inscribe")

                const inscribe = Inscribed.create({
                    couple: couple,
                    position: r.position,
                });

                if (inscribe.isFailure) {
                    return left(
                        Result.fail<string>(`${inscribe.getErrorValue()}`)
                    );
                }

                inscribedList.push(inscribe.getValue());

                console.log("RECORD", newRecord)

                newRecords.push(newRecord);
            }

            const result =
                await this.registerCouplesRepo.registerBulk(newRecords);

            const coupleIdsWithErr = result.errors.map((r) => r.coupleId);

            console.log(inscribedList, "inscribedList");

            inscribedList.filter(
                (i) =>
                    !coupleIdsWithErr.includes(i.couple!.coupleId.id.toString())
            );

            contest.inscribeParticipants(inscribedList);

            await this.contestRepo.save(contest);

            return right(result.errors.map((e) => e.error));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}

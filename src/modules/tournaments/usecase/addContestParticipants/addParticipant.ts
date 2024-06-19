import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { GameMode } from "../../../league/domain/gameMode";
import { CI } from "../../../users/domain/ci";
import { Name } from "../../../users/domain/names";
import { User } from "../../../users/domain/user";
import { UserRepository } from "../../../users/repositories/userRepo";
import { Contest } from "../../domain/contest";
import { Inscribed } from "../../domain/inscribed";
import { Participant } from "../../domain/participant";
import { ContestRepository } from "../../repository/contestRepo";
import { ParticipantRepo } from "../../repository/participantRepo";
import {
    NewParticipantRecord,
    RegisterParticipantsRepository,
} from "../../repository/registerParticipantsRepo";
import { AddContestParticipantsDto } from "./addParticipantsDto";

type Response = Either<
    AppError.NotFoundError | AppError.NotFoundError,
    Result<string[]>
>;

export class AddContestParticipants
    implements UseCase<AddContestParticipantsDto, Response>
{
    private readonly contestRepo: ContestRepository;
    private readonly participantRepo: ParticipantRepo;
    private readonly userRepo: UserRepository;
    private readonly registerParticipants: RegisterParticipantsRepository;

    constructor(
        contestRepo: ContestRepository,
        participantRepo: ParticipantRepo,
        userRepo: UserRepository,
        registerParticipants: RegisterParticipantsRepository
    ) {
        this.contestRepo = contestRepo;
        this.participantRepo = participantRepo;
        this.userRepo = userRepo;
        this.registerParticipants = registerParticipants;
    }

    async execute(req: AddContestParticipantsDto): Promise<Response> {
        let contest: Contest;

        let newRecords: NewParticipantRecord[] = [];

        let inscribedList: Inscribed[] = [];

        try {
            try {
                contest = await this.contestRepo.get({
                    contestId: req.contestId,
                });
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            if (contest.mode.value != GameMode.single) {
                return left(
                    Result.fail(
                        "Debes inscribir jugadores para un concurso de single"
                    )
                );
            }

            for (const p of req.participants) {
                const mustFirstName = Name.create({
                    value: p.firstName.trim(),
                });
                const mustLastName = Name.create({ value: p.lastName.trim() });
                const mustCI = CI.create({ value: p.ci });

                const result = Result.combine([
                    mustFirstName,
                    mustLastName,
                    mustCI,
                ]);

                if (result.isFailure) {
                    return left(result);
                }

                const mustUser = User.create({
                    firstName: mustFirstName.getValue(),
                    lastName: mustLastName.getValue(),
                    ci: mustCI.getValue(),
                });
                /* Build user object */
                let newUser: User = mustUser.getValue();

                /* Build participant object */
                let newParticipant: Participant = Participant.create({
                    user: newUser,
                }).getValue();

                let userAlreadyExist: User;
                let participantAlreadyExist: Participant;
                try {
                    userAlreadyExist = await this.userRepo.get({ ci: p.ci });
                    try {
                        participantAlreadyExist =
                            await this.participantRepo.get({
                                userId: userAlreadyExist.userId.id.toString(),
                            });

                        // Participant already exist
                        addParticipantToList(
                            Inscribed.create({
                                participant: participantAlreadyExist,
                                position: p.position ?? null,
                            }).getValue(),
                            inscribedList
                        );
                    } catch (_) {
                        // Add participant to save
                        let newParticipant = Participant.create({
                            user: userAlreadyExist
                        }).getValue();

                        newRecords.push({
                            participant: newParticipant
                        });

                        addParticipantToList(
                            Inscribed.create({
                                participant: newParticipant,
                                position: p.position ?? null,
                            }).getValue(),
                            inscribedList
                        );
                    }
                } catch (_) {
                    // Add user and participant to save
                    newRecords.push({
                        user: newUser,
                        participant: newParticipant,
                    });
                    addParticipantToList(
                        Inscribed.create({
                            participant: newParticipant,
                            position: p.position ?? null,
                        }).getValue(),
                        inscribedList
                    );
                }
            }

            const result =
                await this.registerParticipants.registerBulk(newRecords);

            const ciWithError = result.errors.map((e) => e.ci);

            // remove participants that fail in creation
            inscribedList = inscribedList.filter(
                (p) => !ciWithError.includes(p.participant!.user.ci!.value)
            );

            contest.inscribe(inscribedList);

            await this.contestRepo.save(contest);

            return right(
                Result.ok<string[]>(result.errors.map((e) => e.error))
            );
        } catch (error) {
            console.log(error, "ERROR SAVING CONTEST");
            return left(new AppError.UnexpectedError(error));
        }
    }
}

function addParticipantToList(
    p: Inscribed,
    list: Array<Inscribed>
): Array<Inscribed> {
    const positionAlreadyExist = list.find(
        (i) => p.position != null && p.position == i.position
    );

    if (positionAlreadyExist) {
        return list;
    }

    list.push(p);

    return list;
}

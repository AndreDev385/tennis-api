import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { CI } from "../../../users/domain/ci";
import { Name } from "../../../users/domain/names";
import { User } from "../../../users/domain/user";
import { UserRepository } from "../../../users/repositories/userRepo";
import { ContestTeam } from "../../domain/contestTeam";
import { Participant } from "../../domain/participant";
import { ContestTeamRepository } from "../../repository/contestTeamRepo";
import { ParticipantRepo } from "../../repository/participantRepo";
import {
    NewParticipantRecord,
    RegisterParticipantsRepository,
} from "../../repository/registerParticipantsRepo";

type Req = {
    contestTeamId: string;
    participants: Array<{
        firstName: string;
        lastName: string;
        ci: string;
    }>;
};

type Res = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<string[]>
>;

export class AddParticipantsToTeam implements UseCase<Req, Res> {
    private readonly ctr: ContestTeamRepository;
    private readonly participantRepo: ParticipantRepo;
    private readonly userRepo: UserRepository;
    private readonly registerParticipants: RegisterParticipantsRepository;

    constructor(
        ctr: ContestTeamRepository,
        pr: ParticipantRepo,
        ur: UserRepository,
        registerParticipants: RegisterParticipantsRepository
    ) {
        this.ctr = ctr;
        this.userRepo = ur;
        this.participantRepo = pr;
        this.registerParticipants = registerParticipants;
    }

    async execute(request: Req): Promise<Res> {
        let team: ContestTeam;
        let participants: Participant[] = [];

        let newRecords: NewParticipantRecord[] = [];
        try {
            const maybeTeam = await this.ctr.get({
                contestTeamId: request.contestTeamId,
            });

            if (maybeTeam.isFailure) {
                return left(new AppError.NotFoundError("Equipo no encontrado"));
            }

            team = maybeTeam.getValue();

            // Find participants
            for (const p of request.participants) {
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
                let user: User = mustUser.getValue();

                /* Build participant object */
                let participant: Participant = Participant.create({
                    user,
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
                        participants.push(participantAlreadyExist);
                    } catch (_) {
                        // Add participant to save
                        newRecords.push({ participant });
                        participants.push(participant);
                    }
                } catch (_) {
                    // Add user and participant to save
                    newRecords.push({
                        user,
                        participant,
                    });
                    participants.push(participant);
                }
            }

            // register participants that dont exist
            const result =
                await this.registerParticipants.registerBulk(newRecords);

            // remove participants that fail in registration
            const ciWithError = result.errors.map((e) => e.ci);
            participants = participants.filter(
                (p) => !ciWithError.includes(p.user.ci!.value)
            );

            // check if participant already exist in another team
            let count = 0;
            const maybeParticipantAlreadyRegistered = await this.ctr.get({
                contestId: team.contestId.id.toString(),
                participantsIds: participants.map((p, idx) => {
                    count = idx;

                    return p.participantId.id.toString();
                }),
            });

            if (maybeParticipantAlreadyRegistered.isSuccess) {
                return left(
                    Result.fail<string>(
                        `El participante ${participants[count].user.firstName.value} ${participants[count].user.lastName.value} ya esta inscrito en un equipo`
                    )
                );
            }

            team.addParticipantsIds(participants.map((p) => p.participantId));

            await this.ctr.save(team);

            return right(
                Result.ok<string[]>(result.errors.map((e) => e.error))
            );
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}

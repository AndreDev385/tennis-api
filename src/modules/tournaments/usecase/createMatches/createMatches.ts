import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { GameMode, Mode } from "../../../league/domain/gameMode";
import { MatchStatus, MatchStatuses } from "../../../league/domain/matchStatus";
import { Sets } from "../../../league/domain/sets";
import { Surface } from "../../../league/domain/surface";
import { Contest } from "../../domain/contest";
import { ContestClash } from "../../domain/contestClash";
import { Participant } from "../../domain/participant";
import { Tournament } from "../../domain/tournament";
import { TournamentMatch } from "../../domain/tournamentMatch";
import { TournamentMatchesIds } from "../../domain/tournamentMatches";
import { ContestClashRepository } from "../../repository/contestClashRepo";
import { ContestRepository } from "../../repository/contestRepo";
import { ParticipantRepo } from "../../repository/participantRepo";
import { TournamentMatchRepo } from "../../repository/tournamentMatchRepo";
import { TournamentRepository } from "../../repository/tournamentRepo";

type MatchData = {
    mode: string;
    p1Id: string;
    p2Id: string;
    p3Id?: string;
    p4Id?: string;
};

type Req = {
    surface: string;
    clashId: string;
    matches: Array<MatchData>;
};

type Res = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class CreateClashMatches implements UseCase<Req, Res> {
    private readonly clashRepo: ContestClashRepository;
    private readonly matchRepo: TournamentMatchRepo;
    private readonly tournamentRepo: TournamentRepository;
    private readonly contestRepo: ContestRepository;
    private readonly participantRepo: ParticipantRepo;

    constructor(
        ccr: ContestClashRepository,
        mr: TournamentMatchRepo,
        tr: TournamentRepository,
        cr: ContestRepository,
        pr: ParticipantRepo
    ) {
        this.clashRepo = ccr;
        this.matchRepo = mr;
        this.tournamentRepo = tr;
        this.contestRepo = cr;
        this.participantRepo = pr;
    }

    async execute(request: Req): Promise<Res> {
        let clash: ContestClash;
        let contest: Contest;
        let tournament: Tournament;
        let matches: TournamentMatch[] = [];


        const maybeClash = await this.clashRepo.get({
            contestClashId: request.clashId,
        });

        if (maybeClash.isFailure) {
            return left(new AppError.NotFoundError(maybeClash.getErrorValue()));
        }

        clash = maybeClash.getValue();

        try {
            contest = await this.contestRepo.get({
                contestId: clash.contestId.id.toString(),
            });
        } catch (e) {
            return left(new AppError.NotFoundError(e));
        }

        try {
            tournament = await this.tournamentRepo.get({
                tournamentId: contest.tournamentId.id.toString(),
            });
        } catch (e) {
            return left(new AppError.NotFoundError(e));
        }

        for (const data of request.matches) {
            const maybeMode = Mode.create({ value: data.mode });
            const maybeSurface = Surface.create({ value: request.surface });

            const combine = Result.combine([maybeMode, maybeSurface]);

            if (combine.isFailure) {
                return left(Result.fail<string>(`${combine.getErrorValue()}`));
            }

            let p1: Participant;
            let p2: Participant;
            let p3: Participant | null = null;
            let p4: Participant | null = null;

            try {
                p1 = await this.participantRepo.get({
                    participantId: data.p1Id,
                });
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            try {
                p2 = await this.participantRepo.get({
                    participantId: data.p2Id,
                });
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            if (data.mode == GameMode.double) {
                try {
                    p3 = await this.participantRepo.get({
                        participantId: data.p3Id,
                    });
                } catch (error) {
                    return left(new AppError.NotFoundError(error));
                }

                try {
                    p4 = await this.participantRepo.get({
                        participantId: data.p4Id,
                    });
                } catch (error) {
                    return left(new AppError.NotFoundError(error));
                }
            }

            const maybeMatch = TournamentMatch.create({
                mode: maybeMode.getValue(),
                rules: tournament.rules,
                tournamentId: tournament.tournamentId,
                contestId: contest.contestId,
                status: MatchStatus.createNew(MatchStatuses.Waiting),
                surface: maybeSurface.getValue(),
                sets: Sets.createDefault(tournament.rules.setsQuantity.value),
                player1: p1,
                player2: p2,
                player3: p3,
                player4: p4,
                superTieBreak: false,
            });

            if (maybeMatch.isFailure) {
                return left(
                    Result.fail<string>(`${maybeMatch.getErrorValue()}`)
                );
            }

            const match = maybeMatch.getValue();

            matches.push(match);
        }

        const matchesIds = TournamentMatchesIds.create(
            matches.map((m) => m.matchId)
        );

        clash.setMatches(matchesIds);

        // TODO: no error handling if db fails
        for (const match of matches) {
            await this.matchRepo.save(match);
        }

        await this.clashRepo.save(clash);

        return right(Result.ok());
    }
}

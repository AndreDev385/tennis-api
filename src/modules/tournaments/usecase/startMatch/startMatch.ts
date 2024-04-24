import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { GameMode } from "../../../league/domain/gameMode";
import { MatchStatus, MatchStatuses } from "../../../league/domain/matchStatus";
import { Sets } from "../../../league/domain/sets";
import { Surface, Surfaces } from "../../../league/domain/surface";
import { BracketNode } from "../../domain/brackets";
import { Contest } from "../../domain/contest";
import { Tournament } from "../../domain/tournament";
import { TournamentMatch } from "../../domain/tournamentMatch";
import { TournamentMatchTracker } from "../../domain/tournamentMatchTracker";
import { BracketsRepository } from "../../repository/bracketsRepo";
import { ContestRepository } from "../../repository/contestRepo";
import { TournamentMatchRepo } from "../../repository/tournamentMatchRepo";
import { TournamentRepository } from "../../repository/tournamentRepo";

type Response = Either<
    AppError.UnexpectedError | AppError.UnexpectedError | Result<string>,
    Result<void>
>;

type Req = { bracketId: string };

export class StartMatch implements UseCase<Req, Response> {
    private matchRepo: TournamentMatchRepo;
    private bracketRepo: BracketsRepository;
    private contestRepo: ContestRepository;
    private tournamentRepo: TournamentRepository;

    constructor(
        matchRepo: TournamentMatchRepo,
        bracketRepo: BracketsRepository
    ) {
        this.matchRepo = matchRepo;
        this.bracketRepo = bracketRepo;
    }

    async execute(req: Req): Promise<Response> {
        let bracket: BracketNode;
        let contest: Contest;
        let tournament: Tournament;

        try {
            try {
                bracket = await this.bracketRepo.get({ id: req.bracketId });
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            try {
                contest = await this.contestRepo.get({
                    contestId: bracket.contestId.id.toString(),
                });
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            try {
                tournament = await this.tournamentRepo.get({
                    tournamentId: contest.tournamentId.id.toString(),
                });
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            if (bracket.match != null) {
                return left(Result.fail<string>("Ya se ha creado el partido"));
            }

            let player1 =
                contest.mode.value == GameMode.single
                    ? bracket.rightPlace.participant!
                    : bracket.rightPlace.couple!.p1;

            let player3 =
                contest.mode.value == GameMode.single
                    ? null
                    : bracket.rightPlace.couple!.p2;

            let player2 =
                contest.mode.value == GameMode.single
                    ? bracket.leftPlace.participant!
                    : bracket.leftPlace.couple!.p1;

            let player4 =
                contest.mode.value == GameMode.single
                    ? null
                    : bracket.leftPlace.couple!.p2;

            const mustMatch = TournamentMatch.create({
                mode: contest.mode,
                sets: Sets.create(),
                tournamentId: tournament.tournamentId,
                contestId: contest.contestId,
                rules: tournament.rules,
                status: MatchStatus.create({
                    value: MatchStatuses.Live,
                }).getValue(),
                surface: Surface.create({ value: Surfaces.hard }).getValue(),
                player1,
                player2,
                player3,
                player4,
                matchWon: false,
                superTieBreak: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            if (mustMatch.isFailure) {
                return left(Result.fail<string>(`${mustMatch.getErrorValue()}`));
            }

            const match = mustMatch.getValue();

            match.addTracker(
                TournamentMatchTracker.newEmptyTracker({
                    matchId: match.matchId,
                    isDouble: match.mode.value === GameMode.double,
                    tournamentId: match.tournamentId,
                    p1Id: player1.participantId,
                    p2Id: player2.participantId,
                    p3Id: player3?.participantId,
                    p4Id: player4?.participantId,
                })
            );

            await this.matchRepo.save(match);

            return right(Result.ok());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}

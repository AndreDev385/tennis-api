import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { GameMode } from "../../../league/domain/gameMode";
import { MatchStatus, MatchStatuses } from "../../../league/domain/matchStatus";
import { Sets } from "../../../league/domain/sets";
import { Surface } from "../../../league/domain/surface";
import { BracketNode } from "../../domain/brackets";
import { Contest } from "../../domain/contest";
import { Tournament } from "../../domain/tournament";
import { TournamentMatch } from "../../domain/tournamentMatch";
import { TournamentMatchTracker } from "../../domain/tournamentMatchTracker";
import { BracketsRepository } from "../../repository/bracketsRepo";
import { ContestRepository } from "../../repository/contestRepo";
import { TournamentMatchRepo } from "../../repository/tournamentMatchRepo";
import { TournamentRepository } from "../../repository/tournamentRepo";
import { TournamentMatchTrackerRepo } from "../../repository/trackerRepo";

type Response = Either<
    AppError.UnexpectedError | AppError.UnexpectedError | Result<string>,
    Result<void>
>;

type Req = { bracketId: string; surface: string };

export class CreateBracketMatch implements UseCase<Req, Response> {
    private matchRepo: TournamentMatchRepo;
    private bracketRepo: BracketsRepository;
    private contestRepo: ContestRepository;
    private tournamentRepo: TournamentRepository;
    private trackerRepo: TournamentMatchTrackerRepo;

    constructor(
        matchRepo: TournamentMatchRepo,
        bracketRepo: BracketsRepository,
        contestRepo: ContestRepository,
        tournamentRepo: TournamentRepository,
        trackerRepo: TournamentMatchTrackerRepo
    ) {
        this.matchRepo = matchRepo;
        this.bracketRepo = bracketRepo;
        this.contestRepo = contestRepo;
        this.tournamentRepo = tournamentRepo;
        this.trackerRepo = trackerRepo;
    }

    async execute(req: Req): Promise<Response> {
        let bracket: BracketNode;
        let contest: Contest;
        let tournament: Tournament;

        try {
            try {
                bracket = await this.bracketRepo.get(
                    { id: req.bracketId },
                    false
                );
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

            console.log("BRACKET MATCH", bracket.match);

            if (bracket.match != null) {
                return left(Result.fail<string>("Ya se ha creado el partido"));
            }

            let player1 =
                contest.mode.value == GameMode.single
                    ? bracket.rightPlace.participant
                    : bracket.rightPlace.couple?.p1;

            let player3 =
                contest.mode.value == GameMode.single
                    ? null
                    : bracket.rightPlace.couple?.p2;

            let player2 =
                contest.mode.value == GameMode.single
                    ? bracket.leftPlace.participant
                    : bracket.leftPlace.couple?.p1;

            let player4 =
                contest.mode.value == GameMode.single
                    ? null
                    : bracket.leftPlace.couple?.p2;

            console.log(
                player1,
                player2,
                player3,
                player4,
            )

            const INCOMPLETE_BRACKET_SINGLE =
                contest.mode.value == GameMode.single && (!player1 || !player2);

            console.log(INCOMPLETE_BRACKET_SINGLE);

            const INCOMPLETE_BRACKET_DOUBLE =
                contest.mode.value == GameMode.double &&
                (!player1 || !player2 || !player3 || !player4);


            console.log(INCOMPLETE_BRACKET_DOUBLE);

            if (INCOMPLETE_BRACKET_SINGLE || INCOMPLETE_BRACKET_DOUBLE) {
                return left(
                    Result.fail<string>(
                        "No se puede crear el partido de la llave seleccionada"
                    )
                );
            }

            const mustMatch = TournamentMatch.create({
                mode: contest.mode,
                sets: Sets.create(),
                tournamentId: tournament.tournamentId,
                contestId: contest.contestId,
                rules: tournament.rules,
                status: MatchStatus.create({
                    value: MatchStatuses.Waiting,
                }).getValue(),
                surface: Surface.create({ value: req.surface }).getValue(),
                player1: player1!,
                player2: player2!,
                player3,
                player4,
                matchWon: null,
                superTieBreak: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            if (mustMatch.isFailure) {
                return left(
                    Result.fail<string>(`${mustMatch.getErrorValue()}`)
                );
            }

            const match = mustMatch.getValue();

            const tracker = TournamentMatchTracker.newEmptyTracker({
                matchId: match.matchId,
                isDouble: match.mode.value === GameMode.double,
                tournamentId: match.tournamentId,
                p1Id: player1!.participantId,
                p2Id: player2!.participantId,
                p3Id: player3?.participantId,
                p4Id: player4?.participantId,
            });

            match.addTracker(tracker);
            bracket.setMatch(match);

            await this.bracketRepo.save(bracket);
            await this.trackerRepo.save(tracker);
            await this.matchRepo.save(match);

            return right(Result.ok());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}

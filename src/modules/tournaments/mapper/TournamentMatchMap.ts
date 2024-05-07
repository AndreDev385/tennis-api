import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Mode } from "../../league/domain/gameMode";
import { GamesPerSet } from "../../league/domain/gamesPerSet";
import { MatchStatus } from "../../league/domain/matchStatus";
import { Set } from "../../league/domain/set";
import { SetQuantity } from "../../league/domain/setQuantity";
import { Sets } from "../../league/domain/sets";
import { Surface } from "../../league/domain/surface";
import { GameMap } from "../../league/mappers/gameMap";
import {
    DoubleServeFlowMap,
    SingleServeFlowMap,
} from "../../league/mappers/serveFlowMap";
import { SetMap } from "../../league/mappers/setMap";
import { ContestId } from "../domain/contestId";
import { MatchInfo } from "../domain/matchInfo";
import { Participant } from "../domain/participant";
import { TournamentId } from "../domain/tournamentId";
import { TournamentMatch } from "../domain/tournamentMatch";
import { TournamentMatchTracker } from "../domain/tournamentMatchTracker";
import { TournamentRules } from "../domain/tournamentRules";
import { TournamentMatchDto } from "../dtos/matchDto";
import { ParticipantMap } from "./ParticipantMap";
import { TournamentMatchTrackerMap } from "./TournamentMatchTrackerMap";

type BuildMatch = {
    player1: Participant;
    player2: Participant;
    player3: Participant | null;
    player4: Participant | null;
    tracker: TournamentMatchTracker | null;
    matchId: string;
    tournamentId: string;
    contestId: string;
    rules: string;
    mode: string;
    surface: string;
    sets: string[];
    superTieBreak: boolean;
    status: number;
    matchInfo?: string;
    matchWon?: boolean | null;
    createdAt?: Date;
    updatedAt?: Date;
};

export class TournamentMatchMap implements Mapper<TournamentMatch> {
    public static toDto(match: TournamentMatch): TournamentMatchDto {
        return {
            matchId: match.matchId.id.toString(),
            tournamentId: match.tournamentId.id.toString(),
            contestId: match.contestId.id.toString(),
            rules: {
                gamesPerSet: match.rules.gamesPerSet.value,
                setsQuantity: match.rules.setsQuantity.value,
            },
            mode: match.mode.value,
            surface: match.surface.value,
            sets: match.sets.getItems().map((s) => SetMap.toDto(s)),
            superTieBreak: match.superTieBreak,
            participant1: ParticipantMap.toDto(match.player1),
            participant2: ParticipantMap.toDto(match.player2),
            participant3: match.player3
                ? ParticipantMap.toDto(match.player3)
                : null,
            participant4: match.player4
                ? ParticipantMap.toDto(match.player4)
                : null,
            tracker: TournamentMatchTrackerMap.toDto(match.tracker)!,
            status: match.status.value,
            matchInfo: {
                currentSetIdx: match.matchInfo?.currentSetIdx ?? null,
                currentGame: GameMap.toDto(
                    match.matchInfo?.currentGame ?? null
                ),
                setsWon: match.matchInfo?.setsWon,
                setsLost: match.matchInfo?.setsLost,
                matchFinish: match.matchInfo?.matchFinish ?? null,
                superTiebreak: match.matchInfo?.superTieBreak,
                initialTeam: match.matchInfo?.initialTeam,
                doubleServeFlow: DoubleServeFlowMap.toDto(
                    match.matchInfo?.doubleServeFlow
                ),
                singleServeFlow: SingleServeFlowMap.toDto(
                    match.matchInfo?.singleServeFlow
                ),
            },
            matchWon: match.matchWon,
            createdAt: match.createdAt,
            updatedAt: match.updatedAt,
        };
    }

    public static toPersistance(match: TournamentMatch) {
        return {
            matchId: match.matchId.id.toString(),
            tournamentId: match.tournamentId.id.toString(),
            contestId: match.contestId.id.toString(),
            rules: JSON.stringify({
                gamesPerSet: match.rules.gamesPerSet.value,
                setsQuantity: match.rules.setsQuantity.value,
            }),
            mode: match.mode.value,
            surface: match.surface.value,
            sets: match.sets.getItems().map((s) => SetMap.toPersistance(s)),
            superTieBreak: match.superTieBreak,
            player1Id: match.player1.participantId.id.toString(),
            player2Id: match.player2.participantId.id.toString(),
            player3Id: match.player3?.participantId.id.toString(),
            player4Id: match.player4?.participantId.id.toString(),
            trackerId: match.tracker?.trackerId.id.toString(),
            status: match.status.value,
            matchInfo: JSON.stringify({
                currentSetIdx: match.matchInfo?.currentSetIdx,
                currentGame: GameMap.toDto(match.matchInfo?.currentGame!),
                setsWon: match.matchInfo?.setsWon,
                setsLost: match.matchInfo?.setsLost,
                matchFinish: match.matchInfo?.matchFinish,
                superTieBreak: match.matchInfo?.superTieBreak,
                initialTeam: match.matchInfo?.initialTeam,
                doubleServeFlow: DoubleServeFlowMap.toDto(
                    match.matchInfo?.doubleServeFlow
                ),
                singleServeFlow: SingleServeFlowMap.toDto(
                    match.matchInfo?.singleServeFlow
                ),
            }),
            matchWon: match.matchWon,
            createdAt: match.createdAt,
            updatedAt: match.updatedAt,
        };
    }

    public static toDomain(raw: BuildMatch) {
        const setsArr = raw.sets.map((s: any) => SetMap.toDomain(s));

        const sets = Sets.create(setsArr as Set[]);

        const rawRules = JSON.parse(raw.rules);

        let matchInfo: any = null;

        if (raw.matchInfo != null) {
            matchInfo = JSON.parse(raw.matchInfo);
        }

        return TournamentMatch.create(
            {
                contestId: ContestId.create(
                    new UniqueEntityID(raw.contestId)
                ).getValue(),
                tournamentId: TournamentId.create(
                    new UniqueEntityID(raw.tournamentId)
                ).getValue(),
                mode: Mode.create({ value: raw.mode }).getValue(),
                sets,
                rules: TournamentRules.create({
                    gamesPerSet: GamesPerSet.create({
                        value: rawRules.gamesPerSet,
                    }).getValue(),
                    setsQuantity: SetQuantity.create({
                        value: rawRules.setsQuantity,
                    }).getValue(),
                }).getValue(),
                status: MatchStatus.create({ value: raw.status }).getValue(),
                player1: raw.player1,
                player2: raw.player2,
                player3: raw.player3,
                player4: raw.player4,
                surface: Surface.create({ value: raw.surface }).getValue(),
                superTieBreak: raw.superTieBreak,
                matchInfo: raw.matchInfo
                    ? MatchInfo.create({
                        currentSetIdx: matchInfo?.currentSetIdx,
                        currentGame: GameMap.toDomain(matchInfo?.currentGame),
                        setsWon: matchInfo?.setsWon,
                        setsLost: matchInfo?.setsLost,
                        matchFinish: matchInfo?.matchFinish,
                        superTieBreak: matchInfo?.superTieBreak,
                        initialTeam: matchInfo?.initialTeam,
                        doubleServeFlow: DoubleServeFlowMap.toDomain(
                            matchInfo.doubleServeFlow
                        ),
                        singleServeFlow: SingleServeFlowMap.toDomain(
                            matchInfo.singleServeFlow
                        ),
                    }).getValue()
                    : undefined,
                tracker: raw.tracker,
                matchWon: raw.matchWon,
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt,
            },
            new UniqueEntityID(raw.matchId)
        ).getValue();
    }
}

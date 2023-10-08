import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Mode } from "../domain/gameMode";
import { GamesPerSet } from "../domain/gamesPerSet";
import { MatchId } from "../domain/matchId";
import { PausedMatch } from "../domain/pausedMatch";
import { SetQuantity } from "../domain/setQuantity";
import { Sets } from "../domain/sets";
import { Surface } from "../domain/surface";
import { GameMap } from "./gameMap";
import { DoubleServeFlowMap, SingleServeFlowMap } from "./serveFlowMap";
import { SetMap } from "./setMap";
import { TrackerMap } from "./trackerMap";

export class PausedMatchMap implements Mapper<PausedMatch> {
    public static toPersistance(obj: PausedMatch) {
        return {
            matchId: obj.matchId.id.toString(),
            mode: obj.mode.value,
            setsQuantity: obj.setsQuantity.value,
            surface: obj.surface.value,
            gamesPerSet: obj.gamesPerSet.value,
            superTiebreak: obj.superTiebreak,
            direction: obj.direction,
            statistics: obj.statistics,
            //tracker: obj.tracker.,
            player1: obj.player1,
            player2: obj.player2,
            player3: obj.player3,
            player4: obj.player4,
            initialTeam: obj.initialTeam,
            doubleServeFlow: JSON.stringify(DoubleServeFlowMap.toDto(obj.doubleServeFlow)),
            singleServeFlow: JSON.stringify(SingleServeFlowMap.toDto(obj.singleServeFlow)),
            sets: obj.sets.getItems().map((set) => SetMap.toPersistance(set)),
            currentSetIdx: obj.currentSetIdx,
            currentGame: JSON.stringify(GameMap.toDto(obj.currentGame)),
            setsWon: obj.setsWon,
            setsLost: obj.setsLost,
            matchWon: obj.matchWon,
            matchFinish: obj.matchFinish,
        }
    }

    public static toDomain(raw: any): PausedMatch {
        const setsArr = raw.sets.map((s) => SetMap.toDomain(s));

        const modeOrError = Mode.create({ value: raw.mode });
        const surfaceOrError = Surface.create({ value: raw.surface });
        const setsQuantityOrError = SetQuantity.create({
            value: raw.setsQuantity,
        });
        const gamesPerSetOrError = GamesPerSet.create({
            value: raw.gamesPerSet,
        });
        const sets = Sets.create(setsArr);

        const matchOrError = PausedMatch.create({
            matchId: MatchId.create(new UniqueEntityID(raw.matchId)).getValue(),
            mode: modeOrError.getValue(),
            setsQuantity: setsQuantityOrError.getValue(),
            surface: surfaceOrError.getValue(),
            gamesPerSet: gamesPerSetOrError.getValue(),
            superTiebreak: raw.superTiebreak,
            direction: raw.direction,
            statistics: raw.statistics,
            tracker: raw.tracker,
            player1: raw.player1,
            player2: raw.player2,
            player3: raw.player3,
            player4: raw.player4,
            initialTeam: raw.initialTeam,
            doubleServeFlow: DoubleServeFlowMap.toDomain(raw.doubleServeFlow),
            singleServeFlow: SingleServeFlowMap.toDomain(raw.singleServeFlow),
            sets,
            currentSetIdx: raw.currentSetIdx,
            currentGame: GameMap.toDomain(raw.currentGame),
            setsWon: raw.setsWon,
            setsLost: raw.setsLost,
            matchWon: raw.matchWon,
            matchFinish: raw.matchFinish,
        })

        matchOrError.isFailure && console.log(matchOrError.getErrorValue())

        return matchOrError.isSuccess ? matchOrError.getValue() : null;
    }

    public static toDto(obj: PausedMatch) {
        console.log("toDto", obj.setsWon)
        return {
            matchId: obj.matchId.id.toString(),
            mode: obj.mode.value,
            setsQuantity: obj.setsQuantity.value,
            surface: obj.surface.value,
            gamesPerSet: obj.gamesPerSet.value,
            superTiebreak: obj.superTiebreak,
            direction: obj.direction,
            statistics: obj.statistics,
            tracker: TrackerMap.toDto(obj.tracker),
            player1: obj.player1,
            player2: obj.player2,
            player3: obj.player3,
            player4: obj.player4,
            initialTeam: obj.initialTeam,
            doubleServeFlow: DoubleServeFlowMap.toDto(obj.doubleServeFlow),
            singleServeFlow: SingleServeFlowMap.toDto(obj.singleServeFlow),
            sets: obj.sets.getItems().map((set) => SetMap.toDto(set)),
            currentSetIdx: obj.currentSetIdx,
            currentGame: GameMap.toDto(obj.currentGame),
            setsWon: obj.setsWon,
            setsLost: obj.setsLost,
            matchWon: obj.matchWon,
            matchFinish: obj.matchFinish,
        }
    }
}

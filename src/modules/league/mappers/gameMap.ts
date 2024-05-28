import { Mapper } from "../../../shared/infra/Mapper";
import { Game } from "../domain/game";
import { GameDto } from "../dtos/gameDto";

export class GameMap implements Mapper<Game> {
    public static toDto(game: Game | null): GameDto | null {
        if (!game) {
            return null
        }
        return {
            superTiebreak: game.superTiebreak,
            pointsToWin: game.pointsToWin,
            deucePoints: game.deucePoints,
            tieBreak: game.tieBreak,
            rivalPoints: game.rivalPoints,
            winGame: game.winGame,
            loseGame: game.loseGame,
            myPoints: game.myPoints,
        }
    }

    public static toDomain(raw: any): Game | null {
        let object: any
        if (!raw) {
            return null;
        }
        if (typeof raw == "string") {
            object = JSON.parse(raw)
        } else {
            object = {
                superTiebreak: raw.superTiebreak,
                pointsToWin: raw.pointsToWin,
                deucePoints: raw.deucePoints,
                tieBreak: raw.tieBreak,
                rivalPoints: raw.rivalPoints,
                winGame: raw.winGame,
                loseGame: raw.loseGame,
                myPoints: raw.myPoints,
            }
        }

        const gameOrError = Game.create(object)

        gameOrError.isFailure && console.log(gameOrError.getErrorValue())

        return gameOrError.isSuccess ? gameOrError.getValue() : null
    }
}

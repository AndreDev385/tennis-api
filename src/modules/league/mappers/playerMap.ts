import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { FirstName, LastName } from "../../users/domain/names";
import { UserId } from "../../users/domain/userId";
import { ClubId } from "../domain/clubId";
import { Player } from "../domain/player";
import { PlayerDto } from "../dtos/playerDto";

export class PlayerMap implements Mapper<Player> {
    public static toDomain(raw: any): Player {
        const firstNameOrError = FirstName.create({
            value: raw.user.firstName,
        });
        const lastNameOrError = LastName.create({ value: raw.user.lastName });
        const clubIdOrError = ClubId.create(new UniqueEntityID(raw.clubId));
        const userIdOrError = UserId.create(new UniqueEntityID(raw.userId));

        const playerOrError = Player.create(
            {
                clubId: clubIdOrError.getValue(),
                userId: userIdOrError.getValue(),
                firstName: firstNameOrError.getValue(),
                lastName: lastNameOrError.getValue(),
            },
            new UniqueEntityID(raw.playerId)
        );

        playerOrError.isFailure
            ? console.log(playerOrError.getErrorValue())
            : "";

        return playerOrError.isSuccess ? playerOrError.getValue() : null;
    }

    public static toPersistance(player: Player) {
        return {
            playerId: player.playerId.id.toString(),
            clubId: player.clubId.id.toString(),
            userId: player.userId.id.toString(),
        };
    }

    public static toDto(player: Player): PlayerDto {
        return {
            playerId: player.playerId.id.toString(),
            clubId: player.clubId.id.toString(),
            user: {
                userId: player.userId.id.toString(),
                firstName: player.firstName.value,
                lastName: player.lastName.value,
            },
        };
    }
}

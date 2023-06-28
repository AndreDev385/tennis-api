import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Team } from "../domain/team";
import { TeamDto } from "../dtos/teamDto";
import { ClubMap } from "./clubMap";

export class TeamMap implements Mapper<Team> {
    public static toPersistance(team: Team) {
        return {
            teamId: team.teamId.id.toString(),
            clubId: team.club.clubId.id.toString(),
            name: team.name,
        };
    }

    public static toDomain(raw: any): Team {
        const club = ClubMap.toDomain(raw.club);

        const teamOrError = Team.create(
            {
                club,
                name: raw.name,
            },
            new UniqueEntityID(raw.teamId)
        );

        teamOrError.isFailure &&
            console.log("TEAM", teamOrError.getErrorValue());

        return teamOrError.isSuccess ? teamOrError.getValue() : null;
    }

    public static toDto(team: Team): TeamDto {
        console.log(team)
        return {
            club: team.club.name,
            name: team.name,
        };
    }
}

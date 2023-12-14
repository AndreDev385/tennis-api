import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Team } from "../domain/team";
import { TeamDto } from "../dtos/teamDto";
import { CategoryMap } from "./categoryMap";
import { ClubMap } from "./clubMap";

export class TeamMap implements Mapper<Team> {
    public static toPersistance(team: Team) {
        return {
            teamId: team.teamId.id.toString(),
            clubId: team.club.clubId.id.toString(),
            categoryId: team.category.categoryId.id.toString(),
            isDeleted: team.isDeleted,
            name: team.name,
        };
    }

    public static toDomain(raw: any): Team | null {
        const club = ClubMap.toDomain(raw.club);
        const category = CategoryMap.toDomain(raw.category);

        const teamOrError = Team.create(
            {
                club: club!,
                name: raw.name,
                category: category!,
                isDeleted: raw.isDeleted,
            },
            new UniqueEntityID(raw.teamId)
        );

        teamOrError.isFailure &&
            console.log("TEAM", teamOrError.getErrorValue());

        return teamOrError.isSuccess ? teamOrError.getValue() : null;
    }

    public static toDto(team: Team): TeamDto {
        return {
            teamId: team.teamId.id.toString(),
            name: team.name,
            club: ClubMap.toDto(team.club, false),
            category: CategoryMap.toDto(team.category),
        };
    }
}

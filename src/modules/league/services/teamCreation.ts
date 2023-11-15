import { Either, Result, left, right } from "../../../shared/core/Result";
import { Category } from "../domain/category";
import { Club } from "../domain/club";
import { Team } from "../domain/team";
import { TeamRepository } from "../repositories/teamRepo";

type Response = Either<Result<string>, Result<Team>>;

type Body = {
    teamName: string;
    club: Club;
    category: Category;
}

export interface TeamCreationService {
    execute(body: Body): Promise<Response>;
}

export class SequelizeTeamCreation implements TeamCreationService {

    private readonly teamRepo: TeamRepository;

    constructor(teamRepo: TeamRepository) {
        this.teamRepo = teamRepo;
    }

    async execute({ teamName, club, category }: Body): Promise<Response> {

        let team: Team;
        try {
            try {
                team = await this.teamRepo.getTeam(
                    teamName,
                    club.clubId.id.toString(),
                    category.categoryId.id.toString(),
                )
            } catch (error) {
                // create team;
                const teamOrError = Team.create({
                    name: teamName,
                    club: club,
                    category,
                });
                if (teamOrError.isFailure) {
                    return left(Result.fail<string>("Equipo 1 invalido"));
                }
                team = teamOrError.getValue();
                await this.teamRepo.save(team);
            }

            if (team.isDeleted) {
                team.restore();

                await this.teamRepo.save(team);
            }

            return right(Result.ok<Team>(team));
        } catch (error) {
            return left(Result.fail<string>("Ha ocurrido un error"));
        }
    }
}

import { sequelizeTeamRepo } from "../../repositories";
import { ListTeamsByClub } from "./listTeamsByClub";
import { ListTeamsByClubController } from "./listTeamsByClubController";

const listTeamsByClub = new ListTeamsByClub(sequelizeTeamRepo);
const listTeamsByClubController = new ListTeamsByClubController(listTeamsByClub);

export { listTeamsByClubController };

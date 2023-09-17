import { sequelizeSeasonRepo } from "../../repositories";
import { ResumeSeason } from "./resumeSeason";
import { ResumeSeasonController } from "./resumeSeasonController";

const resumeSeason = new ResumeSeason(sequelizeSeasonRepo);
const resumeSeasonController = new ResumeSeasonController(resumeSeason);

export { resumeSeasonController }

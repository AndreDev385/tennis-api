import { sequelizeMatchRepo } from "../../repositories";
import { GetMatchById } from "./getMatchById";
import { GetMatchByIdController } from "./getMatchByIdController";

const getMatchById = new GetMatchById(sequelizeMatchRepo);
const getMatchByIdController = new GetMatchByIdController(getMatchById);

export { getMatchByIdController };

import { sequelizeClashRepo } from "../../repositories";
import { GetClashById } from "./getClashById";
import { GetClashByIdController } from "./getClashByIdController";

const getClashById = new GetClashById(sequelizeClashRepo)
const getClashByIdController = new GetClashByIdController(getClashById);

export { getClashByIdController };

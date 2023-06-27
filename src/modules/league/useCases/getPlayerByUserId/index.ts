import { sequelizeUserRepo } from "../../../users/repositories";
import { sequelizePlayerRepo } from "../../repositories";
import { GetPlayerByUserId } from "./getPlayerByUserId";
import { GetPlayerByUserIdController } from "./getPlayerByUserIdController";

const getPlayerByUserId = new GetPlayerByUserId(
    sequelizeUserRepo,
    sequelizePlayerRepo
);
const getPlayerByUserIdController = new GetPlayerByUserIdController(
    getPlayerByUserId
);

export { getPlayerByUserIdController };

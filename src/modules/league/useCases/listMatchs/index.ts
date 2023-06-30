import { sequelizeMatchRepo } from "../../repositories";
import { ListMatchs } from "./listMatchs";
import { ListMatchsController } from "./listMatchsController";

const listMatchs = new ListMatchs(sequelizeMatchRepo);
const listMatchsController = new ListMatchsController(listMatchs);

export { listMatchsController };

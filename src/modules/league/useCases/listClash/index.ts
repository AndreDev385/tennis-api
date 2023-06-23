import { sequelizeClashRepo } from "../../repositories";
import { ListClash } from "./listClash";
import { ListClashController } from "./listClashController";

const listClash = new ListClash(sequelizeClashRepo);
const listClashController = new ListClashController(listClash);

export { listClashController };

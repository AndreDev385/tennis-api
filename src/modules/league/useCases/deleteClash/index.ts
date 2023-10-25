import { sequelizeClashRepo } from "../../repositories";
import { DeleteClash } from "./deleteClash";
import { DeleteClashController } from "./deleteClashController";

const deleteClash = new DeleteClash(sequelizeClashRepo);
const deleteClashController = new DeleteClashController(deleteClash);

export { deleteClashController }

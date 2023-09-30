import { sequelizeClashRepo } from "../../repositories";
import { PaginateClash } from "./paginateClash";
import { PaginateClashController } from "./paginateClashController";

const paginateClash = new PaginateClash(sequelizeClashRepo);
const paginateClashController = new PaginateClashController(paginateClash);

export { paginateClashController }

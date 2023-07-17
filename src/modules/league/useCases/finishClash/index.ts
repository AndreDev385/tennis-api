import { sequelizeClashRepo } from "../../repositories";
import { FinishClash } from "./finishClash";
import { FinishClashController } from "./finishClashController";

const finishClash = new FinishClash(sequelizeClashRepo);

const finishClashController = new FinishClashController(finishClash);

export { finishClash, finishClashController };

import {
    sequelizeBracketRepo,
    sequelizeContestClashRepo,
} from "../../repository";
import { UpdateClashBrackets } from "./update";

export const updateClashBrackets = new UpdateClashBrackets(
    sequelizeBracketRepo,
    sequelizeContestClashRepo
);

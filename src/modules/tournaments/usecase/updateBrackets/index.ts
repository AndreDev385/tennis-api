import {
    sequelizeBracketRepo,
    sequelizeTournamentMatchRepo,
} from "../../repository";
import { UpdateBrackets } from "./updateBrackets";

export const updateBracketTree = new UpdateBrackets(
    sequelizeBracketRepo,
    sequelizeTournamentMatchRepo
);

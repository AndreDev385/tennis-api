import {
    sequelizeBracketRepo,
    sequelizeTournamentMatchRepo,
} from "../../repository";
import { UpdateMatchBrackets } from "./updateBrackets";

export const updateMatchBracketTree = new UpdateMatchBrackets(
    sequelizeBracketRepo,
    sequelizeTournamentMatchRepo
);

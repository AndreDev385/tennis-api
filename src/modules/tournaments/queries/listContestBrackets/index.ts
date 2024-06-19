import { sequelizeBracketRepo } from "../../repository";
import { ListContestBracketsCtrl } from "./listContestBracketController";
import { ListContestBrackets } from "./listContestBrackets";

const listContestBrackets = new ListContestBrackets(sequelizeBracketRepo);

export const listContestBracketsCtrl = new ListContestBracketsCtrl(
    listContestBrackets
);

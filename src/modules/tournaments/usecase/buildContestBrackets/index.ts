import { sequelizeBracketRepo, sequelizeContestRepo } from "../../repository";
import { BuildBrackets } from "./buildBrackets";
import { BuildBracketsCtrl } from "./buildBracketsCtrl";

const buildBrackets = new BuildBrackets(
    sequelizeBracketRepo,
    sequelizeContestRepo
);

export const buildBracketCtrl = new BuildBracketsCtrl(buildBrackets);

import { sequelizeTournamentRepo } from "../../repository";
import { BuildBrackets } from "./buildBrackets";
import { BuildBracketsCtrl } from "./buildBracketsCtrl";

const buildBrackets = new BuildBrackets(sequelizeTournamentRepo);
const buildBracketCtrl = new BuildBracketsCtrl(buildBrackets);

export { buildBracketCtrl };

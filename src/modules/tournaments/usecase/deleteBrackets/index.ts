import { sequelizeBracketRepo } from "../../repository";
import { DeleteBrackets } from "./deleteBrackets";
import { DeleteBracketsCtrl } from "./deleteBracketsController";

const deleteBrackets = new DeleteBrackets(sequelizeBracketRepo);

export const deleteBracketsCtrl = new DeleteBracketsCtrl(deleteBrackets);

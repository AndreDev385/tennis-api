import {
    sequelizeBracketRepo,
    sequelizeContestClashRepo,
} from "../../repository";
import { CreateBracketClash } from "./create";
import { CreateBracketClashCtrl } from "./createBracketClashController";

const createBracketClash = new CreateBracketClash(
    sequelizeContestClashRepo,
    sequelizeBracketRepo
);

export const createBracketClashCtrl = new CreateBracketClashCtrl(
    createBracketClash
);

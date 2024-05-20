import { sequelizeContestClashRepo } from "../../repository";
import { DeleteContestClash } from "./delete";
import { DeleteContestClashCtrl } from "./deleteContestClashController";

const deleteContestClash = new DeleteContestClash(sequelizeContestClashRepo);

export const deleteContestClashCtrl = new DeleteContestClashCtrl(
    deleteContestClash
);

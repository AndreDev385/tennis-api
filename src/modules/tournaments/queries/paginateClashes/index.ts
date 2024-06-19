import { sequelizeContestClashRepo } from "../../repository";
import { PaginateClashes } from "./paginate";
import { PaginateContestClashesCtrl } from "./paginateContestClashController";

const paginateClashes = new PaginateClashes(sequelizeContestClashRepo);

export const paginateContestClashesCtrl = new PaginateContestClashesCtrl(
    paginateClashes
);

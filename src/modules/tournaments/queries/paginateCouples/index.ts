import { sequelizeCoupleRepo } from "../../repository";
import { PaginateCouples } from "./paginateCouples";
import { PaginateCouplesCtrl } from "./paginateCouplesController";

const paginateCouples = new PaginateCouples(sequelizeCoupleRepo);

export const paginateCouplesCtrl = new PaginateCouplesCtrl(paginateCouples);

import { CoupleData } from "../../../shared/infra/database/sequelize/models/tournaments/Couple";
import {
	PaginateQuery,
	PaginateResponse,
} from "../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { Couple } from "../domain/couple";

export type CoupleQuery = {
	coupleId?: string;
	participantsId?: {
		p1Id: string;
		p2Id: string;
	};
};

export type CoupleRepository = {
	paginate(
		q: CoupleQuery,
		pq: PaginateQuery,
	): Promise<PaginateResponse<CoupleData>>;
	get(q: CoupleQuery): Promise<Couple>;
	save(couple: Couple): Promise<void>;
};

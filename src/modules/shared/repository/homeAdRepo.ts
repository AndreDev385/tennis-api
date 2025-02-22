import { HomeAdDto } from "../dtos/homeAdDto";

export type HomeAdRepository = {
	save(ad: HomeAdDto): Promise<void>;
	list(): Promise<HomeAdDto[]>;
	delete(id: number): Promise<void>;
};

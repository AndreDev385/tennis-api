import { CategoryDto } from "./categoryDto";
import { ClubDto } from "./clubDto";

export interface TeamDto {
    teamId: string;
    name: string;
    club: ClubDto;
    category: CategoryDto
}

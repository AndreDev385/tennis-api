import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { ContestData } from "../../../shared/infra/database/sequelize/models/tournaments/Contest";
import { Category } from "../../league/domain/category";
import { GameMode, Mode } from "../../league/domain/gameMode";
import { CategoryMap } from "../../league/mappers/categoryMap";
import { Contest } from "../domain/contest";
import { Inscribed } from "../domain/inscribed";
import { InscribedList } from "../domain/inscribedList";
import { Summation } from "../domain/summation";
import { TournamentId } from "../domain/tournamentId";
import { ContestDto } from "../dtos/contestsDto";
import { ContestTeamMap } from "./ContestTeamMap";
import { CoupleMap } from "./CoupleMap";
import { ParticipantMap } from "./ParticipantMap";

export class ContestMap implements Mapper<Contest> {
    public static forQuery(raw: ContestData): ContestDto {
        return {
            contestId: raw.contestId,
            tournamentId: raw.tournamentId,
            mode: raw.mode,
            categoryType: raw.categoryType,
            summation: raw.summation ? JSON.parse(raw.summation) : null,
            category: raw.category ? JSON.parse(raw.category) : null,
        };
    }

    public static toDto(c: Contest) {
        const inscribed = c.inscribed.getItems().map((i) => {
            switch (c.mode.value) {
                case GameMode.single:
                    return {
                        position: i.position,
                        participant: ParticipantMap.toDto(i.participant!),
                    };
                case GameMode.double:
                    return {
                        position: i.position,
                        couple: CoupleMap.toDto(i.couple!),
                    };
                case GameMode.team:
                    return {
                        position: i.position,
                        contestTeam: ContestTeamMap.toDto(i.team),
                    };
            }
        })

        inscribed.sort((a, b) => (a?.position ?? 99) - (b?.position ?? 99));

        return {
            contestId: c.contestId.id.toString(),
            tournamentId: c.tournamentId.id.toString(),
            mode: c.mode.value,
            categoryType: c.categoryType,
            category: c.category ? CategoryMap.toDto(c.category) : null,
            summation: c.summation
                ? {
                    value: c.summation.value,
                    letter: c.summation.letter,
                }
                : null,
            inscribed,
        };
    }

    public static toDomain(raw: ContestData, inscribed?: Inscribed[]) {
        let category: Category | null = null;
        let summation: Summation | null = null;
        if (raw.category) {
            category = CategoryMap.toDomain(JSON.parse(raw.category));
        }
        if (raw.summation) {
            summation = this.summationToDomain(JSON.parse(raw.summation));
        }

        const mustContest = Contest.create(
            {
                tournamentId: TournamentId.create(
                    new UniqueEntityID(raw.tournamentId)
                ).getValue(),
                categoryType: raw.categoryType,
                mode: Mode.create({ value: raw.mode }).getValue(),
                category,
                summation,
                inscribed: InscribedList.create(inscribed ?? []),
            },
            new UniqueEntityID(raw.contestId)
        );

        mustContest.isFailure ??
            console.log("toDomain contest fail", mustContest.getErrorValue());

        return mustContest.isSuccess ? mustContest.getValue() : null;
    }

    public static toPersistance(contest: Contest) {
        return {
            contestId: contest.contestId.id.toString(),
            tournamentId: contest.tournamentId.id.toString(),
            mode: contest.mode.value,
            categoryType: contest.categoryType,
            category: contest.category
                ? JSON.stringify({
                    name: contest.category.name,
                    fullName: contest.category.fullName,
                    categoryId: contest.category.categoryId.id.toString(),
                })
                : null,
            summation: contest.summation
                ? JSON.stringify({
                    letter: contest.summation.letter,
                    value: contest.summation.value,
                })
                : null,
            inscribed: contest.inscribed.getItems().map((i) => {
                switch (contest.mode.value) {
                    case GameMode.single:
                        return i.participant?.participantId.id.toString();
                    case GameMode.double:
                        return i.couple?.coupleId.id.toString();
                    case GameMode.single:
                        return i.team?.contestTeamId.id.toString();
                }
            }),
        };
    }

    private static summationToDomain(raw: any) {
        if (!raw) {
            return null;
        }
        return Summation.create({
            value: raw.value,
            letter: raw.letter,
        }).getValue();
    }
}

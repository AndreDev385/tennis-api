import { UserModel } from "./BaseUser";
import { PlayerTrackerModel } from "./PlayerTracker";
import { PlayerModel } from "./Player";
import { TrackerModel } from "./Tracker";
import { MatchModel } from "./Match";
import { ClashModel } from "./ClubClash";
import { SeasonModel } from "./Season";
import { CategoryModel } from "./Category";
import { LeagueModel } from "./League";
import { ClubModel } from "./Club";
import { JourneyModel } from "./Journey";
import { TeamModel } from "./Team";
import { TeamStatsModel } from "./TeamStats";
import { ClubEventModel } from "./ClubEvent";
import { AdModel } from "./Ad";

const models = {
    UserModel: UserModel,
    PlayerModel: PlayerModel,
    PlayerTrackerModel: PlayerTrackerModel,
    TrackerModel: TrackerModel,
    MatchModel: MatchModel,
    ClashModel: ClashModel,
    SeasonModel: SeasonModel,
    CategoryModel: CategoryModel,
    LeagueModel: LeagueModel,
    ClubModel: ClubModel,
    JourneyModel: JourneyModel,
    TeamModel: TeamModel,
    TeamStatsModel: TeamStatsModel,
    ClubEventModel: ClubEventModel,
    AdModel: AdModel,
};

export default models;

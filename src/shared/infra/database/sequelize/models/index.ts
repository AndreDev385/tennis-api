import { HomeAdModel } from "./HomeAd";
import { UserModel } from "./auth/BaseUser";
import { AdModel } from "./leagues/Ad";
import { CategoryModel } from "./leagues/Category";
import { ClubModel } from "./leagues/Club";
import { ClashModel } from "./leagues/ClubClash";
import { ClubEventModel } from "./leagues/ClubEvent";
import { JourneyModel } from "./leagues/Journey";
import { LeagueModel } from "./leagues/League";
import { MatchModel } from "./leagues/Match";
import { PausedMatchModel } from "./leagues/PausedMatch";
import { PlayerModel } from "./leagues/Player";
import { PlayerTrackerModel } from "./leagues/PlayerTracker";
import { RankingModel } from "./leagues/Ranking";
import { SeasonModel } from "./leagues/Season";
import { TeamModel } from "./leagues/Team";
import { TeamStatsModel } from "./leagues/TeamStats";
import { TrackerModel } from "./leagues/Tracker";
import { BracketModel } from "./tournaments/Bracket";
import { ContestModel } from "./tournaments/Contest";
import { ContestClashModel } from "./tournaments/ContestClash";
import { ContestTeamModel } from "./tournaments/ContestTeam";
import { CoupleModel } from "./tournaments/Couple";
import { ParticipantModel } from "./tournaments/Participant";
import { ParticipantTrackerModel } from "./tournaments/ParticipantTracker";
import { TournamentModel } from "./tournaments/Tournament";
import { TournamentAdModel } from "./tournaments/TournamentAd";
import { TournamentMatchModel } from "./tournaments/TournamentMatch";
import { TournamentMatchTrackerModel } from "./tournaments/TournamentMatchTracker";

const models = {
    // auth
    UserModel: UserModel,
    // league
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
    RankingModel: RankingModel,
    PausedMatchModel: PausedMatchModel,
    // tournaments
    TournamentAdModel: TournamentAdModel,
    TournamentModel: TournamentModel,
    ContestModel: ContestModel,
    BracketModel: BracketModel,
    TournamentMatchModel: TournamentMatchModel,
    TournamentMatchTrackerModel: TournamentMatchTrackerModel,
    ContestTeamModel: ContestTeamModel,
    CoupleModel: CoupleModel,
    ParticipantModel: ParticipantModel,
    ParticipantTrackerModel: ParticipantTrackerModel,
    ContestClashModel: ContestClashModel,
    // shared
    HomeAdModel: HomeAdModel,
};

export default models;

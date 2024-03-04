export interface IAdmin {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IAds {
  adId: string;
  clubId: string;
  link: string;
  image: any;
}

export interface IClub {
  clubId: string;
  name: string;
  code: string;
  isSubscribed: boolean;
  symbol: string;
}

export interface INews {
  clubEventId: string;
  clubId: string;
  link: string;
  image: any;
}

export interface IAds {
  adId: string;
  clubId: string;
  link: string;
  image: any;
}

export interface ISeason {
  seasonId: string;
  leagueId: string;
  name: string;
  isFinish: boolean;
  isCurrentSeason: boolean;
}

export interface ITeam {
  teamId: string;
  name: string;
  category: ICategory;
  club: IClub;
}

export interface ICategory {
  categoryId: string;
  name: string;
  fullName: string;
}

export interface IUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  canTrack: boolean;
}

export interface IUserPlayer {
  playerId: string;
  clubId: string;
  user: IUser;
  fullName: string;
}

export interface IStatsId extends IStats {
  journey: string;
  seasonId: string;
  teamId: string;
  teamStatsId: string;
}

export interface IStats {
  clashPlayedAsLocal: number;
  clashPlayedAsVisitor: number;
  clashWonAsLocal: number;
  clashWonAsVisitor: number;
  gamesPlayedAsLocal: number;
  gamesPlayedAsVisitor: number;
  gamesWonAsLocal: number;
  gamesWonAsVisitor: number;
  matchLostAsLocal: number;
  matchLostAsVisitor: number;
  matchPlayedAsLocal: number;
  matchPlayedAsVisitor: number;
  matchWonAsLocal: number;
  matchWonAsVisitor: number;
  matchsPlayedWithFirstSetWonAsLocal: number;
  matchsPlayedWithFirstSetWonAsVisitor: number;
  matchsWonWithFirstSetWonAsLocal: number;
  matchsWonWithFirstSetWonAsVisitor: number;
  setsPlayedAsLocal: number;
  setsPlayedAsVisitor: number;
  setsWonAsLocal: number;
  setsWonAsVisitor: number;
  superTieBreaksPlayedAsLocal: number;
  superTieBreaksPlayedAsVisitor: number;
  superTieBreaksWonAsLocal: number;
  superTieBreaksWonAsVisitor: number;
  totalClashPlayed: number;
  totalClashWon: number;
  totalGamesPlayed: number;
  totalGamesWon: number;
  totalMatchPlayed: number;
  totalMatchWon: number;
  totalMatchsPlayedWithFirstSetWon: number;
  totalMatchsWonWithFirstSetWon: number;
  totalSetsPlayed: number;
  totalSetsWon: number;
  totalSuperTieBreaksPlayed: number;
  totalSuperTieBreaksWon: number;
}

export interface IJourney {
  name: string;
}

export interface IRanking {
  position: string;
  rankingId: string;
  seasonId: string;
  symbol: string;
  team: {
    teamId: string;
    name: string;
    category: ICategory;
    club: IClub;
  };
}

export interface IClash {
  category: string;
  clashId: string;
  host: string;
  isFinish: boolean;
  journey: string;
  seasonId: string;
  team1: {
    category: ICategory;
    club: IClub;
    name: string;
    teamId: string;
  };
  team2: {
    category: ICategory;
    club: IClub;
    name: string;
    teamId: string;
  };
}

interface IPlayer {
  playerId: string;
  name: string;
}

interface ISet {
  myGames: number;
  rivalGames: number;
  setWon: boolean;
  stats: ISetStats;
}

export interface ISetStats {
  breakPtsWinned: number;
  gamesLostReturning: number;
  gamesWonReturning: number;
  longRallyLost: number;
  longRallyWon: number;
  mediumRallyLost: number;
  mediumRallyWon: number;
  rivalAces: number;
  rivalDobleFault: number;
  rivalFirstReturnIn: number;
  rivalFirstServIn: number;
  rivalNoForcedErrors: number;
  rivalPointsWinnedFirstReturn: number;
  rivalPointsWinnedFirstServ: number;
  rivalPointsWinnedSecondReturn: number;
  rivalPointsWinnedSecondServ: number;
  rivalSecondReturnIn: number;
  rivalSecondServIn: number;
  rivalWinners: number;
  shortRallyLost: number;
  shortRallyWon: number;
  winBreakPtsChances: number;
  me: ISetStatsIndiv;
  partner?: ISetStatsIndiv;
  rivalFirstServWon: number;
  rivalSecondServWon: number;
}

export interface ISetStatsIndiv {
  isDouble: boolean;
  pointsWon: number;
  pointsWonServing: number;
  pointsWonReturning: number;
  pointsLost: number;
  pointsLostReturning: number;
  pointsLostServing: number;
  saveBreakPtsChances: number;
  breakPtsSaved: number;
  //
  gamesWonServing: number;
  gamesLostServing: number;
  pointsWinnedFirstServ: number;
  pointsWinnedSecondServ: number;
  firstServIn: number;
  secondServIn: number;
  firstServWon: number; // Saque no devuelto
  secondServWon: number; // Saque no devuelto
  aces: number;
  dobleFaults: number;
  //
  pointsWinnedFirstReturn: number;
  pointsWinnedSecondReturn: number;
  firstReturnIn: number;
  secondReturnIn: number;
  firstReturnOut: number;
  secondReturnOut: number;
  firstReturnWon: number;
  secondReturnWon: number;
  firstReturnWinner: number;
  secondReturnWinner: number;
  //
  meshPointsWon: number;
  meshPointsLost: number;
  meshWinner: number;
  meshError: number;
  bckgPointsWon: number;
  bckgPointsLost: number;
  bckgWinner: number;
  bckgError: number;
}

export interface IMatch {
  address: string;
  category: string;
  clashId: string;
  gamesPerSet: number;
  isCancelled: boolean;
  isFinish: boolean;
  isLive: boolean;
  isPaused: boolean;
  matchId: string;
  matchWon: boolean;
  mode: 'single' | 'double';
  player1: IPlayer;
  player2: string;
  player3?: IPlayer;
  player4?: string;
  setsQuantity: number;
  superTieBreak: boolean;
  surface: string;
  sets: ISet[];
  tracker: ISetStats;
}

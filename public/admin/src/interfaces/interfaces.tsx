export interface IAdmin {
    userId: string,
    email: string,
    firstName: string,
    lastName: string
}

export interface IAds {
    adId: string,
    clubId: string,
    link: string,
    image: any
}

export interface IClub {
    clubId: string,
    name: string,
    code: string,
    isSubscribed: boolean
    symbol: string
}

export interface INews {
    clubEventId: string,
    clubId: string,
    link: string,
    image: any
}

export interface IAds {
    adId: string,
    clubId: string,
    link: string,
    image: any
}

export interface ISeason {
    seasonId: string,
    leagueId: string,
    name: string,
    isFinish: boolean,
    isCurrentSeason: boolean
}

export interface ITeam {
    teamId: string,
    name: string,
    category: ICategory,
    club: IClub
}

export interface ICategory {
    categoryId: string,
    name: string,
    fullNmae: string
}

export interface IUser {
    userId: string,
    email: string,
    firstName: string,
    lastName: string
}

export interface IStatsId extends IStats {
    journey: string,
    seasonId: string,
    teamId: string,
    teamStatsId: string,
}

export interface IStats {
    clashPlayedAsLocal: number,
    clashPlayedAsVisitor: number,
    clashWonAsLocal: number,
    clashWonAsVisitor: number,
    gamesPlayedAsLocal: number,
    gamesPlayedAsVisitor: number,
    gamesWonAsLocal: number,
    gamesWonAsVisitor: number,
    matchLostAsLocal: number,
    matchLostAsVisitor: number,
    matchPlayedAsLocal: number,
    matchPlayedAsVisitor: number,
    matchWonAsLocal: number,
    matchWonAsVisitor: number,
    matchsPlayedWithFirstSetWonAsLocal: number,
    matchsPlayedWithFirstSetWonAsVisitor: number,
    matchsWonWithFirstSetWonAsLocal: number,
    matchsWonWithFirstSetWonAsVisitor: number,
    setsPlayedAsLocal: number,
    setsPlayedAsVisitor: number,
    setsWonAsLocal: number,
    setsWonAsVisitor: number,
    superTieBreaksPlayedAsLocal: number,
    superTieBreaksPlayedAsVisitor: number,
    superTieBreaksWonAsLocal: number,
    superTieBreaksWonAsVisitor: number,
    totalClashPlayed: number,
    totalClashWon: number,
    totalGamesPlayed: number,
    totalGamesWon: number,
    totalMatchPlayed: number,
    totalMatchWon: number,
    totalMatchsPlayedWithFirstSetWon: number,
    totalMatchsWonWithFirstSetWon: number,
    totalSetsPlayed: number,
    totalSetsWon: number,
    totalSuperTieBreaksPlayed: number,
    totalSuperTieBreaksWon: number,
}

export interface IJourney{
    name: string,
}
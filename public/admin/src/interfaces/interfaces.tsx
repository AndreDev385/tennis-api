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
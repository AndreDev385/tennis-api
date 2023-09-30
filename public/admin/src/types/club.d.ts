export interface IClub {
    id: string,
    name: string,
    code: string,
    isSubscribed: boolean
}

type ClubState = {
    clubs: IClub[]
}

type ClubAction = {
    type: string,
    club: IClub
}

type DispatchType = (args: ClubAction) => ClubAction
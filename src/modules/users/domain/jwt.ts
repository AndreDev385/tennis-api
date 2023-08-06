export type JWTData = {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    canTrack: boolean;
    isAdmin: boolean;
    isPlayer: boolean;
}

export type JWTToken = string;


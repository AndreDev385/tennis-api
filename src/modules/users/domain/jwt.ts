export type JWTData = {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    canTrack: boolean;
    isAdmin: boolean;
}

export type JWTToken = string;


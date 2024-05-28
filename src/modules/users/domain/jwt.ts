export type JWTData = {
    userId: string;
    email: string | null;
    ci: string | null;
    firstName: string;
    lastName: string;
    canTrack: boolean;
    isAdmin: boolean;
    isPlayer: boolean;
}

export type JWTToken = string;


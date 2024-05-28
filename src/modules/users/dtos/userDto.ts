export interface UserDto {
    userId: string;
    firstName: string;
    lastName: string;
    email: string | null;
    ci: string | null
    isAdmin: boolean;
    canTrack: boolean;
    isPlayer: boolean;
    isDeleted: boolean;
}

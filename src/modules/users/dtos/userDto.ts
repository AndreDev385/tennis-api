export interface UserDto {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    canTrack: boolean;
    isPlayer: boolean;
    isDeleted: boolean;
}

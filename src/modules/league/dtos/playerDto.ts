export interface PlayerDto {
    playerId: string;
    user: {
        userId: string;
        firstName: string;
        lastName: string;
    };
    clubId: string;
}

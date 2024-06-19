export type ParticipantDto = {
    participantId: string;
    device: string | null;
    avatar: string | null;
    isDeleted: boolean;
    user: {
        userId: string;
        firstName: string;
        lastName: string;
        ci: string | null;
    };
};

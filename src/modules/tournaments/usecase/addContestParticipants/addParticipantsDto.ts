export type AddContestParticipantsDto = {
    contestId: string;
    participants: AddParticipantDto[];
};

export type AddParticipantDto = {
    firstName: string;
    lastName: string;
    ci: string;
    position: number | null;
};

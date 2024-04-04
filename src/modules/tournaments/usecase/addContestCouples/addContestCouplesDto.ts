export type AddContestCouplesDto = {
    contestId: string;
    couples: AddCoupleDto[];
};

export type AddCoupleDto = {
    position: number | null;
    p1: {
        firstName: string;
        lastName: string;
        ci: string;
    };
    p2: {
        firstName: string;
        lastName: string;
        ci: string;
    };
};

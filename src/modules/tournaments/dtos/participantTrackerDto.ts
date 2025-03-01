export type ParticipantTrackerDto = {
	participantTrackerId: string;
	participantId: string;
	tournamentId: string;
	matchId: string;
	isDouble: boolean;

	saveBreakPtsChances: number;
	breakPtsSaved: number;
	breakPtsChances: number;
	breakPts: number;
	// serv
	firstServIn: number;
	secondServIn: number;
	aces: number;
	dobleFaults: number;
	firstServWon: number;
	secondServWon: number;
	pointsWinnedFirstServ: number;
	pointsWinnedSecondServ: number;
	gamesWonServing: number;
	gamesLostServing: number;
	gamesWonReturning: number;
	gamesLostReturning: number;
	// return
	firstReturnWon: number;
	secondReturnWon: number;
	firstReturnWinner: number;
	secondReturnWinner: number;
	firstReturnIn: number;
	secondReturnIn: number;
	firstReturnOut: number;
	secondReturnOut: number;
	pointsWinnedFirstReturn: number;
	pointsWinnedSecondReturn: number;
	// places
	meshPointsWon: number;
	meshPointsLost: number;
	meshWinner: number;
	meshError: number;
	bckgPointsWon: number;
	bckgPointsLost: number;
	bckgWinner: number;
	bckgError: number;
	// rally
	shortRallyWon: number;
	shortRallyLost: number;
	mediumRallyWon: number;
	mediumRallyLost: number;
	longRallyWon: number;
	longRallyLost: number;
	createdAt: Date;
	updatedAt: Date;
};

import type { ParticipantStats } from "../../../types/participantStats";
import type { TournamentMatchTracker } from "../../../types/tournamentTracker";
import { calculatePercentage } from "../../../utils/calculatePercantage";
import type { Section } from "./statsTable";

export function buildStandardSections(
	stats: TournamentMatchTracker,
): Section[] {
	const { player1, player2, player3, player4 } = stats;

	const t1Aces = () => {
		if (player3 != null) {
			return player1!.aces + player3!.aces;
		}
		return player1?.aces;
	};

	const t2Aces = () => {
		if (player4 != null) {
			return player2!.aces + player4!.aces;
		}
		return player2!.aces;
	};

	const t1DoubleFaults = () => {
		if (player3 != null) {
			return player1!.dobleFaults + player3!.dobleFaults;
		}
		return player1!.dobleFaults;
	};

	const t2DoubleFaults = () => {
		if (player4 != null) {
			return player2!.dobleFaults + player4!.dobleFaults;
		}
		return player2!.dobleFaults;
	};

	const t1FirstServIn = () => {
		if (player3 != null) {
			return player1!.firstServIn + player3!.firstServIn;
		}
		return player1!.firstServIn;
	};

	const t2FirstServIn = () => {
		if (player4 != null) {
			return player2!.firstServIn + player4!.firstServIn;
		}
		return player2!.firstServIn;
	};

	const t1FirstServWon = () => {
		if (player3 != null) {
			return player1!.firstServWon + player3!.firstServWon;
		}
		return player1!.firstServWon;
	};

	const t2FirstServWon = () => {
		if (player4 != null) {
			return player2!.firstServWon + player4!.firstServWon;
		}
		return player2!.firstServWon;
	};

	const t1PointsWinnedFirstServ = () => {
		if (player3 != null) {
			return player1!.pointsWinnedFirstServ + player3!.pointsWinnedFirstServ;
		}
		return player1!.pointsWinnedFirstServ;
	};

	const t2PointsWinnedFirstServ = () => {
		if (player4 != null) {
			return player2!.pointsWinnedFirstServ + player4!.pointsWinnedFirstServ;
		}
		return player2!.pointsWinnedFirstServ;
	};

	const t1SecondServIn = () => {
		if (player3 != null) {
			return player1!.secondServIn + player3!.secondServIn;
		}
		return player1!.secondServIn;
	};

	const t2SecondServIn = () => {
		if (player4 != null) {
			return player2!.secondServIn + player4!.secondServIn;
		}
		return player2!.secondServIn;
	};

	const t1SecondServWon = () => {
		if (player3 != null) {
			return player1!.secondServWon + player3!.secondServWon;
		}
		return player1!.secondServWon;
	};

	const t2SecondServWon = () => {
		if (player4 != null) {
			return player2!.secondServWon + player4!.secondServWon;
		}
		return player2!.secondServWon;
	};

	const t1PointsWinnedSecondServ = () => {
		if (player3 != null) {
			return player1!.pointsWinnedSecondServ + player3!.pointsWinnedSecondServ;
		}
		return player1!.pointsWinnedSecondServ;
	};

	const t2PointsWinnedSecondServ = () => {
		if (player4 != null) {
			return player2!.pointsWinnedSecondServ + player4!.pointsWinnedSecondServ;
		}
		return player2!.pointsWinnedSecondServ;
	};

	const t1GamesWonServing = () => {
		if (player3 != null) {
			return player1!.gamesWonServing + player3!.gamesWonServing;
		}
		return player1!.gamesWonServing;
	};

	const t2GamesWonServing = () => {
		if (player4 != null) {
			return player2!.gamesWonServing + player4!.gamesWonServing;
		}
		return player2!.gamesWonServing;
	};

	const t1GamesLostServing = () => {
		if (player3 != null) {
			return player1!.gamesLostServing + player3!.gamesLostServing;
		}
		return player1!.gamesLostServing;
	};

	const t2GamesLostServing = () => {
		if (player4 != null) {
			return player2!.gamesLostServing + player4!.gamesLostServing;
		}
		return player2!.gamesLostServing;
	};

	const t1FirstReturnIn = () => {
		if (player3 != null) {
			return player1!.firstReturnIn + player3!.firstReturnIn;
		}
		return player1!.firstReturnIn;
	};

	const t2FirstReturnIn = () => {
		if (player4 != null) {
			return player2!.firstReturnIn + player4!.firstReturnIn;
		}
		return player2!.firstReturnIn;
	};

	const t1FirstReturnOut = () => {
		if (player3 != null) {
			return player1!.firstReturnOut + player3!.firstReturnOut;
		}
		return player1!.firstReturnOut;
	};

	const t2FirstReturnOut = () => {
		if (player4 != null) {
			return player2!.firstReturnOut + player4!.firstReturnOut;
		}
		return player2!.firstReturnOut;
	};

	const t1FirstReturnWon = () => {
		if (player3 != null) {
			return player1!.firstReturnWon + player3!.firstReturnWon;
		}
		return player1!.firstReturnWon;
	};

	const t2FirstReturnWon = () => {
		if (player4 != null) {
			return player2!.firstReturnWon + player4!.firstReturnWon;
		}
		return player2!.firstReturnWon;
	};

	const t1FirstReturnWinner = () => {
		if (player3 != null) {
			return player1!.firstReturnWinner + player3!.firstReturnWinner;
		}
		return player1!.firstReturnWinner;
	};

	const t2FirstReturnWinner = () => {
		if (player4 != null) {
			return player2!.firstReturnWinner + player4!.firstReturnWinner;
		}
		return player2!.firstReturnWinner;
	};

	const t1PointsWinnedFirstReturn = () => {
		if (player3 != null) {
			return (
				player1!.pointsWinnedFirstReturn + player3!.pointsWinnedFirstReturn
			);
		}
		return player1!.pointsWinnedFirstReturn;
	};

	const t2PointsWinnedFirstReturn = () => {
		if (player4 != null) {
			return (
				player2!.pointsWinnedFirstReturn + player4!.pointsWinnedFirstReturn
			);
		}
		return player2!.pointsWinnedFirstReturn;
	};

	const t1SecondReturnIn = () => {
		if (player3 != null) {
			return player1!.secondReturnIn + player3!.secondReturnIn;
		}
		return player1!.secondReturnIn;
	};

	const t2SecondReturnIn = () => {
		if (player4 != null) {
			return player2!.secondReturnIn + player4!.secondReturnIn;
		}
		return player2!.secondReturnIn;
	};

	const t1SecondReturnOut = () => {
		if (player3 != null) {
			return player1!.secondReturnOut + player3!.secondReturnOut;
		}
		return player1!.secondReturnOut;
	};

	const t2SecondReturnOut = () => {
		if (player4 != null) {
			return player2!.secondReturnOut + player4!.secondReturnOut;
		}
		return player2!.secondReturnOut;
	};

	const t1SecondReturnWon = () => {
		if (player3 != null) {
			return player1!.secondReturnWon + player3!.secondReturnWon;
		}
		return player1!.secondReturnWon;
	};

	const t2SecondReturnWon = () => {
		if (player4 != null) {
			return player2!.secondReturnWon + player4!.secondReturnWon;
		}
		return player2!.secondReturnWon;
	};

	const t1SecondReturnWinner = () => {
		if (player3 != null) {
			return player1!.secondReturnWinner + player3!.secondReturnWinner;
		}
		return player1!.secondReturnWinner;
	};

	const t2SecondReturnWinner = () => {
		if (player4 != null) {
			return player2!.secondReturnWinner + player4!.secondReturnWinner;
		}
		return player2!.secondReturnWinner;
	};

	const t1SaveBreakPtsChances = () => {
		if (player3 != null) {
			return player1!.saveBreakPtsChances + player3!.saveBreakPtsChances;
		}
		return player1!.saveBreakPtsChances;
	};

	const t2SaveBreakPtsChances = () => {
		if (player4 != null) {
			return player2!.saveBreakPtsChances + player4!.saveBreakPtsChances;
		}
		return player2!.saveBreakPtsChances;
	};

	const t1BreakPtsSaved = () => {
		if (player3 != null) {
			return player1!.breakPtsSaved + player3!.breakPtsSaved;
		}
		return player1!.breakPtsSaved;
	};

	const t2BreakPtsSaved = () => {
		if (player4 != null) {
			return player2!.breakPtsSaved + player4!.breakPtsSaved;
		}
		return player2!.breakPtsSaved;
	};

	const t1BreakPtsChances = () => {
		return player1!.breakPtsChances;
	};

	const t2BreakPtsChances = () => {
		return player2!.breakPtsChances;
	};

	const t1BreakPts = () => {
		return player1!.breakPts;
	};

	const t2BreakPts = () => {
		return player2!.breakPts;
	};

	const t1GamesWonReturning = () => {
		return player1!.gamesWonReturning;
	};

	const t2GamesWonReturning = () => {
		return player2!.gamesWonReturning;
	};

	const t1GamesLostReturning = () => {
		return player1!.gamesLostReturning;
	};

	const t2GamesLostReturning = () => {
		return player2!.gamesLostReturning;
	};

	const t1PointsWinnedSecondReturn = () => {
		if (player3 != null) {
			return (
				player1!.pointsWinnedSecondReturn + player3!.pointsWinnedSecondReturn
			);
		}
		return player1!.pointsWinnedSecondReturn;
	};

	const t2PointsWinnedSecondReturn = () => {
		if (player4 != null) {
			return (
				player2!.pointsWinnedSecondReturn + player4!.pointsWinnedSecondReturn
			);
		}
		return player2!.pointsWinnedSecondReturn;
	};

	const t1MeshPointsWon = () => {
		if (player3 != null) {
			return player1!.meshPointsWon + player3!.meshPointsWon;
		}
		return player1!.meshPointsWon;
	};

	const t2MeshPointsWon = () => {
		if (player4 != null) {
			return player2!.meshPointsWon + player4!.meshPointsWon;
		}
		return player2!.meshPointsWon;
	};

	const t1MeshPointsLost = () => {
		if (player3 != null) {
			return player1!.meshPointsLost + player3!.meshPointsLost;
		}
		return player1!.meshPointsLost;
	};

	const t2MeshPointsLost = () => {
		if (player4 != null) {
			return player2!.meshPointsLost + player4!.meshPointsLost;
		}
		return player2!.meshPointsLost;
	};

	const t1MeshWinners = () => {
		if (player3 != null) {
			return player1!.meshWinner + player3!.meshWinner;
		}
		return player1!.meshWinner;
	};

	const t2MeshWinners = () => {
		if (player4 != null) {
			return player2!.meshWinner + player4!.meshWinner;
		}
		return player2!.meshWinner;
	};

	const t1MeshError = () => {
		if (player3 != null) {
			return player1!.meshError + player3!.meshError;
		}
		return player1!.meshError;
	};

	const t2MeshError = () => {
		if (player4 != null) {
			return player2!.meshError + player4!.meshError;
		}
		return player2!.meshError;
	};

	const t1BckgPointsWon = () => {
		if (player3 != null) {
			return player1!.bckgPointsWon + player3!.bckgPointsWon;
		}
		return player1!.bckgPointsWon;
	};

	const t2BckgPointsWon = () => {
		if (player4 != null) {
			return player2!.bckgPointsWon + player4!.bckgPointsWon;
		}
		return player2!.bckgPointsWon;
	};

	const t1BckgPointsLost = () => {
		if (player3 != null) {
			return player1!.bckgPointsLost + player3!.bckgPointsLost;
		}
		return player1!.bckgPointsLost;
	};

	const t2BckgPointsLost = () => {
		if (player4 != null) {
			return player2!.bckgPointsLost + player4!.bckgPointsLost;
		}
		return player2!.bckgPointsLost;
	};

	const t1BckgWinner = () => {
		if (player3 != null) {
			return player1!.bckgWinner + player3!.bckgWinner;
		}
		return player1!.bckgWinner;
	};

	const t2BckgWinner = () => {
		if (player4 != null) {
			return player2!.bckgWinner + player4!.bckgWinner;
		}
		return player2!.bckgWinner;
	};

	const t1BckgError = () => {
		if (player3 != null) {
			return player1!.bckgError + player3!.bckgError;
		}
		return player1!.bckgError;
	};

	const t2BckgError = () => {
		if (player4 != null) {
			return player2!.bckgError + player4!.bckgError;
		}
		return player2!.bckgError;
	};

	const t1ShortRallyWon = () => {
		if (player3 != null) {
			return player1!.shortRallyWon + player3!.shortRallyWon;
		}
		return player1!.shortRallyWon;
	};

	const t1MediumRallyWon = () => {
		if (player3 != null) {
			return player1!.mediumRallyWon + player3!.mediumRallyWon;
		}
		return player1!.mediumRallyWon;
	};

	const t1LongRallyWon = () => {
		if (player3 != null) {
			return player1!.longRallyWon + player3!.longRallyWon;
		}
		return player1!.longRallyWon;
	};

	const t1ShortRallyLost = () => {
		if (player3 != null) {
			return player1!.shortRallyLost + player3!.shortRallyLost;
		}
		return player1!.shortRallyLost;
	};

	const t1MediumRallyLost = () => {
		if (player3 != null) {
			return player1!.mediumRallyLost + player3!.mediumRallyLost;
		}
		return player1!.mediumRallyLost;
	};

	const t1LongRallyLost = () => {
		if (player3 != null) {
			return player1!.longRallyLost + player3!.longRallyLost;
		}
		return player1!.longRallyLost;
	};

	const t2ShortRallyWon = () => {
		if (player4 != null) {
			return player2!.shortRallyWon + player4!.shortRallyWon;
		}
		return player2!.shortRallyWon;
	};

	const t2MediumRallyWon = () => {
		if (player4 != null) {
			return player2!.mediumRallyWon + player4!.mediumRallyWon;
		}
		return player2!.mediumRallyWon;
	};

	const t2LongRallyWon = () => {
		if (player4 != null) {
			return player2!.longRallyWon + player4!.longRallyWon;
		}
		return player2!.longRallyWon;
	};

	const t2ShortRallyLost = () => {
		if (player4 != null) {
			return player2!.shortRallyLost + player4!.shortRallyLost;
		}
		return player2!.shortRallyLost;
	};

	const t2MediumRallyLost = () => {
		if (player4 != null) {
			return player2!.mediumRallyLost + player4!.mediumRallyLost;
		}
		return player2!.mediumRallyLost;
	};

	const t2LongRallyLost = () => {
		if (player4 != null) {
			return player2!.longRallyLost + player4!.longRallyLost;
		}
		return player2!.longRallyLost;
	};

	const t1ServicesDone = t1FirstServIn() + t1SecondServIn() + t1DoubleFaults();
	const t2ServicesDone = t2FirstServIn() + t2SecondServIn() + t2DoubleFaults();

	return [
		{
			title: "Servicio",
			stats: [
				{
					name: "Aces",
					firstValue: `${t1Aces()}`,
					secondValue: `${t2Aces()}`,
				},
				{
					name: "Doble faltas",
					firstValue: `${t1DoubleFaults()}`,
					secondValue: `${t2DoubleFaults()}`,
				},
				{
					name: "1er servicio in",
					firstValue: `${t1FirstServIn()}/${t1ServicesDone} (${calculatePercentage(t1FirstServIn(), t1ServicesDone)}%)`,
					secondValue: `${t2FirstServIn()}/${t2ServicesDone} (${calculatePercentage(t2FirstServIn(), t2ServicesDone)}%)`,
					percentage1: calculatePercentage(t1FirstServIn(), t1ServicesDone),
					percentage2: calculatePercentage(t2FirstServIn(), t2ServicesDone),
				},
				{
					name: "1er saque ganador",
					firstValue: `${t1FirstServWon()}`,
					secondValue: `${t2FirstServWon()}`,
				},
				{
					name: "Puntos ganados con el 1er servicio",
					firstValue: `${t1PointsWinnedFirstServ()}/${t1FirstServIn()} (${calculatePercentage(t1PointsWinnedFirstServ(), t1FirstServIn())}%)`,
					secondValue: `${t2PointsWinnedFirstServ()}/${t2FirstServIn()} (${calculatePercentage(t2PointsWinnedFirstServ(), t2FirstServIn())}%)`,
					percentage1: calculatePercentage(
						t1PointsWinnedFirstServ(),
						t1FirstServIn(),
					),
					percentage2: calculatePercentage(
						t2PointsWinnedFirstServ(),
						t2FirstServIn(),
					),
				},
				{
					name: "2do servicio in",
					firstValue: `${t1SecondServIn()}/${t1SecondServIn() + t1DoubleFaults()} (${calculatePercentage(t1SecondServIn(), t1SecondServIn() + t1DoubleFaults())}%)`,
					secondValue: `${t2SecondServIn()}/${t2SecondServIn() + t2DoubleFaults()} (${calculatePercentage(t2SecondServIn(), t2SecondServIn() + t2DoubleFaults())}%)`,
					percentage1: calculatePercentage(
						t1SecondServIn(),
						t1SecondServIn() + t1DoubleFaults(),
					),
					percentage2: calculatePercentage(
						t2SecondServIn(),
						t2SecondServIn() + t2DoubleFaults(),
					),
				},
				{
					name: "2do saque ganador",
					firstValue: `${t1SecondServWon()}`,
					secondValue: `${t2SecondServWon()}`,
				},
				{
					name: "Puntos ganados con el 2do servicio",
					firstValue: `${t1PointsWinnedSecondServ()}/${t1SecondServIn()} (${calculatePercentage(t1PointsWinnedSecondServ(), t1SecondServIn())}%)`,
					secondValue: `${t2PointsWinnedSecondServ()}/${t2SecondServIn()} (${calculatePercentage(t2PointsWinnedSecondServ(), t2SecondServIn())}%)`,
					percentage1: calculatePercentage(
						t1PointsWinnedSecondServ(),
						t1SecondServIn(),
					),
					percentage2: calculatePercentage(
						t2PointsWinnedSecondServ(),
						t2SecondServIn(),
					),
				},
				{
					name: "Break points salvados",
					firstValue: `${t1BreakPtsSaved()}/${t1SaveBreakPtsChances()}`,
					secondValue: `${t2BreakPtsSaved()}/${t2SaveBreakPtsChances()}`,
				},
				{
					name: "Games ganados con el servicio",
					firstValue: `${t1GamesWonServing()}/${t1GamesWonServing() + t1GamesLostServing()}`,
					secondValue: `${t2GamesWonServing()}/${t2GamesWonServing() + t2GamesLostServing()}`,
				},
			],
		},
		{
			title: "Devolución",
			stats: [
				{
					name: "1era devolución in",
					firstValue: `${t1FirstReturnIn()}/${t1FirstReturnIn() + t1FirstReturnOut()} (${calculatePercentage(t1FirstReturnIn(), t1FirstReturnIn() + t1FirstReturnOut())}%)`,
					secondValue: `${t2FirstReturnIn()}/${t2FirstReturnIn() + t2FirstReturnOut()} (${calculatePercentage(t2FirstReturnIn(), t2FirstReturnIn() + t2FirstReturnOut())}%)`,
					percentage1: calculatePercentage(
						t1FirstReturnIn(),
						t1FirstReturnIn() + t1FirstReturnOut(),
					),
					percentage2: calculatePercentage(
						t2FirstReturnIn(),
						t2FirstReturnIn() + t2FirstReturnOut(),
					),
				},
				{
					name: "1era devolución ganadora",
					firstValue: `${t1FirstReturnWon()}`,
					secondValue: `${t2FirstReturnWon()}`,
				},
				{
					name: "Winner con 1era devolución",
					firstValue: `${t1FirstReturnWinner()}`,
					secondValue: `${t2FirstReturnWinner()}`,
				},
				{
					name: "Puntos ganados con la 1era devolución",
					firstValue: `${t1PointsWinnedFirstReturn()}/${t1FirstReturnIn() + t1FirstReturnOut()} (${calculatePercentage(t1PointsWinnedFirstReturn(), t1FirstReturnIn() + t1FirstReturnOut())}%)`,
					secondValue: `${t2PointsWinnedFirstReturn()}/${t2FirstReturnIn() + t2FirstReturnOut()} (${calculatePercentage(t2PointsWinnedFirstReturn(), t2FirstReturnIn() + t2FirstReturnOut())}%)`,
					percentage1: calculatePercentage(
						t1PointsWinnedFirstReturn(),
						t1FirstReturnIn() + t1FirstReturnOut(),
					),
					percentage2: calculatePercentage(
						t2PointsWinnedFirstReturn(),
						t2FirstReturnIn() + t2FirstReturnOut(),
					),
				},
				{
					name: "2da devolución in",
					firstValue: `${t1SecondReturnIn()}/${t1SecondReturnIn() + t1SecondReturnOut()} (${calculatePercentage(t1SecondReturnIn(), t1SecondReturnIn() + t1SecondReturnOut())}%)`,
					secondValue: `${t2SecondReturnIn()}/${t2SecondReturnIn() + t2SecondReturnOut()} (${calculatePercentage(t2SecondReturnIn(), t2SecondReturnIn() + t2SecondReturnOut())}%)`,
					percentage1: calculatePercentage(
						t1SecondReturnIn(),
						t1SecondReturnIn() + t1SecondReturnOut(),
					),
					percentage2: calculatePercentage(
						t2SecondReturnIn(),
						t2SecondReturnIn() + t2SecondReturnOut(),
					),
				},
				{
					name: "2da devolución ganadora",
					firstValue: `${t1SecondReturnWon()}`,
					secondValue: `${t2SecondReturnWon()}`,
				},
				{
					name: "Winner con 2da devolución",
					firstValue: `${t1SecondReturnWinner()}`,
					secondValue: `${t2SecondReturnWinner()}`,
				},
				{
					name: "Puntos ganados con la 2da devolución",
					firstValue: `${t1PointsWinnedSecondReturn()}/${t1SecondReturnIn() + t1SecondReturnOut()} (${calculatePercentage(t1PointsWinnedSecondReturn(), t1SecondReturnIn() + t1SecondReturnOut())}%)`,
					secondValue: `${t2PointsWinnedSecondReturn()}/${t2SecondReturnIn() + t2SecondReturnOut()} (${calculatePercentage(t2PointsWinnedSecondReturn(), t2SecondReturnIn() + t2SecondReturnOut())}%)`,
					percentage1: calculatePercentage(
						t1PointsWinnedSecondReturn(),
						t1SecondReturnIn() + t1SecondReturnOut(),
					),
					percentage2: calculatePercentage(
						t2PointsWinnedSecondReturn(),
						t2SecondReturnIn() + t2SecondReturnOut(),
					),
				},
				{
					name: "Break point",
					firstValue: `${t1BreakPts()}/${t1BreakPtsChances()}`,
					secondValue: `${t2BreakPts()}/${t2BreakPtsChances()}`,
				},
				{
					name: "Games ganados devolviendo",
					firstValue: `${t1GamesWonReturning()}/${t1GamesWonReturning() + t1GamesLostReturning()}`,
					secondValue: `${t2GamesWonReturning()}/${t2GamesWonReturning() + t2GamesLostReturning()}`,
				},
			],
		},
		{
			title: "Pelota en Juego",
			stats: [
				{
					name: "Puntos ganados en malla",
					firstValue: `${t1MeshPointsWon()}/${t1MeshPointsWon() + t1MeshPointsLost()} (${calculatePercentage(t1MeshPointsWon(), t1MeshPointsWon() + t1MeshPointsLost())}%)`,
					secondValue: `${t2MeshPointsWon()}/${t2MeshPointsWon() + t2MeshPointsLost()} (${calculatePercentage(t2MeshPointsWon(), t2MeshPointsWon() + t2MeshPointsLost())}%)`,
					percentage1: calculatePercentage(
						t1MeshPointsWon(),
						t1MeshPointsWon() + t1MeshPointsLost(),
					),
					percentage2: calculatePercentage(
						t2MeshPointsWon(),
						t2MeshPointsWon() + t2MeshPointsLost(),
					),
				},
				{
					name: "Winners en malla",
					firstValue: `${t1MeshWinners()}`,
					secondValue: `${t2MeshWinners()}`,
				},
				{
					name: "Errores en malla",
					firstValue: `${t1MeshError()}`,
					secondValue: `${t2MeshError()}`,
				},
				{
					name: "Puntos ganados en fondo/approach",
					firstValue: `${t1BckgPointsWon()}/${t1BckgPointsWon() + t1BckgPointsLost()} (${calculatePercentage(t1BckgPointsWon(), t1BckgPointsWon() + t1BckgPointsLost())}%)`,
					secondValue: `${t2BckgPointsWon()}/${t2BckgPointsWon() + t2BckgPointsLost()} (${calculatePercentage(t2BckgPointsWon(), t2BckgPointsWon() + t2BckgPointsLost())}%)`,
					percentage1: calculatePercentage(
						t1BckgPointsWon(),
						t1BckgPointsWon() + t1BckgPointsLost(),
					),
					percentage2: calculatePercentage(
						t2BckgPointsWon(),
						t2BckgPointsWon() + t2BckgPointsLost(),
					),
				},
				{
					name: "Winners en fondo/approach",
					firstValue: `${t1BckgWinner()}`,
					secondValue: `${t2BckgWinner()}`,
				},
				{
					name: "Errores en fondo/approach",
					firstValue: `${t1BckgError()}`,
					secondValue: `${t2BckgError()}`,
				},
				{
					name: "Total winner",
					firstValue: `${t1MeshWinners() + t1BckgWinner() + t1FirstReturnWinner() + t1SecondReturnWinner() + t1Aces()!}`,
					secondValue: `${t2MeshWinners() + t2BckgWinner() + t2FirstReturnWinner() + t2SecondReturnWinner() + t2Aces()}`,
				},
				{
					name: "Total errores no forzados",
					firstValue: `${t1MeshError() + t1BckgError() + t1DoubleFaults()}`,
					secondValue: `${t2MeshError() + t2BckgError() + t2DoubleFaults()}`,
				},
			],
		},
		{
			title: "Puntos",
			stats: [
				{
					name: "Puntos cortos ganados",
					firstValue: `${t1ShortRallyWon()}/${t1ShortRallyWon() + t1ShortRallyLost()} (${calculatePercentage(t1ShortRallyWon(), t1ShortRallyWon() + t1ShortRallyLost())}%)`,
					secondValue: `${t2ShortRallyWon()}/${t2ShortRallyWon() + t2ShortRallyLost()} (${calculatePercentage(t2ShortRallyWon(), t2ShortRallyWon() + t2ShortRallyLost())}%)`,
					percentage1: calculatePercentage(
						t1ShortRallyWon(),
						t1ShortRallyWon() + t1ShortRallyLost(),
					),
					percentage2: calculatePercentage(
						t2ShortRallyWon(),
						t2ShortRallyWon() + t2ShortRallyLost(),
					),
				},
				{
					name: "Puntos medianos ganados",
					firstValue: `${t1MediumRallyWon()}/${t1MediumRallyWon() + t1MediumRallyLost()} (${calculatePercentage(t1MediumRallyWon(), t1MediumRallyWon() + t1MediumRallyLost())}%)`,
					secondValue: `${t2MediumRallyWon()}/${t2MediumRallyWon() + t2MediumRallyLost()} (${calculatePercentage(t2MediumRallyWon(), t2MediumRallyWon() + t2MediumRallyLost())}%)`,
					percentage1: calculatePercentage(
						t1MediumRallyWon(),
						t1MediumRallyWon() + t1MediumRallyLost(),
					),
					percentage2: calculatePercentage(
						t2MediumRallyWon(),
						t2MediumRallyWon() + t2MediumRallyLost(),
					),
				},
				{
					name: "Puntos largos ganados",
					firstValue: `${t1LongRallyWon()}/${t1LongRallyWon() + t1LongRallyLost()} (${calculatePercentage(t1LongRallyWon(), t1LongRallyWon() + t1LongRallyLost())}%)`,
					secondValue: `${t2LongRallyWon()}/${t2LongRallyWon() + t2LongRallyLost()} (${calculatePercentage(t2LongRallyWon(), t2LongRallyWon() + t2LongRallyLost())}%)`,
					percentage1: calculatePercentage(
						t1LongRallyWon(),
						t1LongRallyWon() + t1LongRallyLost(),
					),
					percentage2: calculatePercentage(
						t2LongRallyWon(),
						t2LongRallyWon() + t2LongRallyLost(),
					),
				},
			],
		},
	];
}

export function buildParticipantsSections(
	p1: ParticipantStats,
	p2: ParticipantStats,
): Section[] {
	return [
		{
			title: "Servicio",
			stats: [
				{
					name: "Aces",
					firstValue: `${p1.aces}`,
					secondValue: `${p2.aces}`,
				},
				{
					name: "Doble faltas",
					firstValue: `${p1.dobleFaults}`,
					secondValue: `${p2.dobleFaults}`,
				},
				{
					name: "1er servicio in",
					firstValue: `${p1.firstServIn}/${p1.firstServIn + p1.secondServIn + p1.dobleFaults} (${calculatePercentage(p1.firstServIn, p1.firstServIn + p1.secondServIn + p1.dobleFaults)}%)`,
					secondValue: `${p2.firstServIn}/${p2.firstServIn + p2.secondServIn + p2.dobleFaults} (${calculatePercentage(p2.firstServIn, p2.firstServIn + p2.secondServIn + p2.dobleFaults)}%)`,
					percentage1: calculatePercentage(
						p1.firstServIn,
						p1.firstServIn + p1.secondServIn + p1.dobleFaults,
					),
					percentage2: calculatePercentage(
						p2.firstServIn,
						p2.firstServIn + p2.secondServIn + p2.dobleFaults,
					),
				},
				{
					name: "1er saque ganador",
					firstValue: `${p1.firstServWon}`,
					secondValue: `${p2.firstServWon}`,
				},
				{
					name: "Puntos ganados con el 1er servicio",
					firstValue: `${p1.pointsWinnedFirstServ}/${p1.firstServIn} (${calculatePercentage(p1.pointsWinnedFirstServ, p1.firstServIn)}%)`,
					secondValue: `${p2.pointsWinnedFirstServ}/${p2.firstServIn} (${calculatePercentage(p2.pointsWinnedFirstServ, p2.firstServIn)}%)`,
					percentage1: calculatePercentage(
						p1.pointsWinnedFirstServ,
						p1.firstServIn,
					),
					percentage2: calculatePercentage(
						p2.pointsWinnedFirstServ,
						p2.firstServIn,
					),
				},
				{
					name: "2do servicio in",
					firstValue: `${p1.secondServIn}/${p1.secondReturnIn + p1.dobleFaults} (${calculatePercentage(p1.secondServIn, p1.secondServIn + p1.dobleFaults)}%)`,
					secondValue: `${p2.secondServIn}/${p2.secondServIn + p2.dobleFaults} (${calculatePercentage(p2.secondServIn, p2.secondServIn + p2.dobleFaults)}%)`,
					percentage1: calculatePercentage(
						p1.secondServIn,
						p1.secondServIn + p1.dobleFaults,
					),
					percentage2: calculatePercentage(
						p1.secondServIn,
						p1.secondServIn + p1.dobleFaults,
					),
				},
				{
					name: "2do saque ganador",
					firstValue: `${p1.secondServWon}`,
					secondValue: `${p2.secondServWon}`,
				},
				{
					name: "Puntos ganados con el 2do servicio",
					firstValue: `${p1.pointsWinnedSecondServ}/${p1.secondServIn} (${calculatePercentage(p1.pointsWinnedSecondServ, p1.secondServIn)}%)`,
					secondValue: `${p2.pointsWinnedSecondServ}/${p2.secondServIn} (${calculatePercentage(p2.pointsWinnedSecondServ, p2.secondServIn)}%)`,
					percentage1: calculatePercentage(
						p1.pointsWinnedSecondServ,
						p1.secondServIn,
					),
					percentage2: calculatePercentage(
						p2.pointsWinnedSecondServ,
						p2.secondServIn,
					),
				},
				{
					name: "Break points salvados",
					firstValue: `${p1.breakPtsSaved}/${p1.saveBreakPtsChances}`,
					secondValue: `${p2.breakPtsSaved}/${p2.saveBreakPtsChances}`,
				},
				{
					name: "Games ganados con el servicio",
					firstValue: `${p1.gamesWonServing}/${p1.gamesWonServing + p1.gamesLostServing}`,
					secondValue: `${p2.gamesWonServing}/${p2.gamesWonServing + p2.gamesLostServing}`,
				},
			],
		},
		{
			title: "Devolución",
			stats: [
				{
					name: "1era devolución in",
					firstValue: `${p1.firstReturnIn}/${p1.firstReturnIn + p1.firstReturnOut} (${calculatePercentage(p1.firstReturnIn, p1.firstReturnIn + p1.firstReturnOut)}%)`,
					secondValue: `${p2.firstReturnIn}/${p2.firstReturnIn + p2.firstReturnOut} (${calculatePercentage(p2.firstReturnIn, p2.firstReturnIn + p2.firstReturnOut)}%)`,
					percentage1: calculatePercentage(
						p1.firstReturnIn,
						p1.firstReturnIn + p1.firstReturnOut,
					),
					percentage2: calculatePercentage(
						p2.firstReturnIn,
						p2.firstReturnIn + p2.firstReturnOut,
					),
				},
				{
					name: "1era devolución ganadora",
					firstValue: `${p1.firstReturnWon}`,
					secondValue: `${p2.firstReturnWon}`,
				},
				{
					name: "Winner con 1era devolución",
					firstValue: `${p1.firstReturnWinner}`,
					secondValue: `${p2.firstReturnWinner}`,
				},
				{
					name: "Puntos ganados con la 1era devolución",
					firstValue: `${p1.pointsWinnedFirstReturn}/${p1.firstReturnIn + p1.firstReturnOut} (${calculatePercentage(p1.pointsWinnedFirstReturn, p1.firstReturnIn + p1.firstReturnOut)}%)`,
					secondValue: `${p2.pointsWinnedFirstReturn}/${p2.firstReturnIn + p2.firstReturnOut} (${calculatePercentage(p2.pointsWinnedFirstReturn, p2.firstReturnIn + p2.firstReturnOut)}%)`,
					percentage1: calculatePercentage(
						p1.pointsWinnedFirstReturn,
						p1.firstReturnIn + p1.firstReturnOut,
					),
					percentage2: calculatePercentage(
						p2.pointsWinnedFirstReturn,
						p2.firstReturnIn + p2.firstReturnOut,
					),
				},
				{
					name: "2da devolución in",
					firstValue: `${p1.secondReturnIn}/${p1.secondReturnIn + p1.secondReturnOut} (${calculatePercentage(p1.secondReturnIn, p1.secondReturnIn + p1.secondReturnOut)}%)`,
					secondValue: `${p2.secondReturnIn}/${p2.secondReturnIn + p2.secondReturnOut} (${calculatePercentage(p2.secondReturnIn, p2.secondReturnIn + p2.secondReturnOut)}%)`,
					percentage1: calculatePercentage(
						p1.secondReturnIn,
						p1.secondReturnIn + p1.secondReturnOut,
					),
					percentage2: calculatePercentage(
						p2.secondReturnIn,
						p2.secondReturnIn + p2.secondReturnOut,
					),
				},
				{
					name: "2da devolución ganadora",
					firstValue: `${p1.secondReturnWon}`,
					secondValue: `${p2.secondReturnWon}`,
				},
				{
					name: "Winner con 2da devolución",
					firstValue: `${p1.secondReturnWinner}`,
					secondValue: `${p2.secondReturnWinner}`,
				},
				{
					name: "Puntos ganados con la 2da devolución",
					firstValue: `${p1.pointsWinnedSecondReturn}/${p1.secondReturnIn + p1.secondReturnOut} (${calculatePercentage(p1.pointsWinnedSecondReturn, p1.secondReturnIn + p1.secondReturnOut)}%)`,
					secondValue: `${p2.pointsWinnedSecondReturn}/${p2.secondReturnIn + p2.secondReturnOut} (${calculatePercentage(p2.pointsWinnedSecondReturn, p2.secondReturnIn + p2.secondReturnOut)}%)`,
					percentage1: calculatePercentage(
						p1.pointsWinnedSecondReturn,
						p1.secondReturnIn + p1.secondReturnOut,
					),
					percentage2: calculatePercentage(
						p2.pointsWinnedSecondReturn,
						p2.secondReturnIn + p2.secondReturnOut,
					),
				},
				{
					name: "Break point",
					firstValue: `${p1.breakPts}/${p1.breakPtsChances}`,
					secondValue: `${p2.breakPts}/${p2.breakPtsChances}`,
				},
				{
					name: "Games ganados devolviendo",
					firstValue: `${p1.gamesWonReturning}/${p1.gamesWonReturning + p1.gamesLostReturning}`,
					secondValue: `${p2.gamesWonReturning}/${p2.gamesWonReturning + p2.gamesLostReturning}`,
				},
			],
		},
		{
			title: "Pelota en Juego",
			stats: [
				{
					name: "Puntos ganados en malla",
					firstValue: `${p1.meshPointsWon}/${p1.meshPointsWon + p1.meshPointsLost} (${calculatePercentage(p1.meshPointsWon, p1.meshPointsWon + p1.meshPointsLost)}%)`,
					secondValue: `${p2.meshPointsWon}/${p2.meshPointsWon + p2.meshPointsLost} (${calculatePercentage(p2.meshPointsWon, p2.meshPointsWon + p2.meshPointsLost)}%)`,
					percentage1: calculatePercentage(
						p1.meshPointsWon,
						p1.meshPointsWon + p1.meshPointsLost,
					),
					percentage2: calculatePercentage(
						p2.meshPointsWon,
						p2.meshPointsWon + p2.meshPointsLost,
					),
				},
				{
					name: "Winners en malla",
					firstValue: `${p1.meshWinner}`,
					secondValue: `${p2.meshWinner}`,
				},
				{
					name: "Errores en malla",
					firstValue: `${p1.meshError}`,
					secondValue: `${p2.meshError}`,
				},
				{
					name: "Puntos ganados en fondo/approach",
					firstValue: `${p1.bckgPointsWon}/${p1.bckgPointsWon + p1.bckgPointsLost} (${calculatePercentage(p1.bckgPointsWon, p1.bckgPointsWon + p1.bckgPointsLost)}%)`,
					secondValue: `${p2.bckgPointsWon}/${p2.bckgPointsWon + p2.bckgPointsLost} (${calculatePercentage(p2.bckgPointsWon, p2.bckgPointsWon + p2.bckgPointsLost)}%)`,
					percentage1: calculatePercentage(
						p1.bckgPointsWon,
						p1.bckgPointsWon + p1.bckgPointsLost,
					),
					percentage2: calculatePercentage(
						p2.bckgPointsWon,
						p2.bckgPointsWon + p2.bckgPointsLost,
					),
				},
				{
					name: "Winners en fondo/approach",
					firstValue: `${p1.bckgWinner}`,
					secondValue: `${p2.bckgWinner}`,
				},
				{
					name: "Errores en fondo/approach",
					firstValue: `${p1.bckgError}`,
					secondValue: `${p2.bckgError}`,
				},
				{
					name: "Total winner",
					firstValue: `${p1.meshWinner + p1.bckgWinner + p1.firstReturnWinner + p1.secondReturnWinner + p1.aces}`,
					secondValue: `${p2.meshWinner + p2.bckgWinner + p2.firstReturnWinner + p2.secondReturnWinner + p2.aces}`,
				},
				{
					name: "Total errores no forzados",
					firstValue: `${p1.meshError + p1.bckgError + p1.dobleFaults}`,
					secondValue: `${p2.meshError + p2.bckgError + p2.dobleFaults}`,
				},
			],
		},
		{
			title: "Puntos",
			stats: [
				{
					name: "Puntos cortos ganados",
					firstValue: `${p1.shortRallyWon}/${p1.shortRallyWon + p1.shortRallyLost} (${calculatePercentage(p1.shortRallyWon, p1.shortRallyWon + p1.shortRallyLost)}%)`,
					secondValue: `${p2.shortRallyWon}/${p2.shortRallyWon + p2.shortRallyLost} (${calculatePercentage(p2.shortRallyWon, p2.shortRallyWon + p2.shortRallyLost)}%)`,
					percentage1: calculatePercentage(
						p1.shortRallyWon,
						p1.shortRallyWon + p1.shortRallyLost,
					),
					percentage2: calculatePercentage(
						p2.shortRallyWon,
						p2.shortRallyWon + p2.shortRallyLost,
					),
				},
				{
					name: "Puntos medianos ganados",
					firstValue: `${p1.mediumRallyWon}/${p1.mediumRallyWon + p1.mediumRallyLost} (${calculatePercentage(p1.mediumRallyWon, p1.mediumRallyWon + p1.mediumRallyLost)}%)`,
					secondValue: `${p2.mediumRallyWon}/${p2.mediumRallyWon + p2.mediumRallyLost} (${calculatePercentage(p2.mediumRallyWon, p2.mediumRallyWon + p2.mediumRallyLost)}%)`,
					percentage1: calculatePercentage(
						p1.mediumRallyWon,
						p1.mediumRallyWon + p1.mediumRallyLost,
					),
					percentage2: calculatePercentage(
						p2.mediumRallyWon,
						p2.mediumRallyWon + p2.mediumRallyLost,
					),
				},
				{
					name: "Puntos largos ganados",
					firstValue: `${p1.longRallyWon}/${p1.longRallyWon + p1.longRallyLost} (${calculatePercentage(p1.longRallyWon, p1.longRallyWon + p1.longRallyLost)}%)`,
					secondValue: `${p2.longRallyWon}/${p2.longRallyWon + p2.longRallyLost} (${calculatePercentage(p2.longRallyWon, p2.longRallyWon + p2.longRallyLost)}%)`,
					percentage1: calculatePercentage(
						p1.longRallyWon,
						p1.longRallyWon + p1.longRallyLost,
					),
					percentage2: calculatePercentage(
						p2.longRallyWon,
						p2.longRallyWon + p2.longRallyLost,
					),
				},
			],
		},
	];
}

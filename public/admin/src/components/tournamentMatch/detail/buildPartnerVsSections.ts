import type { ParticipantStats } from "../../../types/participantStats";
import { calculatePercentage } from "../../../utils/calculatePercantage";
import type { Section } from "./statsTable";

export function buildPartnerVsSections(
	p1: ParticipantStats,
	p2: ParticipantStats,
): Section[] {
	const p1ServicesDone = p1.firstServIn + p1.secondServIn + p1.dobleFaults;
	const p2ServicesDone = p2.firstServIn + p2.secondServIn + p2.dobleFaults;

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
					firstValue: `${p1.firstServIn}/${p1ServicesDone} (${calculatePercentage(p1.firstServIn, p1ServicesDone)}%)`,
					secondValue: `${p2.firstServIn}/${p2ServicesDone} (${calculatePercentage(p2.firstServIn, p2ServicesDone)}%)`,
					percentage1: calculatePercentage(p1.firstServIn, p1ServicesDone),
					percentage2: calculatePercentage(p2.firstServIn, p2ServicesDone),
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
					firstValue: `${p1.secondServIn}/${p1.secondServIn + p1.dobleFaults} (${calculatePercentage(p1.secondServIn, p1.secondServIn + p1.dobleFaults)}%)`,
					secondValue: `${p2.secondServIn}/${p2.secondServIn + p2.dobleFaults} (${calculatePercentage(p2.secondServIn, p2.secondServIn + p2.dobleFaults)}%)`,
					percentage1: calculatePercentage(
						p1.secondServIn,
						p1.secondServIn + p1.dobleFaults,
					),
					percentage2: calculatePercentage(
						p2.secondServIn,
						p2.secondServIn + p2.dobleFaults,
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

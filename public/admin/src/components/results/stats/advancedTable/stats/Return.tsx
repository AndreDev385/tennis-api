import { IPropsTable } from "../../GameStats"
import '../../GameStats.scss'

const Return = ({tracker}: IPropsTable) => {
  return (
    <>
        <div className="title">
            <span>
              Devolución
            </span>
        </div>

        <tbody>
            <tr>
              <td className="text-center">
                1ra devolución in
              </td>
              <td className="text-center">
                {tracker.me.firstReturnIn}/
                {tracker.rivalFirstServIn}
                ({Math.floor(tracker.me.firstReturnIn/tracker.rivalFirstServIn*100)}%)
              </td>
              <td className="text-center">
                {tracker.rivalFirstReturnIn}/
                {tracker.me.firstServIn}
                ({Math.floor(tracker.rivalFirstReturnIn/tracker.me.firstServIn*100)}%)
              </td>
            </tr>

            <tr>
              <td className="text-center">
                2da devolución in
              </td>
              <td className="text-center">
                {tracker.me.secondReturnIn}/
                {tracker.rivalSecondServIn}
                ({Math.floor(tracker.me.secondReturnIn/tracker.rivalSecondServIn*100)}%)
              </td>
              <td className="text-center">
                {tracker.rivalSecondReturnIn}/
                {tracker.me.secondServIn}
                ({Math.floor(tracker.rivalSecondReturnIn/(tracker.me.secondServIn)*100)}%)
              </td>
            </tr>

            <tr>
              <td className="text-center">
                Puntos ganados con la 1ra devolución
              </td>
              <td className="text-center">
                {tracker.me.pointsWinnedFirstReturn}/
                {tracker.me.firstReturnIn}
                ({Math.floor(tracker.me.pointsWinnedFirstReturn/tracker.me.firstReturnIn*100)}%)
              </td>
              <td className="text-center">
                {tracker.rivalPointsWinnedFirstReturn}/
                {tracker.rivalFirstReturnIn}
                ({Math.floor(tracker.rivalPointsWinnedFirstReturn/tracker.rivalFirstReturnIn*100)}%)
              </td>
            </tr>

            <tr>
              <td className="text-center">
                Puntos ganados con la 2da devolución
              </td>
              <td className="text-center">
                {tracker.me.pointsWinnedSecondReturn}/
                {tracker.me.secondReturnIn}
                ({Math.floor(tracker.me.pointsWinnedSecondReturn/tracker.me.secondReturnIn*100)}%)
              </td>
              <td className="text-center">
                {tracker.rivalPointsWinnedSecondReturn}/
                {tracker.rivalSecondReturnIn}
                ({Math.floor(tracker.rivalPointsWinnedSecondReturn/tracker.rivalSecondReturnIn*100)}%)
              </td>
            </tr>

            <tr>
              <td className="text-center">
                Break points
              </td>
              <td className="text-center">
                {tracker.breakPtsWinned}/
                {tracker.winBreakPtsChances}
              </td>
              <td className="text-center">
                {tracker.me.saveBreakPtsChances - tracker.me.breakPtsSaved}/{tracker.me.saveBreakPtsChances}
              </td>
            </tr>

            <tr>
              <td className="text-center">
                Games ganados devolviendo
              </td>
              <td className="text-center">
                {tracker.gamesWonReturning}
              </td>
              <td className="text-center">
                  {tracker.me.gamesLostServing}
              </td>
            </tr>
        </tbody>
    </>
  )
}

export default Return
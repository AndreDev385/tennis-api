import { IPropsTable } from "../../GameStats"
import '../../GameStats.scss'

const Return = ({tracker, playerVsPlayer}: IPropsTable) => {
  return (
    <>
        <div className="title">
            <span>
              Devolución
            </span>
        </div>

        {tracker.partner && <tbody>
            <tr>
              <td className="text-center">
                1ra devolución in
              </td>
              <td className="text-center">
              {playerVsPlayer? 
                <span>
                  {tracker.me.firstReturnIn}/
                  {tracker.me.firstReturnIn + tracker.me.firstReturnOut}
                  ({Math.floor(tracker.me.firstReturnIn/(tracker.me.firstReturnIn + tracker.me.firstReturnOut)*100)}%)
                </span>:
                <span>
                  {tracker.me.firstReturnIn + tracker.partner.firstReturnIn}/
                  {tracker.rivalFirstServIn}
                  ({Math.floor((tracker.me.firstReturnIn + tracker.partner.firstReturnIn)/tracker.rivalFirstServIn*100)}%)
              </span>
              }
              </td>
              <td className="text-center">
              {playerVsPlayer? 
                <span>
                  {tracker.partner.firstReturnIn}/
                  {tracker.partner.firstReturnIn + tracker.partner.firstReturnOut}
                  ({Math.floor(tracker.partner.firstReturnIn/(tracker.partner.firstReturnIn + tracker.partner.firstReturnOut)*100)}%)
                </span>:
                <span>
                  {tracker.rivalFirstReturnIn}/
                  {tracker.me.firstServIn + tracker.partner.firstServIn}
                  ({Math.floor(tracker.rivalFirstReturnIn/(tracker.me.firstServIn + tracker.partner.firstServIn)*100)}%)
                </span>
              }
              </td>
            </tr>

            <tr>
              <td className="text-center">
                2da devolución in
              </td>
              <td className="text-center">
              {playerVsPlayer? 
                <span>
                  {tracker.me.secondReturnIn}/
                  {tracker.me.secondReturnIn + tracker.me.secondReturnOut}
                  ({Math.floor(tracker.me.secondReturnIn/(tracker.me.secondReturnIn + tracker.me.secondReturnOut)*100)}%)
                </span>
                :
                <span>
                {tracker.me.secondReturnIn + tracker.partner.secondReturnIn}/
                {tracker.rivalSecondServIn}
                ({Math.floor((tracker.me.secondReturnIn + tracker.partner.secondReturnIn)/tracker.rivalSecondServIn*100)}%)
              </span>
              }
              </td>
              <td className="text-center">
              {playerVsPlayer? 
                <span>
                  {tracker.partner.secondReturnIn}/
                  {tracker.partner.secondReturnIn + tracker.partner.secondReturnOut}
                  ({Math.floor(tracker.partner.secondReturnIn/(tracker.partner.secondReturnIn + tracker.partner.secondReturnOut)*100)}%)
                </span>
                :
                <span>
                  {tracker.rivalSecondReturnIn}/
                  {tracker.me.secondServIn + tracker.partner.secondServIn}
                  ({Math.floor(tracker.rivalSecondReturnIn/(tracker.me.secondServIn + tracker.partner.secondServIn)*100)}%)
                </span>
              }
              </td>
            </tr>

            <tr>
              <td className="text-center">
                Puntos ganados con la 1ra devolución
              </td>
              <td className="text-center">
              {playerVsPlayer? 
                <span>
                  {tracker.me.pointsWinnedFirstReturn}/
                  {tracker.me.firstReturnIn}
                  ({Math.floor(tracker.me.pointsWinnedFirstReturn/tracker.me.firstReturnIn*100)}%)
                </span>:
                <span>
                  {tracker.me.pointsWinnedFirstReturn + tracker.partner.pointsWinnedFirstReturn}/
                  {tracker.me.firstReturnIn + tracker.partner.firstReturnIn}
                  ({Math.floor((tracker.me.pointsWinnedFirstReturn + tracker.partner.pointsWinnedFirstReturn)/(tracker.me.firstReturnIn + tracker.partner.firstReturnIn)*100)}%)
                </span>
              }
              </td>
              <td className="text-center">
                {playerVsPlayer? 
                  <span>
                    {tracker.partner.pointsWinnedFirstReturn}/
                    {tracker.partner.firstReturnIn}
                    ({Math.floor(tracker.partner.pointsWinnedFirstReturn/tracker.partner.firstReturnIn*100)}%)
                  </span>:
                  <span>
                    {tracker.rivalPointsWinnedFirstReturn}/
                    {tracker.rivalFirstReturnIn}
                    ({Math.floor(tracker.rivalPointsWinnedFirstReturn/tracker.rivalFirstReturnIn*100)}%)
                  </span>
                }
              </td>
            </tr>

            <tr>
              <td className="text-center">
                Puntos ganados con la 2da devolución
              </td>
              <td className="text-center">
                {playerVsPlayer? 
                  <span>
                    {tracker.me.pointsWinnedSecondReturn}/
                    {tracker.me.secondReturnIn}
                    ({Math.floor(tracker.me.pointsWinnedSecondReturn/tracker.me.secondReturnIn*100)}%)
                  </span>:
                  <span>
                    {tracker.me.pointsWinnedSecondReturn + tracker.partner.pointsWinnedSecondReturn}/
                    {tracker.me.secondReturnIn + tracker.partner.secondReturnIn}
                    ({Math.floor((tracker.me.pointsWinnedSecondReturn + tracker.partner.pointsWinnedSecondReturn)/(tracker.me.secondReturnIn + tracker.partner.secondReturnIn)*100)}%)
                  </span>
                }
              </td>
              <td className="text-center">
                {playerVsPlayer? 
                  <span>
                    {tracker.partner.pointsWinnedSecondReturn}/
                    {tracker.partner.secondReturnIn}
                    ({Math.floor(tracker.partner.pointsWinnedSecondReturn/tracker.partner.secondReturnIn*100)}%)
                  </span>:
                  <span>
                    {tracker.rivalPointsWinnedSecondReturn}/
                    {tracker.rivalSecondReturnIn}
                    ({Math.floor(tracker.rivalPointsWinnedSecondReturn/tracker.rivalSecondReturnIn*100)}%)
                  </span>
                }
              </td>
            </tr>

            {!playerVsPlayer && <tr>
              <td className="text-center">
                Break points
              </td>
              <td className="text-center">
                {tracker.breakPtsWinned}/
                {tracker.winBreakPtsChances}
              </td>
              <td className="text-center">
                {(tracker.me.saveBreakPtsChances + tracker.partner.saveBreakPtsChances) - (tracker.me.breakPtsSaved + tracker.partner.breakPtsSaved)}/{tracker.me.saveBreakPtsChances + tracker.partner.saveBreakPtsChances}
              </td>
            </tr>}

            {!playerVsPlayer && <tr>
              <td className="text-center">
                Games ganados devolviendo
              </td>
              <td className="text-center">
                {tracker.gamesWonReturning}
              </td>
              <td className="text-center">
                {tracker.me.gamesLostServing + tracker.partner.gamesLostServing}
              </td>
            </tr>}
        </tbody>}
    </>
  )
}

export default Return
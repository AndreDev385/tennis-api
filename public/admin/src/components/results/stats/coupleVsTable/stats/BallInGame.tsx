import { IPropsTable } from '../../GameStats'
import '../../GameStats.scss'

const BallInGame = ({tracker, playerVsPlayer}: IPropsTable) => {
  return (
    <>
        <div className="title">
            <span>
              Pelota en juego
            </span>
          </div>

          {tracker.partner && <tbody>
            {playerVsPlayer &&
              <tr>
                <td className="text-center">
                  Puntos ganados en malla
                </td>
                <td className="text-center">
                  {tracker.me.meshPointsWon}/
                  {tracker.me.meshPointsLost + tracker.me.meshPointsWon}
                  ({Math.floor(tracker.me.meshPointsWon/(tracker.me.meshPointsLost + tracker.me.meshPointsWon)*100)}%)
                </td>
                <td className="text-center">
                  {tracker.partner.meshPointsWon}/
                  {tracker.partner.meshPointsLost + tracker.partner.meshPointsWon}
                  ({Math.floor(tracker.partner.meshPointsWon/(tracker.partner.meshPointsLost + tracker.partner.meshPointsWon)*100)}%)
                </td>
              </tr>
            }

            {playerVsPlayer &&
              <tr>
                <td className="text-center">
                  Puntos ganados de fondo/approach
                </td>
                <td className="text-center">
                  {tracker.me.bckgPointsWon}/
                  {tracker.me.bckgPointsWon + tracker.me.bckgPointsLost + tracker.me.winners}
                  ({Math.floor(tracker.me.bckgPointsWon/(tracker.me.bckgPointsLost + tracker.me.bckgPointsWon + tracker.me.winners)*100)}%)
                </td>
                <td className="text-center">
                  {tracker.partner.bckgPointsWon}/
                  {tracker.partner.bckgPointsWon + tracker.partner.bckgPointsLost + tracker.partner.winners}
                  ({Math.floor(tracker.partner.bckgPointsWon/(tracker.partner.bckgPointsLost + tracker.partner.bckgPointsWon  + tracker.partner.winners)*100)}%)
                </td>
              </tr>
            }

            <tr>
              <td className="text-center">
                Winners
              </td>
              <td className="text-center">
                {playerVsPlayer? 
                  <span>
                    {tracker.me.winners} 
                  </span>:
                  <span>
                    {tracker.me.winners + tracker.partner.winners}
                  </span>
                }
              </td>
              <td className="text-center">
                {playerVsPlayer? 
                  <span>
                    {tracker.partner.winners}
                  </span>:
                  <span>
                    {tracker.rivalWinners}
                  </span>
                }
              </td>
            </tr>

            <tr>
              <td className="text-center">
                Errores no forzados
              </td>
              <td className="text-center">
                {playerVsPlayer? 
                  <span>
                    {tracker.me.noForcedErrors}
                  </span>:
                  <span>
                    {tracker.me.noForcedErrors + tracker.partner.noForcedErrors}
                  </span>
                }
              </td>
              <td className="text-center">
                {playerVsPlayer? 
                  <span>
                    {tracker.partner.noForcedErrors}
                  </span>:
                  <span>
                    {tracker.rivalNoForcedErrors}
                  </span>
                }
              </td>
            </tr>
        </tbody>}
    </>
  )
}

export default BallInGame
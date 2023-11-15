import { IPropsTable } from '../../GameStats'
import '../../GameStats.scss'

const Games = ({tracker}: IPropsTable) => {
  return (
    <>
        <div className="title">
            <span>
              Games
            </span>
          </div>
          
          {tracker.partner && <tbody>
            <tr>
              <td className="text-center">
                Games ganados con el servicio
              </td>
              <td className="text-center">
                {tracker.me.gamesWonServing + tracker.partner.gamesWonServing}/
                {tracker.me.gamesWonServing + tracker.me.gamesLostServing + tracker.partner.gamesWonServing + tracker.partner.gamesLostServing}
              </td>
              <td className="text-center">
                {tracker.gamesLostReturning}/
                {tracker.gamesLostReturning + tracker.gamesWonReturning}
              </td>
            </tr>

            <tr>
              <td className="text-center">
                Games ganados con la devolución
              </td>
              <td className="text-center">
                {tracker.gamesWonReturning}/
                {tracker.gamesWonReturning + tracker.gamesLostReturning}
              </td>
              <td className="text-center">
                {tracker.me.gamesLostServing + tracker.partner.gamesLostServing}/
                {tracker.me.gamesLostServing + tracker.me.gamesWonServing + tracker.partner.gamesWonServing + tracker.partner.gamesLostServing}
              </td>
            </tr>

            <tr>
              <td className="text-center">
                Games ganados en total
              </td>
              <td className="text-center">
                {tracker.me.gamesWonServing + tracker.partner.gamesWonServing + tracker.gamesWonReturning}/
                {tracker.me.gamesWonServing + tracker.me.gamesLostServing + tracker.partner.gamesWonServing + tracker.partner.gamesLostServing + tracker.gamesWonReturning + tracker.gamesLostReturning}
              </td>
              <td className="text-center">
                {tracker.me.gamesLostServing + tracker.partner.gamesLostServing + tracker.gamesLostReturning}/
                {tracker.me.gamesWonServing + tracker.me.gamesLostServing + tracker.partner.gamesWonServing + tracker.partner.gamesLostServing + tracker.gamesWonReturning + tracker.gamesLostReturning}
              </td>
            </tr>
        </tbody>}
    </>
  )
}

export default Games
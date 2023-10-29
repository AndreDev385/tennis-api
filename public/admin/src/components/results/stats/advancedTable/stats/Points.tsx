import { IPropsTable } from '../../GameStats'
import '../../GameStats.scss'

const Points = ({tracker}: IPropsTable) => {
  return (
    <>
        <div className="title">
            <span>
              Puntos
            </span>
          </div>

          <tbody>
            <tr>
              <td className="text-center">
                Puntos ganados con el servicio
              </td>
              <td className="text-center">
                {tracker.me.pointsWonServing}/
                {tracker.me.pointsWonServing + tracker.me.pointsLostServing}
                ({Math.floor(tracker.me.pointsWonServing/
                (tracker.me.pointsWonServing + tracker.me.pointsLostServing)*100)}%)
              </td>
              <td className="text-center">
                {tracker.me.pointsLostReturning}/
                {tracker.me.pointsLostReturning + tracker.me.pointsWonReturning}
                ({Math.floor(tracker.me.pointsLostReturning/
                (tracker.me.pointsLostReturning + tracker.me.pointsWonReturning)*100)}%)
              </td>
            </tr>

            <tr>
              <td className="text-center">
                Puntos ganados con la devolución
              </td>
              <td className="text-center">
                {tracker.me.pointsWonReturning}/
                {tracker.me.pointsWonReturning + tracker.me.pointsLostReturning}
                ({Math.floor(tracker.me.pointsWonReturning/
                (tracker.me.pointsWonReturning + tracker.me.pointsLostReturning)*100)}%)
              </td>
              <td className="text-center">
                {tracker.me.pointsLostServing}/
                {tracker.me.pointsLostServing + tracker.me.pointsWonServing}
                ({Math.floor(tracker.me.pointsLostServing/
                (tracker.me.pointsLostServing + tracker.me.pointsWonServing)*100)}%)
              </td>
            </tr>

            <tr>
              <td className="text-center">
                Puntos ganados en total
              </td>
              <td className="text-center">
                {tracker.me.pointsWonServing + tracker.me.pointsWonReturning}/
                {tracker.me.pointsWonServing + tracker.me.pointsWonReturning + tracker.me.pointsLostServing + tracker.me.pointsLostReturning}
                ({Math.floor((tracker.me.pointsWonServing+ tracker.me.pointsWonReturning)/
                (tracker.me.pointsWonServing + tracker.me.pointsWonReturning + tracker.me.pointsLostServing + tracker.me.pointsLostReturning)*100)}%)
              </td>
              <td className="text-center">
                {tracker.me.pointsLostServing + tracker.me.pointsLostReturning}/
                {tracker.me.pointsWonServing + tracker.me.pointsWonReturning + tracker.me.pointsLostServing + tracker.me.pointsLostReturning}
                ({Math.floor((tracker.me.pointsLostServing + tracker.me.pointsLostReturning)/
                (tracker.me.pointsWonServing + tracker.me.pointsWonReturning + tracker.me.pointsLostServing + tracker.me.pointsLostReturning)*100)}%)
              </td>
            </tr>
        </tbody>
    </>
  )
}

export default Points
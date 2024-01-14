import { calculatePercentage } from '../../../../../utils/calculatePercantage';
import { IPropsTable } from '../../GameStats';
import '../../GameStats.scss';

const Points = ({ tracker }: IPropsTable) => {
  return (
    <>
      <div className='title'>
        <span>Puntos</span>
      </div>

      <tbody>
        <tr>
          <td className='text-center'>Puntos ganados con el servicio</td>
          <td className='text-center'>
            <span>
              {tracker.me.pointsWonServing}/
              {tracker.me.pointsWonServing + tracker.me.pointsLostServing}(
              {calculatePercentage(
                tracker.me.pointsWonServing,
                tracker.me.pointsLostServing
              )}
              %)
            </span>
          </td>
          <td className='text-center'>
            <span>
              {tracker.me.pointsLostReturning}/
              {tracker.me.pointsLostReturning + tracker.me.pointsWonReturning}(
              {calculatePercentage(
                tracker.me.pointsLostReturning,
                tracker.me.pointsLostReturning + tracker.me.pointsWonReturning
              )}
              %)
            </span>
          </td>
        </tr>

        <tr>
          <td className='text-center'>Puntos ganados con la devolución</td>
          <td className='text-center'>
            <span>
              {tracker.me.pointsWonReturning}/
              {tracker.me.pointsWonReturning + tracker.me.pointsLostReturning}(
              {calculatePercentage(
                tracker.me.pointsWonReturning,
                tracker.me.pointsWonReturning + tracker.me.pointsLostReturning
              )}
              %)
            </span>
          </td>
          <td className='text-center'>
            <span>
              {tracker.me.pointsLostServing}/
              {tracker.me.pointsLostServing + tracker.me.pointsWonServing}(
              {calculatePercentage(
                tracker.me.pointsLostServing,
                tracker.me.pointsLostServing + tracker.me.pointsWonServing
              )}
              %)
            </span>
          </td>
        </tr>

        <tr>
          <td className='text-center'>Puntos ganados en total</td>
          <td className='text-center'>
            <span>
              {tracker.me.pointsWonServing + tracker.me.pointsWonReturning}/
              {tracker.me.pointsWonServing +
                tracker.me.pointsWonReturning +
                tracker.me.pointsLostServing +
                tracker.me.pointsLostReturning}
              (
              {calculatePercentage(
                tracker.me.pointsWonServing + tracker.me.pointsWonReturning,
                tracker.me.pointsWonServing +
                  tracker.me.pointsWonReturning +
                  tracker.me.pointsLostServing +
                  tracker.me.pointsLostReturning
              )}
              %)
            </span>
          </td>
          <td className='text-center'>
            <span>
              {tracker.me.pointsLostServing + tracker.me.pointsLostReturning}/
              {tracker.me.pointsWonServing +
                tracker.me.pointsWonReturning +
                tracker.me.pointsLostServing +
                tracker.me.pointsLostReturning}
              (
              {calculatePercentage(
                tracker.me.pointsLostServing + tracker.me.pointsLostReturning,
                tracker.me.pointsWonServing +
                  tracker.me.pointsWonReturning +
                  tracker.me.pointsLostServing +
                  tracker.me.pointsLostReturning
              )}
              %)
            </span>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default Points;

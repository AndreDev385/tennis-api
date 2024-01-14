import { calculatePercentage } from '../../../../../utils/calculatePercantage';
import { IPropsTable } from '../../GameStats';
import '../../GameStats.scss';

const Points = ({ tracker, playerVsPlayer }: IPropsTable) => {
  return (
    <>
      <div className='title'>
        <span>Puntos</span>
      </div>

      {tracker.partner && (
        <tbody>
          <tr>
            <td className='text-center'>Puntos ganados con el servicio</td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.me.pointsWonServing}/
                  {tracker.me.pointsWonServing + tracker.me.pointsLostServing}(
                  {calculatePercentage(
                    tracker.me.pointsWonServing,
                    tracker.me.pointsLostServing
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.me.pointsWonServing + tracker.partner.pointsWonServing}/
                  {tracker.me.pointsWonServing +
                    tracker.partner.pointsWonServing +
                    tracker.me.pointsLostServing +
                    tracker.partner.pointsLostServing}
                  (
                  {calculatePercentage(
                    tracker.me.pointsWonServing + tracker.partner.pointsWonServing,
                    tracker.me.pointsWonServing +
                      tracker.partner.pointsWonServing +
                      tracker.me.pointsLostServing +
                      tracker.partner.pointsLostServing
                  )}
                  %)
                </span>
              )}
            </td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.partner.pointsWonServing}/
                  {tracker.partner.pointsWonServing + tracker.partner.pointsLostServing}(
                  {calculatePercentage(
                    tracker.partner.pointsWonServing,
                    tracker.partner.pointsWonServing + tracker.partner.pointsLostServing
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.me.pointsLostReturning + tracker.partner.pointsLostReturning}/
                  {tracker.me.pointsLostReturning +
                    tracker.partner.pointsLostReturning +
                    tracker.me.pointsWonReturning +
                    tracker.partner.pointsWonReturning}
                  (
                  {calculatePercentage(
                    tracker.me.pointsLostReturning + tracker.partner.pointsLostReturning,
                    tracker.me.pointsLostReturning +
                      tracker.partner.pointsLostReturning +
                      tracker.me.pointsWonReturning +
                      tracker.partner.pointsWonReturning
                  )}
                  %)
                </span>
              )}
            </td>
          </tr>

          <tr>
            <td className='text-center'>Puntos ganados con la devolución</td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.me.pointsWonReturning}/
                  {tracker.me.pointsWonReturning + tracker.me.pointsLostReturning}(
                  {calculatePercentage(
                    tracker.me.pointsWonReturning,
                    tracker.me.pointsWonReturning + tracker.me.pointsLostReturning
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.me.pointsWonReturning + tracker.partner.pointsWonReturning}/
                  {tracker.me.pointsWonReturning +
                    tracker.partner.pointsWonReturning +
                    tracker.me.pointsLostReturning +
                    tracker.partner.pointsLostReturning}
                  (
                  {calculatePercentage(
                    tracker.me.pointsWonReturning + tracker.partner.pointsWonReturning,
                    tracker.me.pointsWonReturning +
                      tracker.partner.pointsWonReturning +
                      tracker.me.pointsLostReturning +
                      tracker.partner.pointsLostReturning
                  )}
                  %)
                </span>
              )}
            </td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.partner.pointsWonReturning}/
                  {tracker.partner.pointsWonReturning +
                    tracker.partner.pointsLostReturning}
                  (
                  {calculatePercentage(
                    tracker.partner.pointsWonReturning,
                    tracker.partner.pointsWonReturning +
                      tracker.partner.pointsLostReturning
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.me.pointsLostServing + tracker.partner.pointsLostServing}/
                  {tracker.me.pointsLostServing +
                    tracker.partner.pointsLostServing +
                    tracker.me.pointsWonServing +
                    tracker.partner.pointsWonServing}
                  (
                  {calculatePercentage(
                    tracker.me.pointsLostServing + tracker.partner.pointsLostServing,
                    tracker.me.pointsLostServing +
                      tracker.partner.pointsLostServing +
                      tracker.me.pointsWonServing +
                      tracker.partner.pointsWonServing
                  )}
                  %)
                </span>
              )}
            </td>
          </tr>

          <tr>
            <td className='text-center'>Puntos ganados en total</td>
            <td className='text-center'>
              {playerVsPlayer ? (
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
              ) : (
                <span>
                  {tracker.me.pointsWonServing +
                    tracker.partner.pointsWonServing +
                    tracker.me.pointsWonReturning +
                    tracker.partner.pointsWonReturning}
                  /
                  {tracker.me.pointsWonServing +
                    tracker.partner.pointsWonServing +
                    tracker.me.pointsWonReturning +
                    tracker.partner.pointsWonReturning +
                    tracker.me.pointsLostServing +
                    tracker.partner.pointsLostServing +
                    tracker.me.pointsLostReturning +
                    tracker.partner.pointsLostReturning}
                  (
                  {calculatePercentage(
                    tracker.me.pointsWonServing +
                      tracker.partner.pointsWonServing +
                      tracker.me.pointsWonReturning +
                      tracker.partner.pointsWonReturning,
                    tracker.me.pointsWonServing +
                      tracker.partner.pointsWonServing +
                      tracker.me.pointsWonReturning +
                      tracker.partner.pointsWonReturning +
                      tracker.me.pointsLostServing +
                      tracker.partner.pointsLostServing +
                      tracker.me.pointsLostReturning +
                      tracker.partner.pointsLostReturning
                  )}
                  %)
                </span>
              )}
            </td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.partner.pointsWonServing + tracker.partner.pointsWonReturning}/
                  {tracker.partner.pointsWonServing +
                    tracker.partner.pointsWonReturning +
                    tracker.partner.pointsLostServing +
                    tracker.partner.pointsLostReturning}
                  (
                  {calculatePercentage(
                    tracker.partner.pointsWonServing + tracker.partner.pointsWonReturning,
                    tracker.partner.pointsWonServing +
                      tracker.partner.pointsWonReturning +
                      tracker.partner.pointsLostServing +
                      tracker.partner.pointsLostReturning
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.me.pointsLostServing +
                    tracker.partner.pointsLostServing +
                    tracker.me.pointsLostReturning +
                    tracker.partner.pointsLostReturning}
                  /
                  {tracker.me.pointsWonServing +
                    tracker.partner.pointsWonServing +
                    tracker.me.pointsWonReturning +
                    tracker.partner.pointsWonReturning +
                    tracker.me.pointsLostServing +
                    tracker.partner.pointsLostServing +
                    tracker.me.pointsLostReturning +
                    tracker.partner.pointsLostReturning}
                  (
                  {calculatePercentage(
                    tracker.me.pointsLostServing +
                      tracker.partner.pointsLostServing +
                      tracker.me.pointsLostReturning +
                      tracker.partner.pointsLostReturning,
                    tracker.me.pointsWonServing +
                      tracker.partner.pointsWonServing +
                      tracker.me.pointsWonReturning +
                      tracker.partner.pointsWonReturning +
                      tracker.me.pointsLostServing +
                      tracker.partner.pointsLostServing +
                      tracker.me.pointsLostReturning +
                      tracker.partner.pointsLostReturning
                  )}
                  %)
                </span>
              )}
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
};

export default Points;

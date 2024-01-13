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
                  {Math.floor(
                    (tracker.me.pointsWonServing /
                      (tracker.me.pointsWonServing + tracker.me.pointsLostServing)) *
                      100
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
                  {Math.floor(
                    ((tracker.me.pointsWonServing + tracker.partner.pointsWonServing) /
                      (tracker.me.pointsWonServing +
                        tracker.partner.pointsWonServing +
                        tracker.me.pointsLostServing +
                        tracker.partner.pointsLostServing)) *
                      100
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
                  {Math.floor(
                    (tracker.partner.pointsWonServing /
                      (tracker.partner.pointsWonServing +
                        tracker.partner.pointsLostServing)) *
                      100
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
                  {Math.floor(
                    ((tracker.me.pointsLostReturning +
                      tracker.partner.pointsLostReturning) /
                      (tracker.me.pointsLostReturning +
                        tracker.partner.pointsLostReturning +
                        tracker.me.pointsWonReturning +
                        tracker.partner.pointsWonReturning)) *
                      100
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
                  {Math.floor(
                    (tracker.me.pointsWonReturning /
                      (tracker.me.pointsWonReturning + tracker.me.pointsLostReturning)) *
                      100
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
                  {Math.floor(
                    ((tracker.me.pointsWonReturning +
                      tracker.partner.pointsWonReturning) /
                      (tracker.me.pointsWonReturning +
                        tracker.partner.pointsWonReturning +
                        tracker.me.pointsLostReturning +
                        tracker.partner.pointsLostReturning)) *
                      100
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
                  {Math.floor(
                    (tracker.partner.pointsWonReturning /
                      (tracker.partner.pointsWonReturning +
                        tracker.partner.pointsLostReturning)) *
                      100
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
                  {Math.floor(
                    ((tracker.me.pointsLostServing + tracker.partner.pointsLostServing) /
                      (tracker.me.pointsLostServing +
                        tracker.partner.pointsLostServing +
                        tracker.me.pointsWonServing +
                        tracker.partner.pointsWonServing)) *
                      100
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
                  {Math.floor(
                    ((tracker.me.pointsWonServing + tracker.me.pointsWonReturning) /
                      (tracker.me.pointsWonServing +
                        tracker.me.pointsWonReturning +
                        tracker.me.pointsLostServing +
                        tracker.me.pointsLostReturning)) *
                      100
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
                  {Math.floor(
                    ((tracker.me.pointsWonServing +
                      tracker.partner.pointsWonServing +
                      tracker.me.pointsWonReturning +
                      tracker.partner.pointsWonReturning) /
                      (tracker.me.pointsWonServing +
                        tracker.partner.pointsWonServing +
                        tracker.me.pointsWonReturning +
                        tracker.partner.pointsWonReturning +
                        tracker.me.pointsLostServing +
                        tracker.partner.pointsLostServing +
                        tracker.me.pointsLostReturning +
                        tracker.partner.pointsLostReturning)) *
                      100
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
                  {Math.floor(
                    ((tracker.partner.pointsWonServing +
                      tracker.partner.pointsWonReturning) /
                      (tracker.partner.pointsWonServing +
                        tracker.partner.pointsWonReturning +
                        tracker.partner.pointsLostServing +
                        tracker.partner.pointsLostReturning)) *
                      100
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
                  {Math.floor(
                    ((tracker.me.pointsLostServing +
                      tracker.partner.pointsLostServing +
                      tracker.me.pointsLostReturning +
                      tracker.partner.pointsLostReturning) /
                      (tracker.me.pointsWonServing +
                        tracker.partner.pointsWonServing +
                        tracker.me.pointsWonReturning +
                        tracker.partner.pointsWonReturning +
                        tracker.me.pointsLostServing +
                        tracker.partner.pointsLostServing +
                        tracker.me.pointsLostReturning +
                        tracker.partner.pointsLostReturning)) *
                      100
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

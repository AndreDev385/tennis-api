import { calculatePercentage } from '../../../../../utils/calculatePercantage';
import { IPropsTable } from '../../GameStats';
import '../../GameStats.scss';

const BallInGame = ({ tracker, playerVsPlayer }: IPropsTable) => {
  return (
    <>
      <div className='title'>
        <span>Pelota en juego</span>
      </div>

      {tracker.partner && (
        <tbody>
          {playerVsPlayer && (
            <tr>
              <td className='text-center'>Puntos ganados en malla</td>
              <td className='text-center'>
                {tracker.me.meshPointsWon}/
                {tracker.me.meshPointsLost + tracker.me.meshPointsWon}(
                {calculatePercentage(
                  tracker.me.meshPointsWon,
                  tracker.me.meshPointsLost + tracker.me.meshPointsWon
                )}
                %)
              </td>
              <td className='text-center'>
                {tracker.partner.meshPointsWon}/
                {tracker.partner.meshPointsLost + tracker.partner.meshPointsWon}(
                {calculatePercentage(
                  tracker.partner.meshPointsWon,
                  tracker.partner.meshPointsLost + tracker.partner.meshPointsWon
                )}
                %)
              </td>
            </tr>
          )}

          {playerVsPlayer && (
            <tr>
              <td className='text-center'>Winners en malla</td>
              <td className='text-center'>{tracker.me.meshWinner}</td>
              <td className='text-center'>{tracker.partner.meshWinner}</td>
            </tr>
          )}

          {playerVsPlayer && (
            <tr>
              <td className='text-center'>Errores en malla</td>
              <td className='text-center'>{tracker.me.meshError}</td>
              <td className='text-center'>{tracker.partner.meshError}</td>
            </tr>
          )}

          {playerVsPlayer && (
            <tr>
              <td className='text-center'>Puntos ganados de fondo/approach</td>
              <td className='text-center'>
                {tracker.me.bckgPointsWon}/
                {tracker.me.bckgPointsWon + tracker.me.bckgPointsLost}(
                {calculatePercentage(
                  tracker.me.bckgPointsWon,
                  tracker.me.bckgPointsWon + tracker.me.bckgPointsLost
                )}
                %)
              </td>
              <td className='text-center'>
                {tracker.partner.bckgPointsWon}/
                {tracker.partner.bckgPointsWon + tracker.partner.bckgPointsLost}(
                {calculatePercentage(
                  tracker.partner.bckgPointsWon,
                  tracker.partner.bckgPointsWon + tracker.partner.bckgPointsLost
                )}
                %)
              </td>
            </tr>
          )}

          {playerVsPlayer && (
            <tr>
              <td className='text-center'>Winners en fondo/approach</td>
              <td className='text-center'>{tracker.me.bckgWinner}</td>
              <td className='text-center'>{tracker.partner.bckgWinner}</td>
            </tr>
          )}

          {playerVsPlayer && (
            <tr>
              <td className='text-center'>Errores en fondo/approach</td>
              <td className='text-center'>{tracker.me.bckgError}</td>
              <td className='text-center'>{tracker.partner.bckgError}</td>
            </tr>
          )}

          <tr>
            <td className='text-center'>Winners</td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.me.meshWinner +
                    tracker.me.bckgWinner +
                    tracker.me.firstReturnWinner +
                    tracker.me.secondReturnWinner +
                    tracker.me.aces}
                </span>
              ) : (
                <span>
                  {tracker.me.meshWinner +
                    tracker.me.bckgWinner +
                    tracker.me.firstReturnWinner +
                    tracker.me.secondReturnWinner +
                    tracker.me.aces +
                    (tracker.me.meshWinner +
                      tracker.partner.bckgWinner +
                      tracker.partner.firstReturnWinner +
                      tracker.partner.secondReturnWinner +
                      tracker.partner.aces)}
                </span>
              )}
            </td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.me.meshWinner +
                    tracker.partner.bckgWinner +
                    tracker.partner.firstReturnWinner +
                    tracker.partner.secondReturnWinner +
                    tracker.partner.aces}
                </span>
              ) : (
                <span>{tracker.rivalWinners}</span>
              )}
            </td>
          </tr>

          <tr>
            <td className='text-center'>Errores no forzados</td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.me.meshError + tracker.me.bckgError + tracker.me.dobleFaults}
                </span>
              ) : (
                <span>
                  {tracker.me.meshError +
                    tracker.me.bckgError +
                    tracker.me.dobleFaults +
                    (tracker.partner.meshError +
                      tracker.partner.bckgError +
                      tracker.partner.dobleFaults)}
                </span>
              )}
            </td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.partner.meshError +
                    tracker.partner.bckgError +
                    tracker.partner.dobleFaults}
                </span>
              ) : (
                <span>{tracker.rivalNoForcedErrors}</span>
              )}
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
};

export default BallInGame;

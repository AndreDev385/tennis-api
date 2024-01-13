import { calculatePercentage } from '../../../../../utils/calculatePercantage';
import { IPropsTable } from '../../GameStats';
import '../../GameStats.scss';

const BallInGame = ({ tracker }: IPropsTable) => {
  return (
    <>
      <div className='title'>
        <span>Pelota en juego</span>
      </div>
      <tbody>
        <tr>
          <td className='text-center'>Puntos ganados en malla</td>
          <td className='text-center'>
            {tracker.me.meshPointsWon}/
            {tracker.me.meshPointsLost + tracker.me.meshPointsWon}(
            {calculatePercentage(
              tracker.me.meshPointsWon,
              tracker.me.meshPointsLost + tracker.me.meshPointsWon
            )}
            )%
          </td>
          <td className='text-center' />
        </tr>
        <tr>
          <td className='text-center'>Puntos ganados de fondo/approach</td>
          <td className='text-center'>
            {tracker.me.bckgPointsWon}/
            {tracker.me.bckgPointsWon + tracker.me.bckgPointsLost}(
            {calculatePercentage(
              tracker.me.bckgPointsWon,
              tracker.me.bckgPointsWon + tracker.me.bckgPointsLost
            )}
            )%
          </td>
          <td className='text-center' />
        </tr>

        <tr>
          <td className='text-center'>Winners</td>
          <td className='text-center'>{tracker.me.winners}</td>
          <td className='text-center'>{tracker.rivalWinners}</td>
        </tr>

        <tr>
          <td className='text-center'>Errores no forzados</td>
          <td className='text-center'>{tracker.me.noForcedErrors}</td>
          <td className='text-center'>{tracker.rivalNoForcedErrors}</td>
        </tr>
      </tbody>
    </>
  );
};

export default BallInGame;
